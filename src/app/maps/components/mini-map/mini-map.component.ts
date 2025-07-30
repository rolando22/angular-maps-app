import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';

import { environment } from '@environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
})
export class MiniMapComponent implements AfterViewInit {
  lngLat = input.required<LngLatLike>();
  zoom = input<number>(14);

  divMap = viewChild<ElementRef>('map');

  ngAfterViewInit(): void {
    if (!this.divMap()?.nativeElement) return;

    const element = this.divMap()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat(),
      zoom: this.zoom(),
      interactive: false,
    });

    new mapboxgl.Marker()
      .setLngLat(this.lngLat())
      .addTo(map);
  }
}
