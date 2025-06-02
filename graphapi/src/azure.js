"use strict";
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
exports.getProjects = getProjects;
exports.getTeams = getTeams;
const types_1 = require("./types");
const fetch_1 = require("./fetch");
function getProjects(project_name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, fetch_1.requestAzure)({
                method: "GET",
                endpoint: "projects"
            });
            const projects = yield response.json();
            const parsed = types_1.APIRequestProjectSchema.parse(projects);
            if (project_name) {
                return parsed.value.find(project => project.name === project_name) || null;
            }
            return parsed.value;
        }
        catch (error) {
            console.error("Error getting projects:", error);
            return null;
        }
    });
}
function getTeams(project_name, team_name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, fetch_1.requestAzure)({
                method: "GET",
                endpoint: "teams"
            });
            const teams = yield response.json();
            const parsed = types_1.APIRequestTeamsSchema.parse(teams);
            if (project_name || team_name) {
                return parsed.value.find(team => team.projectName === project_name || team.name === team_name) || null;
            }
            return parsed.value;
        }
        catch (error) {
            console.error("Error getting teams:", error);
            return null;
        }
    });
}
