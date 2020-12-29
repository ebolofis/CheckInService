using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.WindowsServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog;
using NLog.Web;

namespace CheckInService
{
    public class Program
    {
        public static IConfiguration Configuration { get; set; }
        public static string CurrentPath { get; set; }
        public static string AppName { get; set; }


        public static void Main(string[] args)
        {
            // CreateHostBuilder(args).Build().Run();
            CurrentPath = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
            System.IO.Directory.SetCurrentDirectory(CurrentPath);

            AppName = Assembly.GetEntryAssembly().GetName().Name;

            var isService = !(Debugger.IsAttached || args.Contains("--console"));
            var webHostArgs = args.Where(arg => arg != "--console").ToArray();

            var ps = new List<string>() { CurrentPath, "WebConfig", "NLog.config" };
            var logpath = Path.GetFullPath(Path.Combine(ps.ToArray()));
            var logger = NLog.Web.NLogBuilder.ConfigureNLog(logpath).GetCurrentClassLogger();

            try
            {
                ConfigurationBuilder();
                var webBuilder = CreateWebHostBuilder(webHostArgs).Build();


                IWebHostEnvironment env = (IWebHostEnvironment)webBuilder.Services.GetService(typeof(IWebHostEnvironment));

                StartLogging(logger, env);

                if (isService)
                {
                    webBuilder.RunAsService();
                }
                else
                {
                    webBuilder.Run();
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine(" >>>---->>  ERROR (for more info see log files): " + exception.Message);
                //NLog: catch setup errors
                logger.Error(Convert.ToString(exception));
              
            }
            finally
            {
                logger.Warn($" ======== {AppName} Stopping ======== ");
                logger.Warn("");
                // Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
                NLog.LogManager.Shutdown();
                // System.Diagnostics.Process.GetCurrentProcess().Kill();
            }
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
           
      WebHost.CreateDefaultBuilder(args)
           .ConfigureServices(services => services.AddAutofac())
          // .UseServiceProviderFactory(new AutofacServiceProviderFactory())
          .UseStartup<Startup>()
          .ConfigureLogging(logging =>
          {
              logging.ClearProviders();
              logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
          })
          .ConfigureKestrel(serverOptions =>
          {
              Console.WriteLine("Configuring Kestrel...");
              serverOptions.ConfigureHttpsDefaults(listenOptions =>
              {
                
                  // certificate is an X509Certificate2
                  string outputCertificateFile = Configuration["CertificateFile"];
                  string outputCertificatePassword = Configuration["CertificatePassword"];
                  if (!string.IsNullOrWhiteSpace(outputCertificateFile))
                  {
                      Console.WriteLine("Loading Certificate...");
                      var cerPath = Path.GetFullPath(Path.Combine(CurrentPath, "WebConfig", outputCertificateFile));
                      if (!new FileInfo(cerPath).Exists) throw new Exception($"Certificate {outputCertificateFile} not found");
                      var tlsCertificate = new X509Certificate2(cerPath, outputCertificatePassword);
                      listenOptions.ServerCertificate = tlsCertificate;
                  }
              });
          })
         .UseConfiguration(Configuration) //<--- get port from config
         .UseNLog(); // NLog: setup NLog for Dependency injection
                     //   .UseWebRoot(Path.Combine(AppContext.BaseDirectory, "wwwroot")); 


        /// <summary>
        /// Build Configuration
        /// </summary>
        private static void ConfigurationBuilder()
        {
            Console.WriteLine("Building Configuration...");
            var ps1 = new List<string>() { CurrentPath, "WebConfig", "appsettings.json" }; // Config/appsettings.json
            var ps2 = new List<string>() { CurrentPath, "WebConfig", "servicesettings.json" }; // Config/servicesettings.json
            var appsettingspath = Path.GetFullPath(Path.Combine(ps1.ToArray()));
            var servicesettingsspath = Path.GetFullPath(Path.Combine(ps2.ToArray()));
            var builder = new ConfigurationBuilder()
                     .SetBasePath(CurrentPath)
                     .AddJsonFile(appsettingspath, optional: false, reloadOnChange: true)
                     .AddJsonFile(servicesettingsspath, optional: false, reloadOnChange: true);
            
            Configuration = builder.Build();
            
        }

        private static void StartLogging(Logger logger, IWebHostEnvironment env)
        {
            Console.WriteLine("Starting Logger...");
            logger.Info("");
            logger.Info("");
            logger.Info("*****************************************");
            logger.Info("*                                       *");
            logger.Info($"*  {AppName}  Started                   ");
            logger.Info("*                                       *");
            logger.Info("*****************************************");
            logger.Info("");
            System.Diagnostics.Debug.WriteLine("Application Started");
            System.Reflection.Assembly assembly = System.Reflection.Assembly.GetExecutingAssembly();
            FileVersionInfo fvi = FileVersionInfo.GetVersionInfo(assembly.Location);
            logger.Info("Version: " + fvi.FileVersion);
            logger.Info("Urls: " + Configuration["urls"]);
            Console.WriteLine("Urls: " + Configuration["urls"]);
            logger.Info("Environment: " + env.EnvironmentName);
            logger.Info("Current Path: " + CurrentPath);
            logger.Info("");
        }



        //public static IHostBuilder CreateHostBuilder(string[] args) =>
        //    Host.CreateDefaultBuilder(args)
        //        .ConfigureWebHostDefaults(webBuilder =>
        //        {
        //            webBuilder.UseStartup<Startup>();
        //        });
    }
}
