import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import  TeamsSchema  from './schemas/teams';
import  {ProjectSchema} from './schemas/project';

const app = express();


app.all('/graphql', createHandler({ schema: ProjectSchema }));

app.listen({ port: 4000, host: '0.0.0.0' });

