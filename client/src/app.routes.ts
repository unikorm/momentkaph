import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ActivatedRouteSnapshot } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    title: '',
    children: [
      {
        path: 'contact-me',
        title: 'Contact Me',
        loadComponent: () =>
          import('./pages/contact/contact.component').then(
            (m) => m.ContactComponent
          ),
      },
      {
        path: 'gallery',
        title: 'momentkaph',
        loadComponent: () =>
          import('./pages/gallery/gallery.component').then(
            (m) => m.GalleryComponent
          ),
      },
      {
        path: 'gallery/:type',
        title: (route: ActivatedRouteSnapshot) =>
          `Gallery - ${route.params['type']}`,
        loadComponent: () =>
          import('./pages/gallery-type/gallery-type.component').then(
            (m) => m.GalleryTypeComponent
          ),
      },
      {
        path: 'about-me',
        title: 'About Me',
        loadComponent: () =>
          import('./pages/about-me/about-me.component').then(
            (m) => m.AboutMeComponent
          ),
      },
      {
        path: '',
        redirectTo: 'gallery',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    title: '404',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
