import {Injectable} from "@angular/core";

import "rxjs/add/operator/toPromise";

import Project from "./project";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProjectService {

  private projectsUrl: string = "http://localhost:8080/projects";

  constructor(private http: HttpClient) {
  }

  getProjects(): Promise<Project[]> {
    return this.http.get(this.projectsUrl)
      .toPromise()
      .then(response => response as Project[]);
  }

  addProject(project: Project): Promise<Project> {
    return this.http.post(this.projectsUrl, project)
      .toPromise()
      .then(response => response as Project);
  }

  deleteProject(project: Project): Promise<any> {
    const url = `${this.projectsUrl}/${project.id}`;
    return this.http.delete(url)
      .toPromise();
  }

  updateProject(project: Project): Promise<Project> {
    const url = `${this.projectsUrl}/${project.id}`;
    return this.http.put(url, project)
      .toPromise()
      .then(response => response as Project);
  }

}
