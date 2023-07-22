"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const database = __importStar(require("./product.datastorage"));
const http_status_codes_1 = require("http-status-codes");
exports.productRouter = express_1.default.Router();
exports.productRouter.get('/products', async (req, res) => {
    try {
        const allProducts = await database.findAll();
        if (!allProducts) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                error: `No products found!`
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            total: allProducts.length,
            allProducts
        });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            error
        });
    }
});
exports.productRouter.post("/product", async (req, res) => {
    try {
        const { name, price, quantity, image } = req.body;
        if (!name || !price || !quantity || !image) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                error: `Please provide all the required parameters!`
            });
        }
        const newProduct = await database.create({ ...req.body });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            newProduct
        });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            error
        });
    }
});
