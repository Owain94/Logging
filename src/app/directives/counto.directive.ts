import { isPlatformServer } from '@angular/common';
import { Directive, Input, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';

@Directive({
    selector: '[appCountoDirective]'
})
export class CountoDirective {

  @Input()
  set duration(duration: string) {
    this._duration = parseFloat(duration);
    this.run();
  }

  @Input()
  set countTo(countTo: string) {
    this._countTo = parseFloat(countTo);
    this.run();
  }

  @Input()
  set countFrom(countFrom: string) {
    this._countFrom = parseFloat(countFrom);
    this.run();
  }

  @Input()
  set step(step: string) {
    this._step = parseFloat(step);
    this.run();
  }

  @Output() countoChange: EventEmitter<number> = new EventEmitter<number>();

  private _timer: any;
  private _duration: number;
  private _countTo: number;
  private _countFrom: number;
  private _step: number;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  run() {
    if (!isPlatformServer(this.platformId)) {
      clearInterval(this._timer);

      if (isNaN(this._duration) || isNaN(this._step) || isNaN(this._countFrom) || isNaN(this._countTo)
      || this._step <= 0 || this._duration <= 0 || this._step > this._duration * 1000) {
          return;
      }

      let intermediate  = this._countFrom;
      const increment = Math.abs(this._countTo - this._countFrom) / ((this._duration * 1000) / this._step);

      this.countoChange.emit(intermediate);

      this._timer = setInterval(() => {
        if (this._countTo < this._countFrom) {
          if (intermediate <= this._countTo) {
            clearInterval(this._timer);
            this.countoChange.emit(this._countTo);
          } else {
            this.countoChange.emit(intermediate);
            intermediate -= increment;
          }
        } else {
          if (intermediate >= this._countTo) {
            clearInterval(this._timer);
            this.countoChange.emit(this._countTo);
          } else {
            this.countoChange.emit(intermediate);
            intermediate += increment;
          }
        }
      }, this._step);
    } else {
      this.countoChange.emit(0);
    }
  }
}
