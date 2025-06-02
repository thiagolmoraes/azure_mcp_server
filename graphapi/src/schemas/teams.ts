import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
import { getTeams } from "../azure";

// Definição do tipo Post
const TeamsType = new GraphQLObjectType({
  name: "Team",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    projectName: { type: GraphQLNonNull(GraphQLString) },
    projectId: { type: GraphQLNonNull(GraphQLString) },
  })
});

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    getTeams: {
      type: GraphQLList(TeamsType),
      resolve: async () => {
        return getTeams();
      }
    },
    getTeam: {
      type: TeamsType,
      args: {
        teams_name: { type:GraphQLString },
        project_name: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        return getTeams(args.teams_name, args.project_name);
      },
    },
    }
});

// Criando o Schema
const TeamsSchema = new GraphQLSchema({
  query: RootQuery,
});

export default TeamsSchema;