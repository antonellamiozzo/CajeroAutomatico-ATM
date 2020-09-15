import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { CajeroAutomaticoService } from '../services/cajero-automatico.service';
@Component({
  selector: 'app-balance-page',
  templateUrl: './balance-page.component.html',
  styleUrls: ['./balance-page.component.css']
})
export class BalancePageComponent implements OnInit {
public creditCard: any;
public fechaVencimiento: any;
public saldo: any;

@Output() nextStep = new EventEmitter();

  constructor(private cajeroAutomaticoService: CajeroAutomaticoService) { }

  ngOnInit() {
    this.getBalanceInformation();
  }

  getBalanceInformation() {
      this.cajeroAutomaticoService.CommitATMOperation('0', 0).subscribe(
        body => {
          this.creditCard = body.result.NroTarjeta;
          this.saldo = body.result.SaldoActual;
          this.fechaVencimiento = body.result.Fecha;
        },
        error => console.log('error')
      );
  }

  atras() {
    this.nextStep.emit('operaciones-page');
  }

}
