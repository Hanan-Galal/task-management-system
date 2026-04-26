import type { projectStatus } from "../utils/project-status.js";

export class ProjectRules {
    id: string;
    constructor(public ID: string, public title: string, public description: string, public status: projectStatus) {
        this.id = ID;
    }
}