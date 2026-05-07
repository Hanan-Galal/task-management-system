import { projectState } from './store/ProjectState.js';
import { ProjectList }  from './components/projectList.js';
import { Fields }       from './components/fields.js';
import { Popup }        from './components/Popup.js';
 
 
// Sidebar forms
new Fields();
 
// Single shared popup — created once, reused by every task card
const popup = new Popup();
 
// Container for all kanban columns — created once outside the listener
const listsContainer = document.createElement('div');
listsContainer.id = 'lists-container';
document.getElementById('app')!.appendChild(listsContainer);
 
// Re-render columns whenever the list of lists changes
projectState.pushListener((_projects, lists) => {
    listsContainer.innerHTML = '';
    lists.forEach(list => {
        new ProjectList(list.id, list.title, 'lists-container', popup);
    });
});