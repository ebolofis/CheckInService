using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Autofac;
using AutoMapper;
using CheckinBack;
using CheckinBack.Models;
using CheckinBack.InMemoryDB;
using CheckinBack.MainLogic;
using CheckinBack.Models;
using CheckinFront.ApiControllers;
using CheckinFront.SignalR;
using CheckInService.Middlewares;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CheckInService
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public ILifetimeScope AutofacContainer { get; private set; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }



        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Console.WriteLine("Configuring Services...");
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            });

            services.AddAutoMapper(Assembly.LoadFrom("CheckinBack"));
          
            services.AddOptions();
            services.AddMvc(
                options => {
                    options.EnableEndpointRouting = false;

                })
                
             .SetCompatibilityVersion(CompatibilityVersion.Latest)
              .AddJsonOptions(o =>
              {
                  o.JsonSerializerOptions.PropertyNamingPolicy = null;
                  o.JsonSerializerOptions.DictionaryKeyPolicy = null;
              }).AddControllersAsServices();



            //services.Configure<IISServerOptions>(options =>
            //{
            //    options.AutomaticAuthentication = false;
            //});

            services.Configure<FormOptions>(options =>
            {
                options.ValueCountLimit = int.MaxValue;
            });

            bool razor = Configuration.GetValue<bool>("AddRazorRuntimeCompilation");
            if (razor)
            {
                services.AddControllersWithViews().AddRazorRuntimeCompilation();
            }
            else
            {
                services.AddControllersWithViews();
            }

            AddSignalR(services);

          //  services.Configure<MainConfigModel>(Configuration);
            services.AddScoped<MainActionsML>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.  
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, SystemInfoModel sysifo, HotelsML hotelsML, SystemInfoHelper systemInfoHelper)
        {
       
           app.UseMiddleware<ExceptionMiddleware>();
            app.UseForwardedHeaders();
         
            if (env.IsDevelopment())
            {
                sysifo.Environment = "Development";
              //  app.UseDeveloperExceptionPage();
            }
            else
            {
                sysifo.Environment = "Production";
             //   app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                // app.UseHsts();
            }
            // app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthorization();
            app.UseCors();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapHub<SignalRHub>("/SignHub");    
            });

 

            systemInfoHelper.LoadConfig();
        
            hotelsML.GetAll(true);
        }

        /// <summary>
        /// Set up a Redis backplane for Signal-R
        /// </summary>
        /// <param name="services"></param>
        public void AddSignalR(IServiceCollection services)
        {
            var inMemenebled = Configuration.GetSection("InMemoryDBController").GetValue<bool>("IsEnabled");

            if (!inMemenebled)
               services.AddSignalR();
            else
            {
                string pass = Configuration.GetSection("InMemoryDBController").GetValue<string>("Password");
                string Url = Configuration.GetSection("InMemoryDBController").GetValue<string>("Url");
                bool Ssl = Configuration.GetSection("InMemoryDBController").GetValue<bool>("Ssl"); 
                int Port = Configuration.GetSection("InMemoryDBController").GetValue<int>("Port");
                string constr = null;
                if (string.IsNullOrWhiteSpace(pass))
                    constr=$"{Url}:{Port},ssl={Ssl}";
                else
                    constr=$"{Url}:{Port},ssl={Ssl}, password={pass}";

                services.AddSignalR().AddStackExchangeRedis(constr, options => {
                    options.Configuration.ConnectRetry = 200;
                    options.Configuration.ConnectTimeout = 5000;

                });
            }
        }


        // ConfigureContainer is where you can register things directly with Autofac.
        // This runs after ConfigureServices so the things
        // here will override registrations made in ConfigureServices.
        // Don't build the container; that gets done for you by the factory.
        public void ConfigureContainer(ContainerBuilder builder)
        {

            // Register your own things directly with Autofac:
            builder.RegisterModule(new BackEndDimodule());

        }
    }
}
