import {Component, OnInit} from "@angular/core";
import {ProjectService} from "../project/project.service";
import Project from "../project/project";

@Component({
  selector: "main-view",
  templateUrl: "./main.component.html"
})
export class MainComponent implements OnInit {

  projects: Project[] = [];
  selectedProject: Project = null;
  isEditMode: boolean = false;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projectService.getProjects().then(
      projects => this.projects = projects
    );
  }

  selectProject(project: Project): void {
    this.selectedProject = project;
  }

  clickAddProject() {
    this.isEditMode = true;
  }

  addProject(project: Project) {
    this.projectService.addProject(project)
      .then(response => {
        this.projects.push(response);
        this.isEditMode = false;
        this.selectedProject = response;
      });
  }

  editProject(project: Project) {
    this.projectService.updateProject(project)
      .then(response => this.projects.map(p => p.id === project.id ? project : p));
  }

  deleteProject(project: Project) {
    this.projectService.deleteProject(project)
      .then(() => {
        this.projects = this.projects.filter(p => p.id !== project.id);
        this.isEditMode = false;
        this.selectedProject = null;
      });
  }
}
