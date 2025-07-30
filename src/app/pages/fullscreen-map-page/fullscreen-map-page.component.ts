import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import { DecimalPipe, JsonPipe } from '@angular/common';
import mapboxgl from 'mapbox-gl';

import { environment } from '@environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map-page.component.html',
})
export default class FullscreenMapPageComponent implements AfterViewInit {
  divMap = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  zoom = signal<number>(9);
  coordinates = signal<{ lng: number; lat: number }>({ lng: -74.5, lat: 40 });

  zoomEffect = effect(() => {
    if (!this.map()) return;

    this.map()!.setZoom(this.zoom());
  });

  ngAfterViewInit(): void {
    if (!this.divMap()?.nativeElement) return;

    const element = this.divMap()!.nativeElement;
    const { lat, lng } = this.coordinates();

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: this.zoom(),
    });

    this.mapListeners(map);
  }

  private mapListeners = (map: mapboxgl.Map) => {
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });

    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set(center);
    });

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());

    this.map.set(map);
  }
}
