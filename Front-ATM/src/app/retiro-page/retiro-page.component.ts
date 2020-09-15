import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { CajeroAutomaticoService } from '../services/cajero-automatico.service';
@Component({
  selector: 'app-retiro-page',
  templateUrl: './retiro-page.component.html',
  styleUrls: ['./retiro-page.component.css']
})
export class RetiroPageComponent implements OnInit {
  @Output() nextStep = new EventEmitter();
  public cantidadRetiro: any;
  public operacion: any;
  public saldo: any;
  public fechaOperacion: any;
  public creditCard: any;
  public notCantidadRetiroEnter: any = false;
  public errorMsg: any;
  constructor(private cajeroAutomaticoService: CajeroAutomaticoService) { }

  ngOnInit() {
    this.cantidadRetiro = '';
    this.operacion = 'retiro';
  }

  clear() {
    this.cantidadRetiro = '';
  }

  submit() {
    if (this.cantidadRetiro !== '' && this.cantidadRetiro !== '0') {
      this.notCantidadRetiroEnter = false;
        this.cajeroAutomaticoService.CommitATMOperation('1', this.cantidadRetiro).subscribe(
          body => {
            this.creditCard = body.result.NroTarjeta;
            this.saldo = body.result.SaldoActual;
            this.fechaOperacion = body.result.Fecha;
            this.operacion = 'reporte';
          },
          error => {
            this.errorMsg =  'Hubo un problema a gestionar su operacion. Por favor intente nuevamente mas tarde.';
            this.operacion = 'error';
          }
        );
      } else {
        this.notCantidadRetiroEnter = true;
      }

  }

  atras() {
    this.cantidadRetiro = '';
    this.operacion = 'retiro';
  }

  quit() {
    console.log('quit');
  }

  salir() {
    this.nextStep.emit('operaciones-page');
  }

  handlerBackToHome() {
    this.operacion = 'retiro';
  }

  addNumberToRetiro(number) {
    this.notCantidadRetiroEnter = false;
    this.cantidadRetiro = this.cantidadRetiro + number;
  }
}
