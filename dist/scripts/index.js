import { projectState } from "./store/ProjectState.js";
import { ProjectList } from "./components/projectList.js";
import { Fields } from "./components/fields.js";
new Fields();
const appEl = document.getElementById('app');
const listsContainer = document.createElement('div');
listsContainer.id = 'lists-container';
appEl.appendChild(listsContainer);
projectState.pushListener((projects, lists) => {
    listsContainer.innerHTML = '';
    lists.forEach(list => {
        new ProjectList(list.id, list.title, 'lists-container');
    });
});
//# sourceMappingURL=index.js.map