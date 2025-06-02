import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema, ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
import { z } from "zod";

// Configuration for your GraphQL API endpoint
const GRAPHQL_API_URL = "http://localhost:4000/graphql";

// Zod schema for validating team arguments
const TeamsArgsSchema = z.object({
  project_name: z.string().optional()
});

/**
 * Initialize the MCP Server with Azure DevOps capabilities
 */
const server = new Server(
  {
    name: "azure-devops-mcp",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {} // Enable tools capability
    }
  }
);

/**
 * Register available tools with the MCP Server
 * - get_projects: Lists all projects in Azure DevOps
 * - get_teams: Lists teams for a specific project
 */
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_projects",
      description: "Lista todos os projetos no Azure DevOps",
      inputSchema: { 
        type: "object",
        properties: {} // No required parameters
      }
    },
    {
      name: "get_teams",
      description: "Lista times de um projeto específico",
      inputSchema: {
        type: "object",
        properties: {
          project_name: { 
            type: "string",
            description: "Nome do projeto (opcional)" 
          }
        }
      }
    }
  ]
}));

/**
 * Main request handler for tool execution
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    // Handle get_projects request
    if (request.params.name === "get_projects") {
      const response = await axios.post(GRAPHQL_API_URL, {
        query: `{ getProjects { id name state } }`
      });
      
      // Check for GraphQL errors
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      // Return formatted response
      return {
        content: [{
          type: "text",
          text: `Projetos disponíveis: ${JSON.stringify(response.data.data.getProjects, null, 2)}`
        }]
      };
    }

    // Handle get_teams request
    if (request.params.name === "get_teams") {
      // Validate and parse input arguments
      const args = TeamsArgsSchema.parse(request.params.arguments);
      
      // Build GraphQL query based on provided arguments
      const query = args.project_name 
        ? `{ getTeams(project_name: "${args.project_name}") { id name projectName } }`
        : `{ getTeams { id name projectName } }`;

      const response = await axios.post(GRAPHQL_API_URL, { query });
      
      // Check for GraphQL errors
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      // Return formatted response
      return {
        content: [{
          type: "text",
          text: `Times encontrados: ${JSON.stringify(response.data.data.getTeams, null, 2)}`
        }]
      };
    }

    // Handle unknown tools
    throw new McpError(ErrorCode.MethodNotFound, "Ferramenta não encontrada");
  } catch (error) {
    // Log and convert errors to MCP format
    console.error("Erro no handler:", error);
    throw new McpError(
      ErrorCode.InternalError,
      error instanceof Error ? error.message : "Erro desconhecido"
    );
  }
});

/**
 * Server initialization and startup
 */
async function main() {
  try {
    console.log("🚀 Iniciando MCP Server para Azure DevOps...");
    
    // Create and configure transport
    const transport = new StdioServerTransport();
    
    // Connect server to transport
    await server.connect(transport);
    
    console.log("✅ Servidor pronto e aguardando conexões via stdio");
    console.log("🔧 Ferramentas disponíveis:");
    console.log("   - get_projects: Lista todos os projetos");
    console.log("   - get_teams: Lista times de um projeto");
    
    // Keep process alive
    setInterval(() => {}, 1000);
  } catch (err) {
    console.error("❌ Falha crítica ao iniciar servidor:", err);
    process.exit(1);
  }
}

// Start the server
main();