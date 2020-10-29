import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoShowComponent } from './photo-show.component';
import { PhotoDirective } from '../photo.directive';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { } from 'jasmine';

describe('PhotoShowComponent', () => {
  let component: PhotoShowComponent;
  let fixture: ComponentFixture<PhotoShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoShowComponent, PhotoDirective ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
