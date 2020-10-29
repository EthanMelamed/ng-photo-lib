import { Directive, ElementRef, Input, Renderer2, HostListener, OnInit, OnChanges } from '@angular/core';

import { PhotoModel } from './photo.model';


@Directive({
  selector: '[libPhoto]'
})
export class PhotoDirective implements OnChanges {

  @Input('libPhoto') photo: PhotoModel | string;
  constructor(public el: ElementRef, public renderer: Renderer2) {}

  ngOnChanges(): void  {
    if (this.photo) {
      this.handleResize();
      if (this.photo instanceof PhotoModel) {
        this.renderer.setStyle(this.el.nativeElement, 'backgroundImage', `url("${this.photo.url}")`);
        this.renderer.setStyle(this.el.nativeElement, 'backgroundPosition', this.photo.position);
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'backgroundImage', `url("${this.photo}")`);
      }
    }
  }

  isElDimRatioTaller(el: ElementRef, img: HTMLImageElement): boolean {
    if (!el || !img) {
      throw new Error('Cannot calculate ratios of null objects');
    }
    return (el.nativeElement.offsetHeight / el.nativeElement.offsetWidth) / (img.naturalHeight / img.naturalWidth) > 1;
  }

  updateBackgroundSizing(elIsTaller: boolean): void {
    if (elIsTaller === null || elIsTaller === undefined) {
      throw Error('Cannot update background sizing using a null or undefined value');
    }
    if (elIsTaller) {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundSize', 'auto 100%');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundSize', '100% auto');
    }
  }

  @HostListener('window:resize', ['$event'])
  handleResize(event = null): void {
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
