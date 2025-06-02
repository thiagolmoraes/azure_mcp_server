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
const graphql_1 = require("graphql");
const azure_1 = require("../azure");
// Definição do tipo Post
const TeamsType = new graphql_1.GraphQLObjectType({
    name: "Team",
    fields: () => ({
        id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        projectName: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        projectId: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
    })
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: {
        getTeams: {
            type: (0, graphql_1.GraphQLList)(TeamsType),
            resolve: () => __awaiter(void 0, void 0, void 0, function* () {
                return (0, azure_1.getTeams)();
            })
        },
        getTeam: {
            type: TeamsType,
            args: {
                teams_name: { type: graphql_1.GraphQLString },
                project_name: { type: graphql_1.GraphQLString },
            },
            resolve: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
                return (0, azure_1.getTeams)(args.teams_name, args.project_name);
            }),
        },
    }
});
// Criando o Schema
const TeamsSchema = new graphql_1.GraphQLSchema({
    query: RootQuery,
});
exports.default = TeamsSchema;
