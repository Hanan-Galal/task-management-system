export class base<T extends HTMLElement>  {
    private _template!: HTMLTemplateElement;
    private _hostElement!: HTMLDivElement;
    public _element!: T;

    constructor(
        private _templateId: string,
        private _hostElementId: string, 
        private _postionElementStart: boolean,
         private _elementId: string,
       
    ) {
       
      const [template, hostElement] = this._targetElement(this._templateId, this._hostElementId);
        const templateContent = document.importNode(template.content, true);
        this._element = templateContent.firstElementChild as T;

        if (this._elementId) {
            this._element.id = this._elementId;
        }
        this._insertPPositionedElement(this._postionElementStart);
    }


    private _targetElement(templateId: string, hostId: string): [HTMLTemplateElement, HTMLDivElement] {
        this._template = document.getElementById(templateId)! as HTMLTemplateElement;
        this._hostElement = document.getElementById(hostId)! as HTMLDivElement;
        return [this._template, this._hostElement];
    }

    private _insertPPositionedElement(positionStart: boolean) {
        this._hostElement.insertAdjacentElement(
            positionStart ? 'afterbegin' : 'beforeend', 
            this._element
        );
    }
}