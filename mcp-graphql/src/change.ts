// import { Server } from "@modelcontextprotocol/sdk/server/index.js";
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import {
//   ListToolsRequestSchema,
//   CallToolRequestSchema,
//   ErrorCode,
//   McpError
// } from "@modelcontextprotocol/sdk/types.js";
// import axios from "axios";
// import { z } from "zod";

// const GRAPHQL_API_URL = "http://localhost:4000/graphql";

// // Schemas de validação
// const TeamsArgsSchema = z.object({
//   project_name: z.string().optional()
// });

// const server = new Server({
//   name: "azure-devops-mcp",
//   version: "1.0.0"
// }, {
//   capabilities: {
//     tools: {}
//   }
// });

// // Ferramentas disponíveis
// server.setRequestHandler(ListToolsRequestSchema, async () => ({
//   tools: [
//     {
//       name: "get_projects",
//       description: "Lista todos os projetos no Azure DevOps",
//       inputSchema: { type: "object", properties: {} }
//     },
//     {
//       name: "get_teams",
//       description: "Lista times de um projeto",
//       inputSchema: {
//         type: "object",
//         properties: {
//           project_name: { type: "string", description: "Nome do projeto" }
//         }
//       }
//     }
//   ]
// }));

// // Handler principal
// server.setRequestHandler(CallToolRequestSchema, async (request) => {
//   try {
//     if (request.params.name === "get_projects") {
//       const response = await axios.post(GRAPHQL_API_URL, {
//         query: `{ getProjects { id name state } }`
//       });
      
//       if (response.data.errors) {
//         throw new Error(response.data.errors[0].message);
//       }

//       return {
//         content: [{
//           type: "text",
//           text: `Projetos: ${JSON.stringify(response.data.data.getProjects)}`
//         }]
//       };
//     }

//     if (request.params.name === "get_teams") {
//       const args = TeamsArgsSchema.parse(request.params.arguments);
//       const query = args.project_name 
//         ? `{ getTeams(project_name: "${args.project_name}") { id name projectName } }`
//         : `{ getTeams { id name projectName } }`;

//       const response = await axios.post(GRAPHQL_API_URL, { query });
      
//       if (response.data.errors) {
//         throw new Error(response.data.errors[0].message);
//       }

//       return {
//         content: [{
//           type: "text",
//           text: `Times: ${JSON.stringify(response.data.data.getTeams)}`
//         }]
//       };
//     }

//     throw new McpError(ErrorCode.MethodNotFound, "Ferramenta não encontrada");
//   } catch (error) {
//     console.error("Erro no handler:", error);
//     throw new McpError(
//       ErrorCode.InternalError,
//       error instanceof Error ? error.message : "Erro desconhecido"
//     );
//   }
// });

// // Inicialização
// async function main() {
//   try {
//     const transport = new StdioServerTransport();
//     transport.onerror = (err) => console.error("Transport error:", err);
//     await server.connect(transport);
//     console.error("✅ MCP Server pronto via stdio");
//   } catch (err) {
//     console.error("❌ Falha ao iniciar:", err);
//     process.exit(1);
//   }
// }

// main();