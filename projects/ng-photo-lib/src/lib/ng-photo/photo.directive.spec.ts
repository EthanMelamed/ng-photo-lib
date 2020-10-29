import { PhotoDirective } from './photo.directive';
import { MockElementRef, MockRenderer2 } from '../../mocks/@angular/core';

describe('PhotoDirective', () => {
  let el;
  let renderer;
  let directive: PhotoDirective;

  beforeEach(() => {
    el = new MockElementRef();
    renderer = new MockRenderer2();
    directive = new PhotoDirective(el, renderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('test ngOnInit()', () => {
    it('should not initialize until photo is passed in', () => {
      const spy = spyOn(directive, 'handleResize').and.callThrough();
      const rendererSpy = spyOn(directive.renderer, 'setStyle').and.callFake(() => null);
      directive.ngOnChanges();
      expect(spy).toHaveBeenCalledTimes(0);
      expect(rendererSpy).toHaveBeenCalledTimes(0);
    });
    it('should initialize when photo is passed in', () => {
      const spy = spyOn(directive, 'handleResize').and.callThrough();
      const rendererSpy = spyOn(directive.renderer, 'setStyle').and.callFake(() => null);
      directive.photo = 'someImageURI';
      directive.ngOnChanges();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(rendererSpy).toHaveBeenCalledTimes(1);
      expect(rendererSpy).toHaveBeenCalledWith(el.nativeElement, 'backgroundImage', 'url("someImageURI")');
    });
  });

  describe('test isElDimRatioTaller()', () => {
    const imgEl = document.createElement('img');
    it('should return TRUE when el has a taller ratio than img', () => {
      const img: any = JSON.parse(JSON.stringify(imgEl));
      img.naturalHeight = 50;
      img.naturalWidth = 50;
      el.nativeElement.offsetHeight = 51;
      el.nativeElement.offsetWidth = 49;
      expect(directive.isElDimRatioTaller(el, img)).toBeTruthy();
    });
    it('should return FALSE when el has a wider ratio than img', () => {
      const img: any = JSON.parse(JSON.stringify(imgEl));
      img.naturalHeight = 50;
      img.naturalWidth = 50;
      el.nativeElement.offsetHeight = 49;
      el.nativeElement.offsetWidth = 51;
      expect(directive.isElDimRatioTaller(el, img)).toBeFalsy();
    });
    it('should throw an error when el is null', () => {
      const spy = spyOn(directive, 'isElDimRatioTaller').and.callThrough();
      try {
        directive.isElDimRatioTaller(null, imgEl);
        fail();
      } catch (e) {
        expect(e.message).toEqual('Cannot calculate ratios of null objects');
      }
      expect(spy).toThrowError();
    });
    it('should throw an error when el is undefined', () => {
      const spy = spyOn(directive, 'isElDimRatioTaller').and.callThrough();
      try {
        directive.isElDimRatioTaller(undefined, imgEl);
        fail();
      } catch (e) {
        expect(e.message).toEqual('Cannot calculate ratios of null objects');
      }
      expect(spy).toThrowError();
    });
    it('should throw an error when img is null', () => {
      const spy = spyOn(directive, 'isElDimRatioTaller').and.callThrough();
      try {
        directive.isElDimRatioTaller(el, null);
        fail();
      } catch (e) {
        expect(e.message).toEqual('Cannot calculate ratios of null objects');
      }
      expect(spy).toThrowError();
    });
    it('should throw an error when img is undefined', () => {
      const spy = spyOn(directive, 'isElDimRatioTaller').and.callThrough();
      try {
        directive.isElDimRatioTaller(el, undefined);
        fail();
      } catch (e) {
        expect(e.message).toEqual('Cannot calculate ratios of null objects');
      }
      expect(spy).toThrowError();
    });
    it('should throw an error when el is null', () => {
      const spy = spyOn(directive, 'isElDimRatioTaller').and.callThrough();
      try {
        directive.isElDimRatioTaller(null, null);
        fail();
      } catch (e) {
        expect(e.message).toEqual('Cannot calculate ratios of null objects');
      }
      expect(spy).toThrowError();
    });
    it('should throw an error when el is undefined', () => {
      const spy = spyOn(directive, 'isElDimRatioTaller').and.callThrough();
      try {
        directive.isElDimRatioTaller(undefined, undefined);
        fail();
      } catch (e) {
        expect(e.message).toEqual('Cannot calculate ratios of null objects');
      }
      expect(spy).toThrowError();
    });
  });

  describe('test updateBackgroundSizing()', () => {
    it('should set sizing correctly when true is passed in (el is taller)', () => {
      const spy = spyOn(directive.renderer, 'setStyle').and.callFake(() => null);
      directive.updateBackgroundSizing(true);
      expect(spy).toHaveBeenCalledWith(el.nativeElement, 'backgroundSize', 'auto 100%');
    });
    it('should set sizing correctly when false is passed in (el is wider)', () => {
      const spy = spyOn(directive.renderer, 'setStyle').and.callFake(() => null);
      directive.updateBackgroundSizing(false);
      expect(spy).toHaveBeenCalledWith(el.nativeElement, 'backgroundSize', '100% auto');
    });
    it('should throw an error when null is passed in', () => {
      const spy = spyOn(directive, 'updateBackgroundSizing').and.callThrough();
      try {
        directive.updateBackgroundSizing(null);
        fail();
      } catch (e) {
        expect(e.message).toEqual('Cannot update background sizing using a null or undefined value');
      }
      expect(spy).toThrowError();
    });
    it('should throw an error when undefined is passed in', () => {
      const spy = spyOn(directive, 'updateBackgroundSizing').and.callThrough();
      try {
        directive.updateBackgroundSizing(undefined);
        fail();
      } catch (e) {
        expect(e.message).toEqual('Cannot update background sizing using a null or undefined value');
      }
      expect(spy).toThrowError();
    });
  });
});
