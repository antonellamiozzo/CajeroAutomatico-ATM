using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CajeroAutomaticoApplication.Models;

namespace CajeroAutomaticoApplication.DataAccess
{
    public class ATMDataAccess
    {

        private CajeroAutomaticoEntities GetDBContext()
        {
            return new CajeroAutomaticoEntities();
        }

        public Tarjeta GetBalanceInformationATM(string Nrotarjeta) {
            using (var context = this.GetDBContext()) {

                var tarjetaData = context.Tarjetas.Where(x => x.NroTarjeta == Nrotarjeta).Select(y => new Tarjeta
                {
                    NroTarjeta = y.NroTarjeta,
                    FechaVencimiento = y.FechaVencimiento,
                    SaldoActual = y.SaldoActual
                });

                return tarjetaData.FirstOrDefault();


            }
        }

        public bool CheckIfCreditCardExists(string Nrotarjeta)
        {
            try
            {
                using (var context = this.GetDBContext())
                {

                    var count = context.Tarjetas.Where(x => x.NroTarjeta == Nrotarjeta && !(x.IsBlocked)).Count();
                    return count == 1;

                }
            }
            catch (Exception ex) {

                throw ex;
            }
        }

        public bool CheckIfPINisRightforCreditCard(string pin, string Nrotarjeta)
        {
            try
            {
                using (var context = this.GetDBContext())
                {

                    var count = context.Tarjetas.Where(x => x.NroTarjeta == Nrotarjeta && x.PinTarjeta == pin).Count();
                    return count == 1;

                }

            }  catch (Exception ex)
            {

                throw ex;
            }
        }

        public Reporte CommitATMOperation(Operacion op)
        {
            try
            {

                using (var context = this.GetDBContext())
                {
                    var result = context.CommitOperation(op.NroTarjeta, op.TipoOperacion, Convert.ToInt32(op.CantidadARetirar)).FirstOrDefault();

                    Reporte rp =  new Reporte
                    {
                        NroTarjeta = result.NroTarjeta,
                        SaldoActual = Convert.ToInt32(result.SaldoActual),
                        Fecha = Convert.ToDateTime(result.FechaOperacion)
                    };

                    return rp;

                }

            } catch (Exception ex)
            {

                throw ex;
            }

        }

        public void BlockCreditCard(string creditCard) {

            try
            {

                using (var context = this.GetDBContext())
                {
                    context.BlockCreditCard(creditCard);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}