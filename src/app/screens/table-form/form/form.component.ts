import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUserDetail } from '../type';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'table-form',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  @Input() editUserDataInput: IUserDetail | null = null;

  @Output() handleSubmitChange = new EventEmitter<IUserDetail>();

  onHandleSubmit() {
    this.handleSubmitChange.emit();
  }
}
