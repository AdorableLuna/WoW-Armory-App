import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'error',
  templateUrl: 'error.html'
})
export class ErrorMessageComponent {

  @Input() message: Object;

  @Output() reload: EventEmitter<any> = new EventEmitter;

  constructor(

  ) {

  }
}
