import * as dotenv from 'dotenv';
import * as path from 'path';
import { Buffer } from "buffer";

dotenv.config({ path: path.resolve(__dirname, '../.env') });

namespace Global {
    export const token = process.env.TOKEN || "";
    export const username = process.env.USERNAME || "";
    export const orgUrl = process.env.URL_BASE || "";
}

interface AzureConfig {
    orgUrl: string;
    token: string;
    version: string;
}

type HTTPMethod = "GET" | "POST" | "DELETE" | "PATCH" | "PUT";

interface APIRequest{
    method: HTTPMethod;
    endpoint: string;
    body?: string;
    project?: string
    content_type?: string
} 

const config: AzureConfig = {
    orgUrl: Global.orgUrl,
    token: Global.token,
    version: "7.1",
}

async function create_token() {
    const str = `${Global.username}:${Global.token}`;
    return Buffer.from(str, 'binary').toString('base64');
}

export async function requestAzure(apiRequest: APIRequest): Promise<Response>{

    const { method, endpoint, body } = apiRequest;

    const url = new URL(`${config.orgUrl}/_apis/${endpoint}?version=${config.version}`);

    const token_encoded = await create_token();

    const response = await fetch(url, {
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
}


