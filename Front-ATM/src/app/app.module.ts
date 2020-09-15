import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { FormsModule } from '@angular/forms';
import { PinRequestPageComponent } from './pin-request-page/pin-request-page.component';
import { CreditCardRequestPageComponent } from './credit-card-request-page/credit-card-request-page.component';
import { BalancePageComponent } from './balance-page/balance-page.component';
import { RetiroPageComponent } from './retiro-page/retiro-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CajeroAutomaticoService } from './services/cajero-automatico.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    KeyboardComponent,
    PinRequestPageComponent,
    CreditCardRequestPageComponent,
    BalancePageComponent,
    RetiroPageComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CajeroAutomaticoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
