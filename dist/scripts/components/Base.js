export class base {
    constructor(_templateId, _hostElementId, _postionElementStart, _elementId) {
        this._templateId = _templateId;
        this._hostElementId = _hostElementId;
        this._postionElementStart = _postionElementStart;
        this._elementId = _elementId;
        const [template, hostElement] = this._targetElement(this._templateId, this._hostElementId);
        this._hostElement = hostElement;
        this._template = template;
        if (this._template) {
            const templateContent = document.importNode(this._template.content, true);
            this._element = templateContent.firstElementChild;
            if (this._elementId) {
                this._element.id = this._elementId;
            }
            this._insertPPositionedElement(this._postionElementStart);
        }
        else {
            this._element = null;
        }
    }
    _targetElement(templateId, hostId) {
        const template = document.getElementById(templateId);
        const hostElement = document.getElementById(hostId);
        return [template, hostElement];
    }
    _insertPPositionedElement(positionStart) {
        if (this._element && this._hostElement) {
            this._hostElement.insertAdjacentElement(positionStart ? 'afterbegin' : 'beforeend', this._element);
        }
    }
}
//# sourceMappingURL=Base.js.map