"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findOne = exports.findAll = void 0;
const uuid_1 = require("uuid");
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
const create = async (productInfo) => {
    let id = (0, uuid_1.v4)();
    let product = await (0, exports.findOne)(id);
    while (product) {
        id = (0, uuid_1.v4)();
        await (0, exports.findOne)(id);
    }
    products[id] = {
        id,
        ...productInfo
    };
    saveProducts();
    return products[id];
};
exports.create = create;
const update = async (id, updateValues) => {
    const product = await (0, exports.findOne)(id);
    if (!product) {
        return null;
    }
    products[id] = {
        id,
        ...updateValues
    };
    saveProducts();
    return products[id];
};
exports.update = update;
const remove = async (id) => {
    const product = await (0, exports.findOne)(id);
    if (!product) {
        return null;
    }
    delete products[id];
    saveProducts();
};
exports.remove = remove;
