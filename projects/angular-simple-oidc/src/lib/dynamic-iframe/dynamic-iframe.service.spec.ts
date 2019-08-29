import { TestBed } from '@angular/core/testing';
import { DynamicIframeService } from './dynamic-iframe.service';
import { WINDOW_REF } from '../constants';

function spyOnGet<T>(obj: T, property: keyof T) {
  Object.defineProperty(obj, property, { get: () => null });
  return spyOnProperty(obj, property, 'get');
}

describe('DynamicIframe', () => {
  let service: DynamicIframeService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        {
          provide: WINDOW_REF,
          useValue: window
        },
        DynamicIframeService
      ],
    });

    service = TestBed.get(DynamicIframeService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });


  it('creates dynamic iframe', () => {
    const dynamicIframe = service.create();
    expect(dynamicIframe).toBeDefined();
  });

  it('sets source on underlying iframe', () => {
    const dynamicIframe = service.create();
    const iframe = dynamicIframe.handle;

    const expected = 'http://example.com/';
    dynamicIframe.setSource(expected);
    expect(iframe.src).toEqual(expected);
  });

  it('hides the underlying iframe', () => {
    const dynamicIframe = service.create();
    const iframe = dynamicIframe.handle;

    dynamicIframe.hide();
    expect(iframe.style.display).toEqual('none');
  });

  it('hides the underlying iframe', () => {
    const dynamicIframe = service.create();
    const iframe = dynamicIframe.handle;

    dynamicIframe.hide();
    expect(iframe.style.display).toEqual('none');
  });

  it('appends the underlying iframe', () => {
    const dynamicIframe = service.create();
    const iframe = dynamicIframe.handle;

    dynamicIframe.appendToBody();

    expect(document.body.contains(iframe)).toBeTruthy();
    document.body.removeChild(iframe);
  });

  it('removes the underlying iframe', () => {
    const dynamicIframe = service.create();
    const iframe = dynamicIframe.handle;

    dynamicIframe.appendToBody();
    expect(document.body.contains(iframe)).toBeTruthy();

    dynamicIframe.remove();
    expect(document.body.contains(iframe)).toBeFalsy();
  });
});
