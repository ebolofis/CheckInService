using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CheckInService
{

    using System;
    using Microsoft.AspNetCore.Http.Features;
    using Microsoft.AspNetCore.Mvc.Filters;

    /// <summary>
    /// Request Form Size Limit Attribute
    /// </summary>
    /// <seealso cref="System.Attribute" />
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Filters.IAuthorizationFilter" />
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Filters.IOrderedFilter" />
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class RequestFormSizeLimitAttribute : Attribute, IAuthorizationFilter
    {
        /// <summary>
        /// The form options
        /// </summary>
        private readonly FormOptions formOptions;

        /// <summary>
        /// Initializes a new instance of the <see cref="RequestFormSizeLimitAttribute"/> class.
        /// </summary>
        /// <param name="valueCountLimit">The value count limit.</param>
        public RequestFormSizeLimitAttribute(int valueCountLimit,int keyLengthLimit)
        {
            this.formOptions = new FormOptions()
            {
                ValueCountLimit = valueCountLimit,
                KeyLengthLimit = keyLengthLimit
            };
        }

        /// <summary>
        /// Called early in the filter pipeline to confirm request is authorized.
        /// </summary>
        /// <param name="context">The <see cref="T:Microsoft.AspNetCore.Mvc.Filters.AuthorizationFilterContext" />.</param>
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var features = context.HttpContext.Features;
            var formFeature = features.Get<IFormFeature>();

            if (formFeature == null || formFeature.Form == null)
            {
                // Request form has not been read yet, so set the limits
                features.Set<IFormFeature>(new FormFeature(context.HttpContext.Request, this.formOptions));

            }
        }
    }
}