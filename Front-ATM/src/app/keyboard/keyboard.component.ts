import { Component, OnInit , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {

  @Output() sendNumber = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
load(number) {
  this.sendNumber.emit(number);
}
}
