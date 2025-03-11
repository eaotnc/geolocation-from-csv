"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
// Replace with your Google Maps API key
var API_KEY = "AIzaSyCUba6hv6SV0IdFayM4gvbw-yQ7F_E6OM0";
// Geocode function to fetch latitude and longitude
function geocodeAddress(address) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, results, location_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://maps.googleapis.com/maps/api/geocode/json?address=".concat(encodeURIComponent(address), "&key=").concat(API_KEY);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 2:
                    response = _a.sent();
                    results = response.data.results;
                    if (results.length > 0) {
                        location_1 = results[0].geometry.location;
                        console.log("🚀 ~ location:", location_1);
                        return [2 /*return*/, { lat: location_1.lat, lng: location_1.lng }];
                    }
                    else {
                        console.error("No results found for address: ".concat(address));
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error geocoding address: ".concat(address), error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Main function to process the table
function processAddresses(addresses) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, addresses_1, addressData, address, location_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, addresses_1 = addresses;
                    _a.label = 1;
                case 1:
                    if (!(_i < addresses_1.length)) return [3 /*break*/, 4];
                    addressData = addresses_1[_i];
                    address = addressData.address;
                    return [4 /*yield*/, geocodeAddress(address)];
                case 2:
                    location_2 = _a.sent();
                    if (location_2) {
                        addressData.latitude = location_2.lat;
                        addressData.longitude = location_2.lng;
                    }
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, addresses];
            }
        });
    });
}
// Example data (replace with your table data)
var addresses = [
    {
        id: 1,
        address: "94 ห้างบิ๊กซี เชียงใหม่ 2 ชั้น 2 ห้อง 27,36 หมู่ 4 ถ. เชียงใหม่ - ลำปาง ต. หนองป่าครั่ง อ. เมือง จ.เชียงใหม่  50000",
    },
    {
        id: 2,
        address: "208 ห้างบิ๊กซีเชียงใหม่ ชั้น 1 ห้อง GCR 022 ม.3 ตำบลท่าศาลา อำเภอเมืองเชียงใหม่ เชียงใหม่ 50000",
    },
    // Add more addresses here...
];
// Run the program
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var updatedAddresses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, processAddresses(addresses)];
            case 1:
                updatedAddresses = _a.sent();
                console.log(updatedAddresses);
                return [2 /*return*/];
        }
    });
}); })();
