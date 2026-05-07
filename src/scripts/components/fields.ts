import { projectState } from '../store/ProjectState.js';
import { base }          from './Base.js';
import { autoBind }      from './autoBind.js';


export class Fields extends base<HTMLDivElement> {

    // ── DOM refs 
    private readonly _taskForm:    HTMLFormElement;
    private readonly _listForm:    HTMLFormElement;
    private readonly _taskTitle:   HTMLInputElement;
    private readonly _taskDesc:    HTMLInputElement;
    private readonly _listTitle:   HTMLInputElement;
    private readonly _listSelect:  HTMLSelectElement;

    constructor() {
        super('fields', 'app', true, 'forms-container');

        
        this._taskForm   = this._element.querySelector<HTMLFormElement>('#task-form')!;
        this._listForm   = this._element.querySelector<HTMLFormElement>('#list-form')!;
        this._taskTitle  = this._element.querySelector<HTMLInputElement>('#task-title')!;
        this._taskDesc   = this._element.querySelector<HTMLInputElement>('#task-desc')!;
        this._listTitle  = this._element.querySelector<HTMLInputElement>('#list-title')!;
        this._listSelect = this._element.querySelector<HTMLSelectElement>('#task-list-select')!;

        this._bindEvents();
    }

   

    private _bindEvents(): void {
        this._taskForm.addEventListener('submit', this._onSubmitTask);
        this._listForm.addEventListener('submit', this._onSubmitList);

        // Keep the <select> in sync whenever lists change
        projectState.pushListener((_, lists) => {
            this._listSelect.innerHTML = lists
                .map(l => `<option value="${l.id}">${l.title}</option>`)
                .join('');
        });
    }

    @autoBind
    private _onSubmitTask(e: Event): void {
        e.preventDefault();

        const title  = this._taskTitle.value.trim();
        const desc   = this._taskDesc.value.trim();
        const listId = this._listSelect.value;

        if (!title || !desc || !listId) {
            alert('Please fill all fields');
            return;
        }

        projectState.createProject(title, desc, listId);

        //  Clear form inputs
        this._taskTitle.value  = '';
        this._taskDesc.value   = '';
        this._listSelect.selectedIndex = 0;
        this._taskTitle.focus();
    }

    @autoBind
    private _onSubmitList(e: Event): void {
        e.preventDefault();

        const title = this._listTitle.value.trim();
        if (!title) return;

        projectState.addList(title);

        // Clear form input
        this._listTitle.value = '';
        this._listTitle.focus();
    }
}