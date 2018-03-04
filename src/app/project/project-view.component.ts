import {Component, EventEmitter, Input, Output} from "@angular/core";
import Project from "./project";
import {ProjectService} from "./project.service";
import {ChecklistItem} from "../checklist/checklist-item";
/**
 * Created by Seppo on 21/02/2018.
 */

@Component({
  templateUrl: "./project-view.component.html",
  selector: "project-view",
})
export class ProjectViewComponent {

  @Input() project: Project;
  @Output() onUpdateProject: EventEmitter<Project> = new EventEmitter();
  @Output() onDeleteProject: EventEmitter<Project> = new EventEmitter();
  @Output() onClickEditProject: EventEmitter<Project> = new EventEmitter();
  isLocked = false;

  constructor(private projectService: ProjectService) {
    this.projectService.lock$.subscribe(lock => {
      if (lock !== null) this.isLocked = lock;
    });
  }

  updateTime(event: number) {
    const updatedProject = Object.assign(this.project);
    updatedProject.timeInSeconds = event;
    this.updateProject(updatedProject);
  }

  updateProject(updatedProject: Project) {
    this.onUpdateProject.emit(updatedProject);
  }

  toggleProjectDone(event: boolean) {
    this.project.done = event;
    this.updateProject(this.project);
  }

  deleteProject() {
    this.onDeleteProject.emit(this.project);
  }

  clickEditProject() {
    this.onClickEditProject.emit(this.project);
  }

  addChecklistItem(item: ChecklistItem) {
    this.projectService.addChecklistItem(this.project.id, item)
      .then(newItem => {
        this.project.checklist.push(newItem);
      });
  }
}
