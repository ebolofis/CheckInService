#pragma checksum "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\Shared\_CheckBoxPartial.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "d442d18dcf77d0594396c741ddcb94f4ddb68b33"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared__CheckBoxPartial), @"mvc.1.0.view", @"/Views/Shared/_CheckBoxPartial.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\_ViewImports.cshtml"
using CheckInService;

#line default
#line hidden
#nullable disable
#nullable restore
#line 1 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\Shared\_CheckBoxPartial.cshtml"
using CheckInService.Controllers;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\Shared\_CheckBoxPartial.cshtml"
using CheckInService.Models;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\Shared\_CheckBoxPartial.cshtml"
using CheckinBack.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"d442d18dcf77d0594396c741ddcb94f4ddb68b33", @"/Views/Shared/_CheckBoxPartial.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b9dd54aa9ecbb513ab0d0dd6cfaa5fca9c0228dd", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared__CheckBoxPartial : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
            WriteLiteral("<div>\r\n    ");
#nullable restore
#line 9 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\Shared\_CheckBoxPartial.cshtml"
Write(Html.Label("LabelName"));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    ");
#nullable restore
#line 10 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\Shared\_CheckBoxPartial.cshtml"
Write(Html.CheckBox("empty"));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n\r\n</div>\r\n\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591