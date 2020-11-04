import { Directive, ElementRef, Input, Renderer2, HostListener, OnInit, OnChanges } from '@angular/core';

import { PhotoModel } from './photo.model';


@Directive({
  selector: '[libPhoto]'
})
export class PhotoDirective implements OnChanges {

  @Input('libPhoto') photo: PhotoModel | string;
  constructor(public el: ElementRef, public renderer: Renderer2) {}

  // Ensures that the component  continues to display properly when an input is passed in or changed
  ngOnChanges(): void  {
    if (this.photo) {
      this.update();
      if (this.photo instanceof PhotoModel) {
        this.renderer.setStyle(this.el.nativeElement, 'backgroundImage', `url("${this.photo.url}")`);
        this.renderer.setStyle(this.el.nativeElement, 'backgroundPosition', this.photo.focusPosition);
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'backgroundImage', `url("${this.photo}")`);
      }
    }
  }

  // Determine if the element has a taller ratio than the image
  isElDimRatioTaller(el: ElementRef, img: HTMLImageElement): boolean {
    if (!el || !img) {
      throw new Error('Cannot calculate ratios of null objects');
    }

    // Extract the heights and widths of the img and its container from DOM
    let containerHeight = el.nativeElement.offsetHeight;
    let containerWidth = el.nativeElement.offsetWidth;
    let imgHeight = img.naturalHeight;
    let imgWidth = img.naturalWidth;
    if(getComputedStyle(this.el.nativeElement).backgroundAttachment === "fixed") {
        containerHeight = window.innerHeight;
        containerWidth = window.innerWidth;
    }

    // Calculate and return a boolean that the container has a taller ratio than th img
    return (containerHeight / containerWidth) / (imgHeight / imgWidth) > 1;
  }

  // Sets the style of the element to bind to the horizontal or vertical edges
  updateBackgroundSizing(containerIsTaller: boolean): void {
    if (containerIsTaller === null || containerIsTaller === undefined) {
      throw Error('Cannot update background sizing using a null or undefined value');
    }

    // Directly set style on the element
    if (containerIsTaller) {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundSize', 'auto 100%');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundSize', '100% auto');
    }
  }

  // Preloads the image, then updates the component by setting the image size based on a calculation.
  @HostListener('window:resize', ['$event'])
  update(event = null): void {
    const img = document.createElement('img');
    img.onload = () => {
      this.updateBackgroundSizing(this.isElDimRatioTaller(this.el, img));
    };

    if (this.photo) {
      if (this.photo instanceof PhotoModel) {
        img.setAttribute('src', (this.photo as PhotoModel).url ); // load the image
      } else {
        img.setAttribute('src', this.photo as string); // load the image
      }
    }
  }

}
