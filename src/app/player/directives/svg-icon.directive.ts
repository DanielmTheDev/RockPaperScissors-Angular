import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[svgIcon]'
})
export class SvgIconDirective implements OnChanges {
  @Input()
  svg?: string;

  constructor(private _elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void  {
    this._elementRef.nativeElement.innerHTML = changes['svg'] &&  this.svg ? this.svg : '';
  }
}
