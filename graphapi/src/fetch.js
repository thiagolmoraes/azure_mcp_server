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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestAzure = requestAzure;
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const buffer_1 = require("buffer");
dotenv.config({ path: path.resolve(__dirname, '../.env') });
var Global;
(function (Global) {
    Global.token = process.env.TOKEN || "";
    Global.username = process.env.USERNAME || "";
    Global.orgUrl = process.env.URL_BASE || "";
})(Global || (Global = {}));
const config = {
    orgUrl: Global.orgUrl,
    token: Global.token,
    version: "7.1",
};
function create_token() {
    return __awaiter(this, void 0, void 0, function* () {
        const str = `${Global.username}:${Global.token}`;
        return buffer_1.Buffer.from(str, 'binary').toString('base64');
    });
}
function requestAzure(apiRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const { method, endpoint, body } = apiRequest;
        const url = new URL(`${config.orgUrl}/_apis/${endpoint}?version=${config.version}`);
        const token_encoded = yield create_token();
        const response = yield fetch(url, {
            method: method,
            headers: {
                "Content-Type": apiRequest.content_type || "application/json",
                "Authorization": `Basic ${token_encoded}`,
            },
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return response;
    });
}
