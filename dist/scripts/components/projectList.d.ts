import { base } from "./Base.js";
export declare class ProjectList extends base<HTMLDivElement> {
    private listId;
    private title;
    constructor(listId: string, title: string, hostId: string);
    configure(): void;
    renderContent(): void;
    private renderProjects;
    private dropHandler;
}
//# sourceMappingURL=projectList.d.ts.map