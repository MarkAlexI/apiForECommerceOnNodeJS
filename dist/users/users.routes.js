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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const database = __importStar(require("./user.datastorage"));
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/users", async (req, res) => {
    try {
        const allUsers = await database.findAll();
        if (!allUsers) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                msg: `No users find.`
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            total_user: allUsers.length,
            allUsers
        });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            error
        });
    }
});
exports.userRouter.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                error: `Please provide all the required parameters...`
            });
        }
        const user = await database.findByEmail(email);
        if (user) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                error: `This email has already been registered...`
            });
        }
        const newUser = await database.create(req.body);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            newUser
        });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            error
        });
    }
});
