"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIRequestTeamsSchema = exports.TeamsSchema = exports.APIRequestProjectSchema = exports.ProjectSchema = void 0;
const zod_1 = require("zod");
exports.ProjectSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    state: zod_1.z.string(),
});
exports.APIRequestProjectSchema = zod_1.z.object({
    count: zod_1.z.number(),
    value: zod_1.z.array(exports.ProjectSchema)
});
exports.TeamsSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    url: zod_1.z.string(),
    projectName: zod_1.z.string(),
    projectId: zod_1.z.string(),
});
exports.APIRequestTeamsSchema = zod_1.z.object({
    value: zod_1.z.array(exports.TeamsSchema)
});
