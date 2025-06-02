import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
import { getProjects } from "../azure";

// Definição do tipo Post
const ProjectsType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    state: { type: GraphQLNonNull(GraphQLString) },
  })
});

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    getProjects: {
      type: GraphQLList(ProjectsType),
      resolve: async () => {
        return getProjects();
      }
    },
    getProject: {
      type: ProjectsType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        return getProjects(args.name);
      },
    },
    }
});

// Criando o Schema
export const ProjectSchema = new GraphQLSchema({
  query: RootQuery,
});

