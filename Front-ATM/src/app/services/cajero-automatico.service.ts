import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { TarjetaInformation } from '../models/tarjetaInformation.model';

@Injectable({
  providedIn: 'root'
})
export class CajeroAutomaticoService {
  private CommitATMOperationURL = 'http://localhost:60200/api/ATM/CommitATMOperation';
  private CheckIfCreditCardExistsURL = 'http://localhost:60200/api/ATM/CheckIfCreditCardExists';
  private CheckIfPINisRightforCreditCardURL = 'http://localhost:60200/api/ATM/CheckIfPINisRightforCreditCard';
  private BlockCreditCardURL = 'http://localhost:60200/api/ATM/BlockCreditCard';
  tarjetaInfo: TarjetaInformation = new TarjetaInformation();

  constructor(private http: HttpClient) {
  }

  get tarjetaInformationDataStore(): TarjetaInformation {
    return this.tarjetaInfo;
  }
  set tarjetaInformationDataStore(info: TarjetaInformation) {
    this.tarjetaInfo = info;
  }

  private createHttpHeader() {
    return {
      // tslint:disable-next-line:max-line-length
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Methods': 'GET, POST', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'Access-Control-Allow-Origin': 'http://localhost:4200'})
    };
  }

  public CommitATMOperation(tipoOperacion, cantidadRetiro): Observable<any> {
    const operacion = {
        NroTarjeta: this.tarjetaInfo.nroTarjeta,
        TipoOperacion: tipoOperacion,
        CantidadARetirar: cantidadRetiro
    };
    return this.http.post(this.CommitATMOperationURL, operacion, this.createHttpHeader())
      .pipe();
  }

  public CheckIfCreditCardExists(NroTarjeta): Observable<any> {
    return this.http.get(this.CheckIfCreditCardExistsURL + '?NroTarjeta=' + NroTarjeta,  this.createHttpHeader())
      .pipe();
  }

  public CheckIfPINisRightforCreditCard(pin): Observable<any> {
    const tarjetaInfo = {
      NroTarjeta: this.tarjetaInfo.nroTarjeta,
      PinTarjeta: pin,
      FechaVencimiento: '',
      SaldoActual: ''
    };
    return this.http.post(this.CheckIfPINisRightforCreditCardURL, tarjetaInfo , this.createHttpHeader())
      .pipe();
  }

  public BlockCreditCard(NroTarjeta): Observable<any> {
    return this.http.get(this.BlockCreditCardURL + '?NroTarjeta=' + NroTarjeta,  this.createHttpHeader())
      .pipe();
  }

}


