import { Highlight } from './highlight';
import { ElementRef, Renderer2 } from '@angular/core';

describe('Highlight', () => {
  it('should create an instance', () => {
    const mockEl = { nativeElement: {} } as ElementRef;
    const mockRenderer = { setStyle: () => {} } as unknown as Renderer2;
    const directive = new Highlight(mockEl, mockRenderer);
    expect(directive).toBeTruthy();
  });
});
