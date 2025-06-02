import { url } from 'inspector';
import { z } from 'zod';

export const ProjectSchema = z.object({
    id: z.string(),
    name: z.string(),
    state: z.string(),
});

export const APIRequestProjectSchema = z.object({
    count: z.number(),
    value: z.array(ProjectSchema)
});

export type Project = z.infer<typeof ProjectSchema>;

export const TeamsSchema = z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    projectName: z.string(),
    projectId: z.string(),
});

export const APIRequestTeamsSchema = z.object({
    value: z.array(TeamsSchema)
});

export type Teams = z.infer<typeof TeamsSchema>;