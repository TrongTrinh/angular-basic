import { Injectable } from '@angular/core';
import { IUserDetail } from '../../screens/table-form/type';

@Injectable({ providedIn: 'root' })
export class TableFormService {
  updateData(updatedUser: IUserDetail, users: IUserDetail[]) {
    // find index in array
    const index = users.findIndex((user) => user.id === updatedUser.id);

    if (index !== -1) {
      users[index] = updatedUser; // Update the user data
      users[index]; // Return the updated user
    }

    return users;
  }
}
