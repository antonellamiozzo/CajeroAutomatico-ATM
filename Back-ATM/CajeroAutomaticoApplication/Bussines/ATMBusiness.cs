using CajeroAutomaticoApp.DataAccess;
using CajeroAutomaticoApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CajeroAutomaticoApp.Bussines
{
    public class ATMBusiness
    {

        public Reporte CommitATMOperation(Operacion op)
        {
            try
            {
                var atmDataAccess = new ATMDataAccess();
                return atmDataAccess.CommitATMOperation(op);
            }
            catch (Exception ex) {
                throw new Exception("ERROR al realizar la operacion. Chequee que el saldo es suficiente");
            }

        }

        public bool CheckIfCreditCardExists(string Nrotarjeta)
        {
            try
            {
                var atmDataAccess = new ATMDataAccess();
                return atmDataAccess.CheckIfCreditCardExists(Nrotarjeta);
            }
            catch (Exception ex) {
                throw new Exception("ERROR al realizar la operacion.");

            }
        }

        public bool CheckIfPINisRightforCreditCard(string pin, string Nrotarjeta)
        {
            try
            {
                var atmDataAccess = new ATMDataAccess();
            return atmDataAccess.CheckIfPINisRightforCreditCard(pin, Nrotarjeta);
            }
            catch (Exception ex)
            {
                throw new Exception("ERROR al realizar la operacion.");

            }
        }

    }
}