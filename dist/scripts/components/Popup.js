import { base } from './Base.js';
import { assignValidationInputs, handleValidationErrors } from '../utils/validation/validation_helpers.js';
import { projectState } from '../store/ProjectState.js';
export class Popup extends base {
    constructor() {
        super('popup_template', 'app', false, 'edit-popup');
        this._currentTaskId = null;
        this._originalTitle = '';
        this._originalDesc = '';
        if (!this._element) {
            this._renderManual();
        }
        this._initializeRefs();
        this._bindEvents();
    }
    _renderManual() {
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
        document.getElementById('app').appendChild(div);
        this._element = div;
    }
    _initializeRefs() {
        this._titleInput = this._element.querySelector('#edit-title');
        this._descInput = this._element.querySelector('#edit-desc');
        this._errorEl = this._element.querySelector('#popup-error');
        this._form = this._element.querySelector('#edit-form');
    }
    open(taskId, currentTitle, currentDesc) {
        this._currentTaskId = taskId;
        this._originalTitle = currentTitle;
        this._originalDesc = currentDesc;
        this._titleInput.value = currentTitle;
        this._descInput.value = currentDesc;
        this._clearError();
        this._element.classList.add('visible_popup');
        this._titleInput.focus();
    }
    _bindEvents() {
        this._element.querySelector('.close').addEventListener('click', () => this._close());
        this._element.querySelector('.btn-cancel').addEventListener('click', () => this._close());
        this._element.addEventListener('click', (e) => {
            if (e.target === this._element)
                this._close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this._isOpen())
                this._close();
        });
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleSave();
        });
    }
    _handleSave() {
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
        projectState.updateTask(this._currentTaskId, finalTitle, finalDesc);
        this._close();
    }
    _close() {
        this._element.classList.remove('visible_popup');
        this._currentTaskId = null;
        this._clearError();
    }
    _isOpen() {
        return this._element.classList.contains('visible_popup');
    }
    _showError(msg) {
        this._errorEl.textContent = msg;
    }
    _clearError() {
        this._errorEl.textContent = '';
    }
}
//# sourceMappingURL=Popup.js.map