import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, input, Output, output } from '@angular/core';

import type { Marker } from '@shared/interfaces/marker.interface';

@Component({
  selector: 'marker-item',
  imports: [JsonPipe],
  templateUrl: './marker-item.component.html',
})
export class MarkerItemComponent {
  marker = input.required<Marker>();
  @Output() click = new EventEmitter<void>();
  @Output() dblclick = new EventEmitter<void>();
}
