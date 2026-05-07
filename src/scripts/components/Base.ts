export class base<T extends HTMLElement> {
    private _template!: HTMLTemplateElement | null;
    private _hostElement!: HTMLDivElement;
    public _element!: T;

    constructor(
        private _templateId: string,
        private _hostElementId: string,
        private _postionElementStart: boolean,
        private _elementId: string
    ) {
        const [template, hostElement] = this._targetElement(this._templateId, this._hostElementId);
        this._hostElement = hostElement;
        this._template = template;

        if (this._template) {
            const templateContent = document.importNode(this._template.content, true);
            this._element = templateContent.firstElementChild as T;
            if (this._elementId) {
                this._element.id = this._elementId;
            }
            this._insertPPositionedElement(this._postionElementStart);
        } else {
            this._element = null as any;
        }
    }

    private _targetElement(templateId: string, hostId: string): [HTMLTemplateElement | null, HTMLDivElement] {
        const template = document.getElementById(templateId) as HTMLTemplateElement;
        const hostElement = document.getElementById(hostId) as HTMLDivElement;
        return [template, hostElement];
    }

    private _insertPPositionedElement(positionStart: boolean) {
        if (this._element && this._hostElement) {
            this._hostElement.insertAdjacentElement(
                positionStart ? 'afterbegin' : 'beforeend',
                this._element
            );
        }
    }
}