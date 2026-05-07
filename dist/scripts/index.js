import { projectState } from './store/ProjectState.js';
import { ProjectList } from './components/projectList.js';
import { Fields } from './components/fields.js';
import { Popup } from './components/Popup.js';
new Fields();
const popup = new Popup();
const listsContainer = document.createElement('div');
listsContainer.id = 'lists-container';
document.getElementById('app').appendChild(listsContainer);
projectState.pushListener((_projects, lists) => {
    listsContainer.innerHTML = '';
    lists.forEach(list => {
        new ProjectList(list.id, list.title, 'lists-container', popup);
    });
});
//# sourceMappingURL=index.js.map