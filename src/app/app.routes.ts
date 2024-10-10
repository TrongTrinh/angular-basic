import { Routes } from '@angular/router';
import { TableFormComponent } from './screens/table-form/table-form.component';
import { BlogComponent } from './screens/blog/blog.component'; // Import BlogComponent

export const routes: Routes = [
  {
    path: '',
    component: TableFormComponent,
  },
  {
    path: 'blog',
    component: BlogComponent, // Add route for BlogComponent
  },
];
