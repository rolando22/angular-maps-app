import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'fullscreen-map',
    title: 'Mapa - Pantalla Completa',
    loadComponent: () => import('@pages/fullscreen-map-page/fullscreen-map-page.component'),
  },
  {
    path: 'markers',
    title: 'Marcadores',
    loadComponent: () => import('@pages/markers-page/markers-page.component'),
  },
  {
    path: 'houses',
    title: 'Propiedades disponibles',
    loadComponent: () => import('@pages/houses-page/houses-page.component'),
  },
  {
    path: '**',
    redirectTo: 'fullscreen-map',
  },
];
