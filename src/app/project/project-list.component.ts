import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ProjectService} from "./project.service";
import Project from "./project";


@Component({
  templateUrl: "./project-list.component.html",
  selector: "project-list",
})
export class ProjectListComponent {
  @Input() projects: Project[];
  @Input() selectedProject: Project;
  @Output() onSelectProject: EventEmitter<Project> = new EventEmitter<Project>();
  isLocked = false;

  constructor(private projectService: ProjectService) {
    this.projectService.lock$.subscribe(lock => {
      if (lock !== null) this.isLocked = lock;
    });
  }

  onSelect(project: Project): void {
    this.onSelectProject.emit(project);
  }
}
