import {Component, EventEmitter, Input, Output} from "@angular/core";
import Project from "./project";
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

  updateTime(event) {
    const updatedProject = Object.assign(this.project);
    updatedProject.timeInSeconds = event;
    this.updateProject(updatedProject);
  }

  updateProject(updatedProject: Project) {
    this.onUpdateProject.emit(updatedProject);
  }

  deleteProject() {
    this.onDeleteProject.emit(this.project);
  }
}