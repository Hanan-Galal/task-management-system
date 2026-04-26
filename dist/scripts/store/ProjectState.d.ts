import { ProjectRules } from "./ProjectRules.js";
export interface List {
    id: string;
    title: string;
}
type Listener = (projects: ProjectRules[], lists: List[]) => void;
declare class ProjectState {
    private projects;
    private lists;
    private listeners;
    private static instance;
    private constructor();
    static getInstance(): ProjectState;
    pushListener(fn: Listener): void;
    addList(title: string): void;
    deleteList(listId: string): void;
    createProject(title: string, desc: string, listId: string): void;
    updateTask(id: string, newTitle: string, newDesc: string): void;
    deleteProjects(id: string): void;
    changeProjectStatus(id: string, newStatus: string): void;
    private update;
}
export declare const projectState: ProjectState;
export {};
//# sourceMappingURL=ProjectState.d.ts.map