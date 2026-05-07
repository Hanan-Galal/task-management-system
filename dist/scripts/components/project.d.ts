import { base } from './Base.js';
import { Popup } from './Popup.js';
export declare class Project extends base<HTMLLIElement> {
    private readonly task;
    private readonly popup;
    constructor(hostId: string, task: any, popup: Popup);
    private _renderContent;
    private _bindEvents;
    private _onDelete;
    private _onEdit;
    private _onDragStart;
    private _onDragEnd;
}
//# sourceMappingURL=project.d.ts.map