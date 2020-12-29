using CheckinBack.InMemoryDB;
using CheckinBack.Models;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace CheckInService.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionMiddleware> logger;
        private readonly InMemoryMainLogging inMemLog;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, InMemoryMainLogging inMemLog)
        {
            this.next = next;
            this.logger = logger;
            this.inMemLog = inMemLog;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next.Invoke(context);
            }
            catch (BussinessException bex)
            {
                if (bex.Message.StartsWith("Wrong ID "))
                {
                    string ip = GetIPAddress(context);
                    if (!string.IsNullOrWhiteSpace(ip))
                    {
                        inMemLog.AddLogEntryAsync(new LoggingModel($"Client IP Address posted {bex.Message}: {ip} ", DBErrorLevel.Warning));
                        logger.LogWarning($"---> Client IP Address posting {bex.Message}: {ip} ");
                    }
                }
                if (bex.Message.StartsWith("System Error. Please try later") || bex.Message.Contains("Hotel Is NOT Active") || bex.Message.StartsWith("Wrong ID ") ) 
                    ReturnBadRequestResult(context, bex.Message); 
                else
                {
                    logger.LogWarning($"BussinessException [{context.Request.Method}] [{context.Request.Path.Value}] : {bex.Message} ");
                    ReturnBadRequestResult(context, bex.Message);
                }
               
            }
            catch (SqlException sqlex)
            {
                logger.LogError($"SqlException [{context.Request.Method}] [{context.Request.Path.Value}]. SqlException : {sqlex.Message}");
               ReturnBadRequestResult(context, sqlex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception [{context.Request.Method}] [{context.Request.Path.Value}] : {ex} ");
                ReturnBadRequestResult(context, ex.Message);
            }
        }

     
        protected void ReturnBadRequestResult(HttpContext context, string error)
        {
            context.Response.StatusCode = 400;
            context.Response.Headers["Content-Type"] = "application/json";
            context.Response.WriteAsync(JsonSerializer.Serialize(error));
        }

        protected string GetIPAddress(HttpContext context)
        {
            try
            {
                string ipAddress =context.Connection.RemoteIpAddress?.ToString();
                if (!string.IsNullOrWhiteSpace(ipAddress) && ipAddress!= "::1") return ipAddress;

                ipAddress = context.Request.Headers["HTTP_X_FORWARDED_FOR"];
                if(!string.IsNullOrWhiteSpace(ipAddress))  return ipAddress;
                
                ipAddress = context.Request.Headers["REMOTE_ADDR"];
                if (!string.IsNullOrWhiteSpace(ipAddress)) return ipAddress;

                ipAddress = context.Request.Headers["X_FORWARDED_FOR"];
                if (!string.IsNullOrWhiteSpace(ipAddress)) return ipAddress;

                ipAddress = context.Request.Headers["User-Agent"];
                if (!string.IsNullOrWhiteSpace(ipAddress)) return ipAddress;

                return context.Request.Headers["X-Real-IP"];
            }
            catch (Exception)
            {
                return null;
            }
          
        }

    }

}
