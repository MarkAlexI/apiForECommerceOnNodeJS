"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var dotenv = require("dotenv");
var cors = require("cors");
var helmet_1 = require("helmet");
dotenv.config();
if (!process.env.PORT) {
    console.log("No port value specified...");
}
var PORT = parseInt(process.env.PORT, 10);
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((0, helmet_1.default)());
app.listen(PORT, function () {
    console.log("Server is listening on port ".concat(PORT));
});
