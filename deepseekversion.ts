import axios from "axios";

// Replace with your Google Maps API key
const API_KEY = "AIzaSyCUba6hv6SV0IdFayM4gvbw-yQ7F_E6OM0";

// Define the structure of the address data
interface AddressData {
  id: number;
  address: string;
  latitude?: number;
  longitude?: number;
}

// Geocode function to fetch latitude and longitude
async function geocodeAddress(
  address: string
): Promise<{ lat: number; lng: number } | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const results = response.data.results;

    if (results.length > 0) {
      const location = results[0].geometry.location;
      console.log("🚀 ~ location:", location);
      return { lat: location.lat, lng: location.lng };
    } else {
      console.error(`No results found for address: ${address}`);
      return null;
    }
  } catch (error) {
    console.error(`Error geocoding address: ${address}`, error);
    return null;
  }
}

// Main function to process the table
async function processAddresses(
  addresses: AddressData[]
): Promise<AddressData[]> {
  for (const addressData of addresses) {
    const { address } = addressData;
    const location = await geocodeAddress(address);

    if (location) {
      addressData.latitude = location.lat;
      addressData.longitude = location.lng;
    }
  }

  return addresses;
}

// Example data (replace with your table data)
const addresses: AddressData[] = [
  {
    id: 1,
    address:
      "94 ห้างบิ๊กซี เชียงใหม่ 2 ชั้น 2 ห้อง 27,36 หมู่ 4 ถ. เชียงใหม่ - ลำปาง ต. หนองป่าครั่ง อ. เมือง จ.เชียงใหม่  50000",
  },
  {
    id: 2,
    address:
      "208 ห้างบิ๊กซีเชียงใหม่ ชั้น 1 ห้อง GCR 022 ม.3 ตำบลท่าศาลา อำเภอเมืองเชียงใหม่ เชียงใหม่ 50000",
  },
  // Add more addresses here...
];

// Run the program
(async () => {
  const updatedAddresses = await processAddresses(addresses);
  console.log(updatedAddresses);
})();
