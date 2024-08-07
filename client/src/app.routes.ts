import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    title: 'Gallery',
    children: [
      {
        path: 'contact',
        title: 'Contact Me',
        loadComponent: () =>
          import('./pages/contact/contact.component').then(
            (m) => m.ContactComponent
          ),
      },
    ],
  },
];
