export class base {
    constructor(_templateId, _hostElementId, _postionElementStart, _elementId) {
        this._templateId = _templateId;
        this._hostElementId = _hostElementId;
        this._postionElementStart = _postionElementStart;
        this._elementId = _elementId;
        const [template, hostElement] = this._targetElement(this._templateId, this._hostElementId);
        const templateContent = document.importNode(template.content, true);
        this._element = templateContent.firstElementChild;
        if (this._elementId) {
            this._element.id = this._elementId;
        }
        this._insertPPositionedElement(this._postionElementStart);
    }
    _targetElement(templateId, hostId) {
        this._template = document.getElementById(templateId);
        this._hostElement = document.getElementById(hostId);
        return [this._template, this._hostElement];
    }
    _insertPPositionedElement(positionStart) {
        this._hostElement.insertAdjacentElement(positionStart ? 'afterbegin' : 'beforeend', this._element);
    }
}
//# sourceMappingURL=Base.js.map