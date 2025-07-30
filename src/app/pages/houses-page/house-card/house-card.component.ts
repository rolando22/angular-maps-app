import { Component, input } from '@angular/core';

import { MiniMapComponent } from "src/app/maps/components/mini-map/mini-map.component";

import type { HouseProperty } from '@shared/interfaces/house-property.interface';

@Component({
  selector: 'house-card',
  imports: [MiniMapComponent],
  templateUrl: './house-card.component.html',
})
export class HouseCardComponent {
  house = input.required<HouseProperty>();
  newHouse = input<boolean>(false);
}
