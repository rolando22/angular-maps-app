import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';

import { environment } from '@environments/environment';

import type { Marker } from '@shared/interfaces/marker.interface';
import { MarkerItemComponent } from "./marker-item/marker-item.component";

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-markers-page',
  imports: [MarkerItemComponent],
  templateUrl: './markers-page.component.html',
})
export default class MarkersPageComponent implements AfterViewInit {
  divMap = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

  ngAfterViewInit(): void {
    if (!this.divMap()?.nativeElement) return;

    const element = this.divMap()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-122.40985, 37.793085],
      zoom: 14,
    });

    this.mapListeners(map);
  }

  private mapListeners = (map: mapboxgl.Map) => {
    map.on('click', (event) => this.mapClick(event));
    this.map.set(map);
  }

  private mapClick = (event: mapboxgl.MapMouseEvent) => {
    if (!this.map()) return;

    const map = this.map()!;
    const coordinates = event.lngLat;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const mapboxMarker = new mapboxgl.Marker({
      color,
    })
      .setLngLat(coordinates)
      .addTo(map);

    const newMarker: Marker = {
      id: crypto.randomUUID(),
      mapboxMarker,
    };

    this.markers.update((currentMarkers) => [newMarker, ...currentMarkers]);
  }

  flyToMarker(lngLat: LngLatLike) {
    if (!this.map()) return;

    this.map()!.flyTo({
      center: lngLat,
    });
  }

  deleteMarker(marker: Marker) {
    if (!this.map()) return;

    marker.mapboxMarker.remove();
    this.markers.update((currentMarkers) =>
      currentMarkers.filter((m) => m.id !== marker.id)
    );
  }
}
