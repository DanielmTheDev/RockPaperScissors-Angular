import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[SafeInnerHtml]'
})
export class SafeInnerHtmlDirective implements OnInit {
  @Input()
  innerHtml?: string;

  constructor(private _elementRef: ElementRef) { }

  ngOnInit(): void {
    this._elementRef.nativeElement.innerHTML = this.innerHtml;
  }
}
