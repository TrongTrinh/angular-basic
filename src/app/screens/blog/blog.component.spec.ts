import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BlogComponent } from './blog.component';
import { CommonModule } from '@angular/common';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, BlogComponent], // Add BlogComponent to imports
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form with default values', () => {
    expect(component.userForm).toBeDefined();
    expect(component.userForm.value).toEqual({
      firstName: '',
      lastName: '',
      email: '',
    });
  });

  it('should edit user and patch form values', () => {
    const user = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };

    component.editUser(user);

    expect(component.editUserData).toEqual(user);
    expect(component.userForm.value).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    });
  });

  it('should delete user from the users array', () => {
    const user = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };

    component.deleteUser(user);

    expect(component.users.length).toBe(1);
    expect(component.users.find((u) => u.id === user.id)).toBeUndefined();
  });

  it('should not submit if form is invalid', () => {
    component.userForm.setErrors({ invalid: true });
    component.onSubmit();
    expect(component.users.length).toBe(2); // No user should be added
  });

  it('should add new user if editUserData is not present', () => {
    component.userForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    });
    component.onSubmit();

    expect(component.users.length).toBe(3);
    expect(component.users[2].firstName).toBe('John');
    expect(component.users[2].lastName).toBe('Doe');
    expect(component.users[2].email).toBe('john.doe@example.com');
  });

  it('should update user if editUserData is present', () => {
    const existingUser = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };
    component.editUserData = existingUser;

    component.userForm.setValue({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
    });
    component.onSubmit();

    expect(component.users[0].firstName).toBe('Jane');
    expect(component.users[0].lastName).toBe('Doe');
    expect(component.users[0].email).toBe('jane.doe@example.com');
    expect(component.editUserData).toBeNull();
  });

  it('should reset the form and clear editUserData on cancel', () => {
    const user = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };

    component.editUser(user);
    expect(component.editUserData).toEqual(user);

    component.onCancel();

    console.log(
      '🚀 ~ expect ~ component.userForm.value:',
      component.userForm.value
    );
    expect(component.userForm.value).toEqual({
      firstName: null,
      lastName: null,
      email: null,
    });
    expect(component.editUserData).toBeNull();
  });
});
