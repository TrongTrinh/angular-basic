import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
export interface IBlogUserDetail {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class BlogComponent {
  users: IBlogUserDetail[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
    },
  ];

  userForm: FormGroup;
  editUserData: IBlogUserDetail | null = null;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  editUser(user: IBlogUserDetail) {
    this.editUserData = user;
    this.userForm.patchValue(user);
  }

  deleteUser(user: IBlogUserDetail) {
    this.users = this.users.filter((u) => u.id !== user.id);
  }

  /**
   * Handles the form submission event.
   *
   * If the form is valid, it checks if there is user data being edited.
   * - If editing, it updates the existing user data with the form values.
   * - If not editing, it creates a new user with a unique ID and adds it to the users list.
   *
   * After processing, the form is reset.
   *
   * @returns {void}
   */
  onSubmit() {
    if (!this.userForm.valid) return;

    const formValue = this.userForm.value;
    if (this.editUserData) {
      const index = this.users.findIndex((u) => u.id === this.editUserData!.id);
      this.users[index] = { ...this.editUserData, ...formValue };
      this.editUserData = null;
    } else {
      const newUser: IBlogUserDetail = {
        id: this.users.length + 1,
        ...formValue,
      };
      this.users.push(newUser);
    }
    this.userForm.reset();
  }

  onCancel() {
    this.userForm.reset();
    this.editUserData = null;
  }
}
