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
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.comparePassword = exports.findByEmail = exports.remove = exports.create = exports.findOne = exports.findAll = void 0;
const fs = __importStar(require("fs"));
const bcrypt = __importStar(require("bcryptjs"));
const uuid_1 = require("uuid");
let users = loadUsers();
function loadUsers() {
    try {
        const data = fs.readFileSync("./users.json", "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        console.log(`Error ${error}`);
        return {};
    }
}
function saveUsers() {
    try {
        fs.writeFileSync("./users.json", JSON.stringify(users), "utf-8");
        console.log(`User saved successfully!`);
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }
}
const findAll = async () => Object.values(users);
exports.findAll = findAll;
const findOne = async (id) => users[id];
exports.findOne = findOne;
const create = async (userData) => {
    let id = (0, uuid_1.v4)();
    let check_user = await (0, exports.findOne)(id);
    while (check_user) {
        id = (0, uuid_1.v4)();
        check_user = await (0, exports.findOne)(id);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const user = {
        id: id,
        username: userData.username,
        email: userData.email,
        password: hashedPassword
    };
    users[id] = user;
    saveUsers();
    return user;
};
exports.create = create;
const remove = async (id) => {
    const user = await (0, exports.findOne)(id);
    if (!user) {
        return null;
    }
    delete users[id];
    saveUsers();
};
exports.remove = remove;
const findByEmail = async (userEmail) => {
    const allUsers = await (0, exports.findAll)();
    const getUser = allUsers.find(user => userEmail === user.email);
    if (!getUser) {
        return null;
    }
    return getUser;
};
exports.findByEmail = findByEmail;
const comparePassword = async (email, suppliedPassword) => {
    const user = await (0, exports.findByEmail)(email);
    const decryptPassword = await bcrypt.compare(suppliedPassword, user.password);
    if (!decryptPassword) {
        return null;
    }
    return user;
};
exports.comparePassword = comparePassword;
const update = async (id, updateValues) => {
    const userExists = await (0, exports.findOne)(id);
    if (!userExists) {
        return null;
    }
    if (updateValues.password) {
        const salt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(updateValues.password, salt);
        updateValues.password = newPass;
    }
    users[id] = {
        ...userExists,
        ...updateValues
    };
    saveUsers();
    return users[id];
};
exports.update = update;
