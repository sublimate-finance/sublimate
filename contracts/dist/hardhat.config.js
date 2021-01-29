"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("hardhat-typechain");
var network_1 = require("./utils/network");
var config = {
    solidity: {
        compilers: [
            {
                version: '0.8.0',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 2000,
                    },
                },
            },
            {
                version: '0.7.1',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 2000,
                    },
                },
            }
        ]
    },
    namedAccounts: {
        deployer: 0,
    },
    networks: {
        hardhat: {
            accounts: network_1.accounts(),
        },
        localhost: {
            url: network_1.node_url('localhost'),
            accounts: network_1.accounts(),
        },
        mainnet: {
            url: network_1.node_url('mainnet'),
            accounts: network_1.accounts('mainnet'),
        },
        rinkeby: {
            url: network_1.node_url('rinkeby'),
            accounts: network_1.accounts('rinkeby'),
        },
        kovan: {
            url: network_1.node_url('kovan'),
            accounts: network_1.accounts('kovan'),
        },
        goerli: {
            url: network_1.node_url('goerli'),
            accounts: network_1.accounts('goerli'),
        },
        staging: {
            url: network_1.node_url('rinkeby'),
            accounts: network_1.accounts('rinkeby'),
        },
    },
    paths: {
        sources: 'src',
    },
    mocha: {
        timeout: 0,
    },
};
exports.default = config;
