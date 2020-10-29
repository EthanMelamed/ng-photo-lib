import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent {

  @Input() images = null;
  constructor() {}

}
