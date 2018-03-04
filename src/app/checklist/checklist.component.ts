import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ChecklistItem} from "./checklist-item";

/**
 * Created by Seppo on 22/02/2018.
 */
@Component({
  templateUrl: "./checklist.component.html",
  selector: "checklist",
})
export class ChecklistComponent {
  @Input() checklist: ChecklistItem[];
  @Output() onAddItem: EventEmitter<ChecklistItem> = new EventEmitter();
  @Output() updateItemDone: EventEmitter<ChecklistItem> = new EventEmitter();

  isEditMode = false;
  newContent = "";

  clickAddItem() {
    this.isEditMode = true;
  }

  submitForm(value: string) {
    this.onAddItem.emit(new ChecklistItem(value));
    this.newContent = "";
    this.isEditMode = false;
  }

  cancelForm() {
    this.newContent = "";
    this.isEditMode = false;
  }

  setItemDone(item: ChecklistItem, value: boolean) {
    item.done = value;
    this.updateItemDone.emit(item);
  }

}
