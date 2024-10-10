import { TestBed } from '@angular/core/testing';
import { TableFormService } from './index';
import { IUserDetail } from '../../screens/table-form/type';

describe('TableFormService', () => {
  let service: TableFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update user data correctly', () => {
    const users: IUserDetail[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', username: 'johndoe' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', username: 'janedoe' },
    ];

    const updatedUser: IUserDetail = {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      username: 'johnsmith',
    };

    const updatedUsers = service.updateData(updatedUser, users);

    expect(updatedUsers.length).toBe(2);
    expect(updatedUsers[0].lastName).toBe('Smith');
    expect(updatedUsers[1].lastName).toBe('Doe');
  });

  it('should not update if user id does not exist', () => {
    const users: IUserDetail[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', username: 'johndoe' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', username: 'janedoe' },
    ];

    const updatedUser: IUserDetail = {
      id: 3,
      firstName: 'John',
      lastName: 'Smith',
      username: 'johnsmith',
    };

    const updatedUsers = service.updateData(updatedUser, users);

    expect(updatedUsers.length).toBe(2);
    expect(updatedUsers[0].lastName).toBe('Doe');
    expect(updatedUsers[1].lastName).toBe('Doe');
  });
});
