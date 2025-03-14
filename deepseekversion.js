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
var fs = require("fs");
var csv = require("csv-parser");
var csv_writer_1 = require("csv-writer");
// Replace with your Google Maps API key
var API_KEY = "AIzaSyCUba6hv6SV0IdFayM4gvbw";
// Geocode function to fetch latitude and longitude
function geocodeAddress(address) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, results, location_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://maps.googleapis.com/maps/api/geocode/json?address=".concat(encodeURIComponent(address), "&language=th&key=").concat(API_KEY);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 2:
                    response = _a.sent();
                    results = response.data.results;
                    if (results.length > 0) {
                        location_1 = results[0].geometry.location;
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
// Function to read CSV file
function readCsv(filePath) {
    var results = [];
    return new Promise(function (resolve, reject) {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", function (data) { return results.push(data); })
            .on("end", function () { return resolve(results); })
            .on("error", function (error) { return reject(error); });
    });
}
// Function to write CSV file
function writeCsv(filePath, data) {
    return __awaiter(this, void 0, void 0, function () {
        var csvWriter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
                        path: filePath,
                        header: [
                            { id: "No", title: "No" },
                            { id: "Address", title: "Address" },
                            { id: "latitude", title: "latitude" },
                            { id: "longitude", title: "longitude" },
                        ],
                    });
                    return [4 /*yield*/, csvWriter.writeRecords(data)];
                case 1:
                    _a.sent();
                    console.log("CSV file written successfully to ".concat(filePath));
                    return [2 /*return*/];
            }
        });
    });
}
// Main function to process the CSV
function processCsv(inputFilePath, outputFilePath) {
    return __awaiter(this, void 0, void 0, function () {
        var addresses, _i, addresses_1, addressData, Address, location_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readCsv(inputFilePath)];
                case 1:
                    addresses = _a.sent();
                    _i = 0, addresses_1 = addresses;
                    _a.label = 2;
                case 2:
                    if (!(_i < addresses_1.length)) return [3 /*break*/, 5];
                    addressData = addresses_1[_i];
                    Address = addressData.Address;
                    return [4 /*yield*/, geocodeAddress(Address)];
                case 3:
                    location_2 = _a.sent();
                    if (location_2) {
                        addressData.latitude = location_2.lat;
                        addressData.longitude = location_2.lng;
                    }
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: 
                // Write the updated data to a new CSV file
                return [4 /*yield*/, writeCsv(outputFilePath, addresses)];
                case 6:
                    // Write the updated data to a new CSV file
                    _a.sent();
                    console.log("Geocoding completed!");
                    return [2 /*return*/];
            }
        });
    });
}
// Run the program
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var inputFilePath, outputFilePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputFilePath = "input.csv";
                outputFilePath = "output.csv";
                return [4 /*yield*/, processCsv(inputFilePath, outputFilePath)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
