"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = exports.findAll = void 0;
const fs_1 = __importDefault(require("fs"));
let products = loadProducts();
function loadProducts() {
    try {
        const data = fs_1.default.readFileSync("./products.json", "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        console.log(`Error ${error}`);
        return {};
    }
}
function saveProducts() {
    try {
        fs_1.default.writeFileSync("./products.json", JSON.stringify(products), "utf-8");
        console.log(`Products saved successfully!`);
    }
    catch (error) {
        console.log(`Error: `, error);
    }
}
const findAll = async () => Object.values(products);
exports.findAll = findAll;
const findOne = async (id) => products[id];
exports.findOne = findOne;
