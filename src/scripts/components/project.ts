import { projectState } from "../store/ProjectState.js";
import { base } from "./Base.js";
import { autoBind } from "./autoBind.js";
import { assignValidationInputs, handleValidationErrors } from "../utils/validation/validation_helpers.js";

export class Project extends base<HTMLDivElement> {
    constructor(hostId: string, private project: any) {
        super('project-item', hostId, false, project.id);
        this.renderContent();
        this.configure();
    }

    configure() {
        const deleteBtn = this._element.querySelector('.delete') as HTMLElement;
        if (deleteBtn) {
            deleteBtn.onclick = () => { 
                if (confirm('Are you sure you want to delete this task?')) {
                    projectState.deleteProjects(this.project.id);
                }
            };
        }

        const editBtn = this._element.querySelector('.edit') as HTMLElement;
        if (editBtn) {
            editBtn.onclick = this.editHandler;
        }

        this._element.addEventListener('dragstart', (e) => {
            e.dataTransfer!.setData('text/plain', this.project.id);
            e.dataTransfer!.effectAllowed = 'move';
        });
    }

    renderContent() {
        this._element.querySelector('h2')!.textContent = this.project.title;
        this._element.querySelector('p')!.textContent = this.project.description;
    }

    @autoBind
    private editHandler() {
        const newTitle = prompt('Edit Title:', this.project.title);
        const newDesc = prompt('Edit Description:', this.project.description);

        if (newTitle !== null && newDesc !== null) {
            const titleValue = newTitle.trim();
            const descValue = newDesc.trim();

            if (titleValue.length > 0 && descValue.length > 0) {
                const [titleRule, descRule] = assignValidationInputs(titleValue, descValue);
                const error = handleValidationErrors(titleRule) || handleValidationErrors(descRule);

                if (error) {
                    alert(error);
                    return;
                }

                projectState.updateTask(this.project.id, titleValue, descValue);
            } else {
                alert('Title and Description cannot be empty!');
            }
        }
    }
}