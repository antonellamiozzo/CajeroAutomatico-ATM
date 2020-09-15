import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CajeroAutomaticoService } from '../services/cajero-automatico.service';

@Component({
  selector: 'app-pin-request-page',
  templateUrl: './pin-request-page.component.html',
  styleUrls: ['./pin-request-page.component.css']
})
export class PinRequestPageComponent implements OnInit {
  @Output() nextStep = new EventEmitter();
  public pinNumber: any;
  public errorMsg: any;
  public error: Boolean = false;
  public intentos: any = 0;
  public pinNotEntered: Boolean = false;

  constructor(private cajeroAutomaticoService: CajeroAutomaticoService) { }

  ngOnInit() {
    this.clear();
  }

  clear() {
    this.pinNumber = '';
  }

  submit() {
    this.intentos = this.intentos + 1;
    if (this.pinNumber.length === 4) {
      this.pinNotEntered = false;
      if (this.intentos <= 4 ) {
        this.cajeroAutomaticoService.CheckIfPINisRightforCreditCard(this.pinNumber).subscribe(
          body => {
            if (body.result) {
              this.cajeroAutomaticoService.tarjetaInfo.pin = this.pinNumber;
              this.nextStep.emit('operaciones-page');
            } else {
              this.error = true;
              this.errorMsg = 'PIN invalido.';
            }
          },
        error => console.log(error)
        );
      } else {
        this.cajeroAutomaticoService.BlockCreditCard(this.cajeroAutomaticoService.tarjetaInfo.nroTarjeta).subscribe(
          body => {
            this.error = true;
            this.errorMsg = 'Se ha bloqueado la tarjeta ya que ha superado los intentos para ingresar el PIN.';
          },
          error => {
            this.error = true;
            this.errorMsg = 'Error al bloquear la tarjeta';
          }

        );
      }
    } else {
      this.pinNotEntered = true;
    }
  }

  addNumberToPin(number) {
    this.pinNumber = this.pinNumber + number;
  }

  handlerBackToHome() {
    this.error = false;
    this.pinNumber = '';
  }

  salir() {
    this.pinNumber = '';
    this.nextStep.emit('credit-card');
  }
}
