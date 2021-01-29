"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var chai_1 = __importDefault(require("chai"));
var chai_ethers_1 = require("chai-ethers");
chai_1.default.use(chai_ethers_1.chaiEthers);
chai_1.default.use(require('chai-bignumber')());
module.exports = chai_1.default;
