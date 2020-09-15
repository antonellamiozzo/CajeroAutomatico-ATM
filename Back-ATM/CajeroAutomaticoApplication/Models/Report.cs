using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace CajeroAutomaticoApplication.Models
{
    [DataContract]
    public class Reporte
    {

        [DataMember]
        public string NroTarjeta { get; set; }

        [DataMember]
        public DateTime Fecha { get; set; }

        [DataMember]
        public long SaldoActual { get; set; }
    }
}