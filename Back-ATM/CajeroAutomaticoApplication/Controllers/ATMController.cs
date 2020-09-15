using CajeroAutomaticoApplication.Bussines;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CajeroAutomaticoApplication.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class ATMController : ApiController
    {
        [HttpGet]
        public string Get()
        {
            return "Hello World";
        }
        [HttpPost]
        public HttpResponseMessage CommitATMOperation(Operacion op)
        {
            try
            {
                ATMBusiness atmBusiness = new ATMBusiness();
                var result = atmBusiness.CommitATMOperation(op);
                return Request.CreateResponse(HttpStatusCode.OK, new { result });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(
                   HttpStatusCode.InternalServerError,
                   new { ResponseMsg = ex.Message }
               );

            }
        }
        
        [HttpGet]
        public HttpResponseMessage CheckIfCreditCardExists(string NroTarjeta)
        {
            try
            {
                ATMBusiness atmBusiness = new ATMBusiness();
                var result = atmBusiness.CheckIfCreditCardExists(NroTarjeta);
                return Request.CreateResponse(HttpStatusCode.OK, new {  result });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(
                   HttpStatusCode.InternalServerError,
                   new { ResponseMsg = ex.Message }
               );

            }
        }
        
        [HttpPost]
        public HttpResponseMessage CheckIfPINisRightforCreditCard(Tarjeta tarjeta)
        {
            try
            {
                ATMBusiness atmBusiness = new ATMBusiness();
                var result = atmBusiness.CheckIfPINisRightforCreditCard(tarjeta.PinTarjeta, tarjeta.NroTarjeta);
                return Request.CreateResponse(HttpStatusCode.OK, new { result });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(
                   HttpStatusCode.InternalServerError,
                   new { ResponseMsg = ex.Message }
               );

            }
        }

        [HttpGet]
        public HttpResponseMessage BlockCreditCard(string nroTarjeta)
        {
            try
            {
                ATMBusiness atmBusiness = new ATMBusiness();
                atmBusiness.BlockCreditCard(nroTarjeta);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(
                   HttpStatusCode.InternalServerError,
                   new { ResponseMsg = ex.Message }
               );

            }
        }
    }
}
