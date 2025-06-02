"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("graphql-http/lib/use/express");
const teams_1 = __importDefault(require("./schemas/teams"));
const app = (0, express_1.default)();
app.all('/graphql', (0, express_2.createHandler)({ schema: teams_1.default }));
app.listen({ port: 4000, host: '0.0.0.0' });
