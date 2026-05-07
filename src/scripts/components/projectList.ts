import { base } from './Base.js';
import { projectState } from '../store/ProjectState.js';
import { Project } from './project.js';
import { Popup } from './Popup.js';
import { autoBind } from './autoBind.js';
import { ProjectRules } from '../store/ProjectRules.js';

export class ProjectList extends base<HTMLDivElement> {

    constructor(
        private readonly listId: string,
        private readonly title: string,
        hostId: string,
        private readonly popup: Popup,
    ) {
        super('list', hostId, false, `${listId}-projects`);
        
        if (!this._element) {
            this._renderManualList();
        }
        
        this._renderContent();
        this._bindEvents();
    }

    private _renderManualList() {
        const div = document.createElement('div');
        div.id = `${this.listId}-projects`;
        div.className = 'projects';
        div.style.opacity = '0';
        div.style.backgroundColor = '#f8f9fa'; 
        
        div.innerHTML = `
            <header class="title-header">
                <h1 class="title"></h1>
                <button class="delete-list">X</button>
            </header>
            <ul class="project-list" style="min-height: 150px;"></ul>
        `;
        
        const host = document.getElementById('app')!;
        host.appendChild(div);
        this._element = div;

        requestAnimationFrame(() => {
            div.style.transition = 'opacity 0.25s ease-out';
            div.style.opacity = '1';
        });
    }

    private _renderContent(): void {
        if (!this._element) return;
        const header = this._element.querySelector('h1');
        const ul = this._element.querySelector('ul');
        
        if (header) header.textContent = this.title;
        if (ul) ul.id = `${this.listId}-list`;
    }

    private _bindEvents(): void {
        if (!this._element) return;

        projectState.pushListener((projects) => {
            const relevant = projects.filter(p => String(p.status) === String(this.listId));
            this._renderProjects(relevant);
        });

        const deleteBtn = this._element.querySelector('.delete-list');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                if (confirm('Delete this list and all its tasks?')) {
                    projectState.deleteList(this.listId);
                }
            });
        }

        this._element.addEventListener('dragover', this._onDragOver);
        this._element.addEventListener('dragleave', this._onDragLeave);
        this._element.addEventListener('drop', this._onDrop);
    }

    private _renderProjects(projects: ProjectRules[]): void {
        const listEl = document.getElementById(`${this.listId}-list`) as HTMLUListElement;
        
        if (!listEl) return;
        
        listEl.innerHTML = '';
        projects.forEach(task => new Project(listEl.id, task, this.popup));
    }

    @autoBind
    private _onDragOver(e: DragEvent): void {
        e.preventDefault();
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'move';
        }
        this._element.classList.add('drag-over');
    }

    @autoBind
    private _onDragLeave(e: DragEvent): void {
        if (!this._element.contains(e.relatedTarget as Node)) {
            this._element.classList.remove('drag-over');
        }
    }

    @autoBind
    private _onDrop(e: DragEvent): void {
        e.preventDefault();
        this._element.classList.remove('drag-over');
        const taskId = e.dataTransfer?.getData('text/plain');
        if (taskId) {
            projectState.changeProjectStatus(taskId, this.listId);
        }
    }
}