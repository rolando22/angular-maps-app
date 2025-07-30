import { Component, signal } from '@angular/core';
import { I18nPluralPipe } from '@angular/common';

import { HouseCardComponent } from "./house-card/house-card.component";

import type { HouseProperty } from '@shared/interfaces/house-property.interface';

@Component({
  selector: 'app-houses-page',
  imports: [I18nPluralPipe, HouseCardComponent],
  templateUrl: './houses-page.component.html',
})
export default class HousesPageComponent {
  houses = signal<HouseProperty[]>([
    {
      id: crypto.randomUUID(),
      name: 'Villa Serenidad',
      description: 'Un refugio tranquilo con vistas panorámicas al mar y jardines exuberantes.',
      price: 500_000,
      lngLat: { lng: -0.861526, lat: 41.65649 },
      tags: ['Villa', 'Mar', 'Jardines'],
    },
    {
      id: crypto.randomUUID(),
      name: 'Casa del Sol',
      description: 'Una casa luminosa y acogedora con amplias terrazas y piscina privada.',
      price: 750_000,
      lngLat: { lng: -0.862, lat: 41.657 },
      tags: ['Casa', 'Sol', 'Terrazas'],
    },
    {
      id: crypto.randomUUID(),
      name: 'Residencia Esmeralda',
      description: 'Elegante propiedad con acabados de lujo y un diseño arquitectónico moderno.',
      price: 1_200_000,
      lngLat: { lng: -0.863, lat: 41.658 },
      tags: ['Casa', 'Esmeralda', 'Acabados'],
    },
    {
      id: crypto.randomUUID(),
      name: 'Hacienda del Lago',
      description: 'Encantadora hacienda con acceso directo al lago y un entorno natural impresionante.',
      price: 950_000,
      lngLat: { lng: -0.864, lat: 41.659 },
      tags: ['Casa', 'Lago', 'Hacienda'],
    },
  ]);

  housesMap = {
    '=0': 'No hay casas disponibles',
    '=1': '1 casa disponible',
    other: '# casas disponibles',
  };
}
