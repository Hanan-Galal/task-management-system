import { base } from './Base.js';
import { assignValidationInputs, handleValidationErrors } from '../utils/validation/validation_helpers.js';
import { projectState } from '../store/ProjectState.js';

export class Popup extends base<HTMLDivElement> {
    private _titleInput!: HTMLInputElement;
    private _descInput!: HTMLInputElement;
    private _errorEl!: HTMLParagraphElement;
    private _form!: HTMLFormElement;

    private _currentTaskId: string | null = null;
    private _originalTitle: string = '';
    private _originalDesc: string = '';

    constructor() {
        super('popup_template', 'app', false, 'edit-popup');

        if (!this._element) {
            this._renderManual();
        }

        this._initializeRefs();
        this._bindEvents();
    }

    private _renderManual(): void {
        const div = document.createElement('div');
        div.id = 'edit-popup';
        div.className = 'popup_container';
        div.innerHTML = `
            <div class="popup">
                <div class="popup_header">
                    <h3>Edit Task</h3>
                    <div class="close" style="cursor:pointer">×</div>
                </div>
                <div class="content">
                    <form id="edit-form">
                        <div class="form-control">
                            <label>Title</label>
                            <input type="text" id="edit-title" style="width:100%; margin-bottom:10px; padding:8px;">
                        </div>
                        <div class="form-control">
                            <label>Description</label>
                            <textarea id="edit-desc" rows="3" style="width:100%; padding:8px;"></textarea>
                        </div>
                        <p id="popup-error" style="color:red; font-size:0.8rem;"></p>
                        <div style="display:flex; gap:10px; margin-top:10px;">
                            <button type="submit" style="flex:1; padding:10px; background:#28a745; color:white; border:none; border-radius:4px; cursor:pointer;">Save Changes</button>
                            <button type="button" class="btn-cancel" style="flex:1; padding:10px; background:#dc3545; color:white; border:none; border-radius:4px; cursor:pointer;">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>`;
        document.getElementById('app')!.appendChild(div);
        this._element = div;
    }

    private _initializeRefs(): void {
        this._titleInput = this._element.querySelector('#edit-title')!;
        this._descInput = this._element.querySelector('#edit-desc')!;
        this._errorEl = this._element.querySelector('#popup-error')!;
        this._form = this._element.querySelector('#edit-form')!;
    }

    open(taskId: string, currentTitle: string, currentDesc: string): void {
        this._currentTaskId = taskId;
        this._originalTitle = currentTitle;
        this._originalDesc = currentDesc;

        this._titleInput.value = currentTitle;
        this._descInput.value = currentDesc;
        this._clearError();

        this._element.classList.add('visible_popup');
        this._titleInput.focus();
    }

    private _bindEvents(): void {
        this._element.querySelector('.close')!.addEventListener('click', () => this._close());
        this._element.querySelector('.btn-cancel')!.addEventListener('click', () => this._close());

        this._element.addEventListener('click', (e: MouseEvent) => {
            if (e.target === this._element) this._close();
        });

        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Escape' && this._isOpen()) this._close();
        });

        this._form.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this._handleSave();
        });
    }

    private _handleSave(): void {
        const rawTitle = this._titleInput.value.trim();
        const rawDesc = this._descInput.value.trim();

        const finalTitle = rawTitle || this._originalTitle;
        const finalDesc = rawDesc || this._originalDesc;

        const [titleRule, descRule] = assignValidationInputs(finalTitle, finalDesc);
        const error = handleValidationErrors(titleRule) || handleValidationErrors(descRule);

        if (error) {
            this._showError(error);
            return;
        }

        projectState.updateTask(this._currentTaskId!, finalTitle, finalDesc);
        this._close();
    }

    private _close(): void {
        this._element.classList.remove('visible_popup');
        this._currentTaskId = null;
        this._clearError();
    }

    private _isOpen(): boolean {
        return this._element.classList.contains('visible_popup');
    }

    private _showError(msg: string): void {
        this._errorEl.textContent = msg;
    }

    private _clearError(): void {
        this._errorEl.textContent = '';
    }
}