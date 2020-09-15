import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CajeroAutomaticoService } from '../services/cajero-automatico.service';

@Component({
  selector: 'app-credit-card-request-page',
  templateUrl: './credit-card-request-page.component.html',
  styleUrls: ['./credit-card-request-page.component.css']
})
export class CreditCardRequestPageComponent implements OnInit {
  @Output() nextStep = new EventEmitter();
  @Input() sendNumber: any;
  public cardNumber: any;
  public errorMsg: any;
  public creditCardNotEntered: Boolean = false;
  public error: Boolean = false;

  constructor( private cajeroAutomaticoService: CajeroAutomaticoService) {
   }

  ngOnInit() {
    this.cardNumber = '';
  }


  addNumberToCreditCard(number) {
    this.cardNumber = this.cardNumber + number;
    const numberOnly = this.cardNumber.replaceAll('-', '');
    if ((numberOnly.length % 4) === 0 && numberOnly !== '' && numberOnly.length !== 16) {
      this.cardNumber = this.cardNumber +  '-';
    }
  }

  clear() {
    this.cardNumber = '';
  }

  submit() {
    if (this.cardNumber.length === 19) {
      this.creditCardNotEntered = false;
      this.cajeroAutomaticoService.CheckIfCreditCardExists(this.cardNumber).subscribe(
        body => {
          if (body.result) {
            this.cajeroAutomaticoService.tarjetaInfo.nroTarjeta = this.cardNumber;
            this.nextStep.emit('pin-page');
          } else {
            this.error = true;
            this.errorMsg = 'Numero de tarjeta invalido.';
          }
        },
        error => console.log(error)
        );
    } else {
      this.creditCardNotEntered = true;
    }
  }

  handlerBackToHome() {
    this.error = false;
    this.cardNumber = '';
  }
}
