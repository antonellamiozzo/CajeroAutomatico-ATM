import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public  nameStep: string;
  constructor() { }

  ngOnInit() {
    this.nameStep = 'credit-card';
  }

  handlerNextStep(info: any) {
      this.nameStep = info;
  }


}
