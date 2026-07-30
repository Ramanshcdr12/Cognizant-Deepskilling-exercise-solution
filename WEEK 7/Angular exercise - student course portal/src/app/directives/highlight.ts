import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class Highlight {
  @Input('appHighlight') highlightColor = 'yellow';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.setBgColor(this.highlightColor || 'rgba(59, 130, 246, 0.1)'); // default fallback
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBgColor('');
  }

  private setBgColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}
