import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { routes } from 'src/app/app.routes';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private router = inject(Router);

  routes = routes
    .filter(route => route.path !== '**')
    .map(route => ({
      path: route.path,
      title: `${route.title || 'Sin título'}`,
    }));

  pageTitle = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event.url),
      map((url) => routes.find(route => `/${route.path}` === url)?.title || 'Sin título'),
    )
  );
}
