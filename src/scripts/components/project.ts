import { projectState }  from '../store/ProjectState.js';
import { base }           from './Base.js';
import { autoBind }       from './autoBind.js';
import { Popup }          from './Popup.js';


export class Project extends base<HTMLLIElement> {

    constructor(
        hostId: string,
        private readonly task: any,
        private readonly popup: Popup,          
    ) {
        super('project-item', hostId, false, task.id);
        this._renderContent();
        this._bindEvents();
    }

    // ── Private ───────────────────────────────────────────────────────

    private _renderContent(): void {
        this._element.querySelector('h2')!.textContent = this.task.title;
        this._element.querySelector('p')! .textContent = this.task.description;
    }

    private _bindEvents(): void {
        // Delete
        this._element.querySelector<HTMLButtonElement>('.delete')!
            .addEventListener('click', this._onDelete);

        // Edit :open shared popup
        this._element.querySelector<HTMLButtonElement>('.edit')!
            .addEventListener('click', this._onEdit);

        // Drag & drop
        this._element.addEventListener('dragstart', this._onDragStart);
        this._element.addEventListener('dragend',   this._onDragEnd);
    }

    @autoBind
    private _onDelete(): void {
        if (confirm('Are you sure you want to delete this task?')) {
            projectState.deleteProjects(this.task.id);
        }
    }

    @autoBind
    private _onEdit(): void {
        this.popup.open(this.task.id, this.task.title, this.task.description);
    }

    @autoBind
    private _onDragStart(e: DragEvent): void {
        e.dataTransfer!.setData('text/plain', this.task.id);
        e.dataTransfer!.effectAllowed = 'move';
        this._element.classList.add('dragging');
    }

    @autoBind
    private _onDragEnd(): void {
        this._element.classList.remove('dragging');
    }
}