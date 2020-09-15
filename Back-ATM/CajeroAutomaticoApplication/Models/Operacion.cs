using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace CajeroAutomaticoApp.Models
{

    [DataContract]
    public class Operacion
    {
        [DataMember]
        public string NroTarjeta { get; set; }

        [DataMember]
        public DateTime FechaOperacion { get; set; }

        [DataMember]
        public int CantidadARetiro { get; set; }

        [DataMember]
        public string TipoOperation { get; set; }
    }
}