
import { z } from 'zod';
import { APIRequestProjectSchema, Project, APIRequestTeamsSchema, Teams } from './types';
import { requestAzure } from './fetch';

export async function getProjects(project_name?: string): Promise<Project[] | Project | null>{
   
    try{

        const response = await requestAzure({
            method: "GET",
            endpoint: "projects"
        });

        const projects = await response.json();

        const parsed = APIRequestProjectSchema.parse(projects);

        if (project_name) {
            return parsed.value.find(project => project.name === project_name) || null;
        }

        return parsed.value;
    } catch (error) {
        console.error("Error getting projects:", error);
        return null;
    }
}

export async function getTeams(project_name?: string, team_name?: string): Promise<Teams[] | Teams | null> {
  
    try{

        const response = await requestAzure({
            method: "GET",
            endpoint: "teams"
        });

        const teams = await response.json();

        const parsed = APIRequestTeamsSchema.parse(teams);

        if (project_name || team_name) {
            return parsed.value.find(team => team.projectName === project_name || team.name === team_name) || null;
        }

        return parsed.value;

    }catch(error){
        console.error("Error getting teams:", error);
        return null;
    }
}

    