using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace CajeroAutomaticoApp.Models
{

    [DataContract]
    public class Tarjeta
    {

        [DataMember]
        public string NroTarjeta { get; set; }

        [DataMember]
        public DateTime FechaVencimiento { get; set; }

        [DataMember]
        public int saldoActual { get; set; }


    }
}