import { base } from "./Base.js";
export class Popup extends base {
    constructor() {
        super('popup_template', 'app', false, 'popup_container');
        this._closePopup();
    }
    _closePopup() {
        const closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', () => {
            this._element.classList.remove('visible_popup');
        });
    }
}
//# sourceMappingURL=Popup.js.map