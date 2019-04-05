﻿using Autofac;
using KSZPL.Core.Interfaces;
using KSZPL.Core.Services;
using KSZPL.Data.Models;
using KSZPL.Data.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Modules
{
    class PatientModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<Repository<Patient>>().As<IRepository<Patient>>().InstancePerDependency();
        }
    }
}
