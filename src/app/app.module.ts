import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";


import {AppComponent} from "./app.component";
import {MainComponent} from "./layout/main.component";
import {ProjectListComponent} from "./project/project-list.component";
import {ProjectViewComponent} from "./project/project-view.component";
import {ProjectService} from "./project/project.service";
import {HttpClientModule} from "@angular/common/http";
import {ProjectFormComponent} from "./project/project-form.component";
import {FormsModule} from "@angular/forms";
import {TimerComponent} from "./timer/timer.component";
import {ChecklistComponent} from "./checklist/checklist.component";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProjectListComponent,
    ProjectViewComponent,
    ProjectFormComponent,
    TimerComponent,
    ChecklistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
