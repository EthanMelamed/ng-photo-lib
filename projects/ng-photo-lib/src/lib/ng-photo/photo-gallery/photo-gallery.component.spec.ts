import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhotoGalleryComponent } from './photo-gallery.component';
import { PhotoDirective } from '../photo.directive';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PhotoGalleryComponent', () => {
  let component: PhotoGalleryComponent;
  let fixture: ComponentFixture<PhotoGalleryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoGalleryComponent, PhotoDirective ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
