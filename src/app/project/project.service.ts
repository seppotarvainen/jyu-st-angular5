import {Injectable} from "@angular/core";

import "rxjs/add/operator/toPromise";

import Project from "./project";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ChecklistItem} from "../checklist/checklist-item";

@Injectable()
export class ProjectService {

  private projectsUrl: string = "http://localhost:8080/projects";

  private lock = new BehaviorSubject<boolean>(false);
  lock$ = this.lock.asObservable();

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

  setLock(lockState: boolean) {
    this.lock.next(lockState);
  }

  addChecklistItem(projectId: number, checklistItem: ChecklistItem): Promise<ChecklistItem> {
    const url = `${this.projectsUrl}/${projectId}/checklist-items`;
    return this.http.post(url, checklistItem)
      .toPromise()
      .then(response => response as ChecklistItem);
  }

  updateChecklistItem(projectId: number, checklistItem: ChecklistItem): Promise<ChecklistItem> {
    const url = `${this.projectsUrl}/${projectId}/checklist-items/${checklistItem.id}`;
    return this.http.put(url, checklistItem)
      .toPromise()
      .then(response => response as ChecklistItem);
  }

}
