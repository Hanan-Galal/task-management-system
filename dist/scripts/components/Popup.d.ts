import { base } from './Base.js';
export declare class Popup extends base<HTMLDivElement> {
    private _titleInput;
    private _descInput;
    private _errorEl;
    private _form;
    private _currentTaskId;
    private _originalTitle;
    private _originalDesc;
    constructor();
    private _renderManual;
    private _initializeRefs;
    open(taskId: string, currentTitle: string, currentDesc: string): void;
    private _bindEvents;
    private _handleSave;
    private _close;
    private _isOpen;
    private _showError;
    private _clearError;
}
//# sourceMappingURL=Popup.d.ts.map