/**
 * Created by Seppo on 19/07/2017.
 */

import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";
import Project from "./project";

@Component({
  templateUrl: "project-form.component.html",
  selector: "project-form"
})
export class ProjectFormComponent implements OnChanges {
  @Input() project: Project;
  @Output() onChangeEditStatus: EventEmitter<boolean> = new EventEmitter();
  @Output() submitForm: EventEmitter<Project> = new EventEmitter();
  projectCopy: Project = new Project();

  constructor() {
  }

  ngOnChanges(): void {
    this.setProjectCopyToOriginal();
  }

  onClickCancel(): void {
    this.onChangeEditStatus.emit(false);
  }

  onClickSubmit(form: Project): void {
    form.id = this.projectCopy.id ? this.projectCopy.id : null;
    this.submitForm.emit(form);
  }

  showProjectHeading(): string {
    if (this.projectCopy && this.projectCopy.title.length > 0) {
      return this.projectCopy.title;
    }
    return "Untitled project";
  }

  private setProjectCopyToOriginal(): void {
    if (this.project) {
      this.projectCopy = Object.assign(this.project) as Project;
    } else {
      this.projectCopy = new Project();
    }
  }
}
