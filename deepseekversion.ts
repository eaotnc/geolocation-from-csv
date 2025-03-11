import axios from "axios";
import * as fs from "fs";
import * as csv from "csv-parser";
import { createObjectCsvWriter as createCsvWriter } from "csv-writer";

// Replace with your Google Maps API key
const API_KEY = "xxx";
// Define the structure of the address data
interface AddressData {
  No: string;
  Address: string;
  latitude?: number;
  longitude?: number;
}

// Geocode function to fetch latitude and longitude
async function geocodeAddress(
  address: string
): Promise<{ lat: number; lng: number } | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&language=th&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const results = response.data.results;

    if (results.length > 0) {
      const location = results[0].geometry.location;
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

// Function to read CSV file
function readCsv(filePath: string): Promise<AddressData[]> {
  const results: AddressData[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

// Function to write CSV file
async function writeCsv(filePath: string, data: AddressData[]) {
  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: "No", title: "No" },
      { id: "Address", title: "Address" },
      { id: "latitude", title: "latitude" },
      { id: "longitude", title: "longitude" },
    ],
  });

  await csvWriter.writeRecords(data);
  console.log(`CSV file written successfully to ${filePath}`);
}

// Main function to process the CSV
async function processCsv(inputFilePath: string, outputFilePath: string) {
  // Read the CSV file
  const addresses = await readCsv(inputFilePath);

  // Geocode each address
  for (const addressData of addresses) {
    const { Address } = addressData;
    const location = await geocodeAddress(Address);

    if (location) {
      addressData.latitude = location.lat;
      addressData.longitude = location.lng;
    }
  }

  // Write the updated data to a new CSV file
  await writeCsv(outputFilePath, addresses);
  console.log("Geocoding completed!");
}

// Run the program
(async () => {
  const inputFilePath = "input.csv"; // Path to your input CSV file
  const outputFilePath = "output.csv"; // Path to save the output CSV file

  await processCsv(inputFilePath, outputFilePath);
})();
