import { NgModule } from '@angular/core';
import { PhotoDirective } from './photo.directive';
import { PhotoShowComponent } from './photo-show/photo-show.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { CommonModule } from '@angular/common';

const components = [
    PhotoDirective,
    PhotoShowComponent,
    PhotoGalleryComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule
  ],
  exports: components
})
export class PhotoModule { }
