import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IUserDetail } from './type';
import { FormComponent } from './form/form.component';
import { TableFormService } from '../../services/table-form';

@Component({
  selector: 'app-table-form',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, FormComponent],
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.css'],
})
export class TableFormComponent {
  users: IUserDetail[] = [
    {
      id: 1,
      firstName: 'Trong 1',
      lastName: 'Trinh 1',
      username: 'trongtrinh1',
    },
    {
      id: 2,
      firstName: 'Trong 2',
      lastName: 'Trinh 2',
      username: 'trongtrinh2',
    },
  ];

  editUserData: IUserDetail | null = null;

  constructor(private tableFormService: TableFormService) {}

  editUser(user: IUserDetail) {
    this.editUserData = user;
  }

  deleteUser() {
    this.editUserData = null;
  }

  onSubmitChange(updatedUser: IUserDetail) {
    console.log('Updated User:', updatedUser);
    this.users = this.tableFormService.updateData(
      updatedUser,
      this.users
    ) as IUserDetail[];
  }
}
