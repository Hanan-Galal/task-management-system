import { base } from './Base.js';
import { Popup } from './Popup.js';
export declare class ProjectList extends base<HTMLDivElement> {
    private readonly listId;
    private readonly title;
    private readonly popup;
    constructor(listId: string, title: string, hostId: string, popup: Popup);
    private _renderManualList;
    private _renderContent;
    private _bindEvents;
    private _renderProjects;
    private _onDragOver;
    private _onDragLeave;
    private _onDrop;
}
//# sourceMappingURL=projectList.d.ts.map