import {base} from "./Base.js";
export class Popup extends base<HTMLDivElement> {
    constructor() {
        super('popup_template', 'app', false, 'popup_container');
        this._closePopup();
    }
    /**
     * @desc Closes the popup when the close button is clicked.
     */
    private _closePopup(): void {
        const closeButton=document.querySelector('.close')! as HTMLDivElement;
closeButton.addEventListener('click', () => {
  this._element.classList.remove('visible_popup');
});
    }
}