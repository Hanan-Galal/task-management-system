import { projectState } from "../store/ProjectState.js";
import { base } from "./Base.js";
import { autoBind } from "./autoBind.js";

export class Fields extends base<HTMLDivElement> {
    constructor() {

        super('fields', 'app', true, 'forms-container');
        this.configure();
    }

    configure() {
        
        const taskForm = this._element.querySelector('#task-form');
        const listForm = this._element.querySelector('#list-form');

        if (taskForm) {
            taskForm.addEventListener('submit', this.submitTask);
        }

        if (listForm) {
            listForm.addEventListener('submit', this.submitList);
        }
        
        
        projectState.pushListener((_, lists) => {
            const select = this._element.querySelector('#task-list-select') as HTMLSelectElement;
            if (select) {
                select.innerHTML = lists
                    .map(l => `<option value="${l.id}">${l.title}</option>`)
                    .join('');
            }
        });
    }

    @autoBind
    private submitTask(e: Event) {
        e.preventDefault();
        
        const titleEl = this._element.querySelector('#task-title') as HTMLInputElement;
        const descEl = this._element.querySelector('#task-desc') as HTMLInputElement;
        const listSelect = this._element.querySelector('#task-list-select') as HTMLSelectElement;

        const title = titleEl.value.trim();
        const desc = descEl.value.trim();
        const listId = listSelect.value;

        if (title && desc && listId) {
            projectState.createProject(title, desc, listId);
            
            titleEl.value = '';
            descEl.value = '';
        } else {
            alert('Please fill all fields');
        }
    }

    @autoBind
    private submitList(e: Event) {
        e.preventDefault();
        const input = this._element.querySelector('#list-title') as HTMLInputElement;
        const listTitle = input.value.trim();

        if (listTitle) {
            projectState.addList(listTitle);
                        input.value = '';
        }
    }
}