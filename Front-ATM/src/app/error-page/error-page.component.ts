import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
@Input() errorMsgContent: any;
@Output() comebackTo = new EventEmitter();
public errorMsg: any;
constructor() { }

  ngOnInit() {
    this.errorMsg = this.errorMsgContent;
  }

  atras() {
    this.comebackTo.emit('volver');
  }

}
