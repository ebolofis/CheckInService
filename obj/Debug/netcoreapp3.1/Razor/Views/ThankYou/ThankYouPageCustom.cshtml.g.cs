#pragma checksum "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "13f08c1a522c6a4e18be0d9cb1208d6af5281fd0"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_ThankYou_ThankYouPageCustom), @"mvc.1.0.view", @"/Views/ThankYou/ThankYouPageCustom.cshtml")]
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
#line 1 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml"
using CheckInService.Controllers;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml"
using CheckInService.Models;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml"
using CheckinBack.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"13f08c1a522c6a4e18be0d9cb1208d6af5281fd0", @"/Views/ThankYou/ThankYouPageCustom.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b9dd54aa9ecbb513ab0d0dd6cfaa5fca9c0228dd", @"/Views/_ViewImports.cshtml")]
    public class Views_ThankYou_ThankYouPageCustom : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("data-bind", new global::Microsoft.AspNetCore.Html.HtmlString("with: LanguageHandler"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 4 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml"
  
    Layout = "~/Views/Shared/_Layout.cshtml";
    var format = ViewBag.Format as GlobalAttributesModel;

#line default
#line hidden
#nullable disable
            WriteLiteral("<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-12\">\r\n            <br />\r\n            ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "13f08c1a522c6a4e18be0d9cb1208d6af5281fd04552", async() => {
                WriteLiteral(@"
                <div class=""col-xs-12"">
                    <div class=""text-center"">
                        <div class=""custom-flex-row custom-flex-10 custom-flex-center headerstyling"" style=""margin-bottom: 10px;"">
                             <img style=""height:120px;"" data-bind=""attr: { 'src' : tmp3.HotelLogo() }"" id=""headimg"" /> 
                        </div>
                    </div>
                </div>
                <div class=""col-xs-12"">
                    <br />
                </div>
                <div class=""col-xs-12"">
                    <br />
                </div>
                <div class=""col-xs-12"">
                    <label class=""labelstyling"" style=""font-family:Montserrat Regular 400; font-size:24px;"" data-bind=""text: selectedDictionary() != null?selectedDictionary().YourCheckTxt +' '+ selectedDictionary().IsCompleteTxt:null""></label>
                    <hr />
                </div>
                <div class=""col-xs-12"">
                    <label class");
                WriteLiteral("=\"labelstyling\" style=\"font-family:Montserrat Regular 400; font-size:12px;\" data-bind=\"text: selectedDictionary() != null?selectedDictionary().WelcometoTxt +\' \'+ selectedDictionary().HaveNiceStayTxt:null\"></label>\r\n                </div>\r\n            ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
        </div>
    </div>
</div>

<script>
    var tmp3 = this;
    tmp3.HotelLogo = ko.observable(null);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
    };

     function GetHotelLogo() {
        $.ajax({
            url: ""/FC/GetHotelLogo?hotelId="" + localStorage.ConfigHotelName,
            cache: false,
            type: ""GET"",
            crossdomain: false,
            dataType: ""json"",
            ContentType: ""application/json; charset=utf-8"",
            success: function (response) {
                if (response !== undefined && response !== null) {
                    let hotelLogo = ""data:image/png;base64,"" + response.Logo;
                    tmp3.HotelLogo(hotelLogo);
                } else {
                     console.log(""Unable to get hotelLogo with id: "" + localStorage.ConfigHotelName + ""!"");
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    };

 ");
            WriteLiteral(@"   $(document).ready(function () {
        GetHotelLogo();
        LanguageHandler.SetHotelID(localStorage.ConfigHotelName);
        LanguageHandler.SetApi(localStorage.ConfigURL);
        LanguageHandler.GetTranslations();
        localStorage.backButtonFlag = false;
        var baseInfoModel = JSON.parse(localStorage.baseinfo);
        if (baseInfoModel.Mode > 0) {
            var url_for_getpassbook = localStorage.ConfigURL + 'ThankYou/GetPassbook?string1=' +
            localStorage.string1 + ""&buchnr="" + localStorage.buchnr + ""&room="" + localStorage.room + ""&kdnr="" + localStorage.kdnr + ""&hotelId="" + localStorage.ConfigHotelName;
            window.location.href = url_for_getpassbook;
        }

        const url_for_deletemodel = localStorage.ConfigURL + 'api/MainActions/Delete/' + localStorage.ConfigHotelName + ""/"" + localStorage.string1;
        xhr.open(""GET"", url_for_deletemodel);
        xhr.setRequestHeader(""Content-type"", ""application/json"");
        xhr.send();

        setTime");
            WriteLiteral(@"out(function () {
        localStorage.removeItem(""CustomerInput"");
            
        if (baseInfoModel.Mode == 0) {
            var link = localStorage.ConfigURL + ""FC/GetSettings?u="" + localStorage.ConfigURL + ""&g="" + localStorage.ConfigGroupName + ""&h="" + localStorage.ConfigHotelName;
            window.location.href = link;
        }
        else if (baseInfoModel.Mode == 2)
            {
              var link = localStorage.ConfigURL + ""Precheckin/barcode?h="" + localStorage.ConfigHotelName;
              window.location.href = link;
             }
        }, 6000);
    });

    var languageChoosed = setInterval(function () {
        if (LanguageHandler.availableLanguages().length > 0) {
            clearInterval(languageChoosed);
            var customerData = JSON.parse(localStorage.CustomerInput);
            LanguageHandler.ChangeLanguage(customerData[0].LanguageCode);
        }
    }, 1100); 
</script>

<style>
    .entrystyling{
     color:   ");
#nullable restore
#line 111 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml"
         Write(format.entryAttributes.textColor);

#line default
#line hidden
#nullable disable
            WriteLiteral(";\r\n    font-family: ");
#nullable restore
#line 112 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml"
            Write(format.entryAttributes.fontFamily);

#line default
#line hidden
#nullable disable
            WriteLiteral(";\r\n\r\n\r\n\r\n    }\r\n    .hiddenstyling {\r\n        visibility: hidden;\r\n        width: 0%;\r\n        height: 0px;\r\n        height: 0px;\r\n        margin: 0px;\r\n        padding: 0px;\r\n    }\r\n\r\n    .headerstyling{\r\n        background-color:");
#nullable restore
#line 127 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml"
                    Write(format.headerAttributes.headerBackgroundColor);

#line default
#line hidden
#nullable disable
            WriteLiteral(";\r\n        font-size:");
#nullable restore
#line 128 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml"
             Write(format.headerAttributes.headerFontSize);

#line default
#line hidden
#nullable disable
            WriteLiteral(";\r\n        font-weight:");
#nullable restore
#line 129 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml"
               Write(format.headerAttributes.headerFontWeight);

#line default
#line hidden
#nullable disable
            WriteLiteral(";\r\n        color:");
#nullable restore
#line 130 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml"
         Write(format.headerAttributes.headerFontColor);

#line default
#line hidden
#nullable disable
            WriteLiteral(";\r\n        font-family:");
#nullable restore
#line 131 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml"
               Write(format.headerAttributes.headerfontFamily);

#line default
#line hidden
#nullable disable
            WriteLiteral(@";
    }
    #inputFirstName:focus {
        outline: none !important;
        border: 1px solid gray;
        box-shadow: 0 0 10px gray;
    }
    #inputLastName:focus {
        outline: none !important;
        border: 1px solid gray;
        box-shadow: 0 0 10px gray;
    }
    select {
    width: 7%;
    margin: 0;
    font-size: 100%;
    padding: 5px 10px 5px 10px;
    font-family: Segoe UI, Helvetica, sans-serif;
    border: 0;
    border: 1px solid #D0D0D0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html,
    body {
        background-color: #fff;
        color: #555;
        font-family: 'Lato', 'Arial', sans-serif;
        font-weight: 300;
        font-size: 16px;
        text-rendering: optimizeLegibility;
        overflow-x: hidden;
    }
    h1 {
        text-align: center;
    }
    .cont");
            WriteLiteral(@"ainer {
        flex-direction: row;
    }
    .btn:link,
    .btn:hover
    .btn:visited {
        display: flex;
        padding: 10px 30px;
        font-weight: 300;
        text-decoration: none;
        border-radius: 0px;
        -webkit-transition: background-color 0.2s, border 0.2s, color 0.2s;
        transition: background-color 0.2s, border 0.2s, color 0.2s;
    }
    .btn{
        background-color:");
#nullable restore
#line 189 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml"
                    Write(format.sectionBackgroundColor);

#line default
#line hidden
#nullable disable
            WriteLiteral(";\r\n        color:#fff;\r\n    }\r\n    .btn-full:link,\r\n    .btn-full:visited\r\n   {\r\n        background-color: ");
#nullable restore
#line 195 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml"
                     Write(format.sectionBackgroundColor);

#line default
#line hidden
#nullable disable
            WriteLiteral(";\r\n        border: 1px solid ");
#nullable restore
#line 196 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml"
                     Write(format.sectionBackgroundColor);

#line default
#line hidden
#nullable disable
            WriteLiteral(";\r\n        color: #fff;\r\n        margin-right: 15px;\r\n        border-radius:3%;\r\n    }\r\n        .btn:hover,\r\n        .btn:active\r\n         {\r\n            background-color: ");
#nullable restore
#line 204 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml"
                         Write(format.sectionBackgroundColor);

#line default
#line hidden
#nullable disable
            WriteLiteral(@";
              filter: brightness(85%);
               color:#fff;
        }
    .btn-full:hover,
    .btn-full:active {
        border: 1px solid #cf6d17;
         color:#fff;
    }
  .header-photo {
    /*width: 100%;
    margin: 0;
    overflow: hidden;*/
    background-color: ");
#nullable restore
#line 217 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml"
                 Write(format.headerAttributes.headerBackgroundColor);

#line default
#line hidden
#nullable disable
            WriteLiteral(@";
}
.header-photo img {
    opacity: 0.9;
    width: 25%;
    height: 75%;
    -webkit-transform: scale(1.15);
    -ms-transform: scale(1.15);
    transform: scale(1.15);
    -webkit-transition: -webkit-transform 0.5s, opacity 0.5s;
    transition: transform 0.5s, opacity 0.5s;
}
.header-photo img:hover {
    opacity: 1;
    -webkit-transform: scale(1.03);
    -ms-transform: scale(1.03);
    transform: scale(1.03);
}
.dotted{
    background-color:");
#nullable restore
#line 236 "C:\Users\ebolofis\source\repos\CheckInService2\CheckInService\Views\ThankYou\ThankYouPageCustom.cshtml"
                Write(format.sectionBackgroundColor);

#line default
#line hidden
#nullable disable
            WriteLiteral(";\r\n    height:2px;\r\n}\r\n</style>");
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
