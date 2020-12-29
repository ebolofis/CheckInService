using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CheckInService
{
    public class CheckInDIModule : Module
    {

        protected override void Load(ContainerBuilder builder)
        {
            //Helpers
           // builder.RegisterType<IHttpClient>();

        }
    }
}
