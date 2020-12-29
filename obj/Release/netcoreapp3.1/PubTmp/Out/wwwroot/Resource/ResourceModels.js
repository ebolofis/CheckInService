function ConfigurationFormModel(model) {
    var configurationForm = this;
    configurationForm.MemberId = new ItemModel(model.MemberId);
    configurationForm.FirstName = new ItemModel(model.FirstName);
    configurationForm.LastName = new ItemModel(model.LastName);
    configurationForm.Company = new ItemModel(model.Company);
    configurationForm.DateOfBirth = new ItemModel(model.DateOfBirth);
    configurationForm.Street = new ItemModel(model.Street);
    configurationForm.ZipCode = new ItemModel(model.ZipCode);
    configurationForm.City = new ItemModel(model.City);
    configurationForm.Passport = new ItemModel(model.Passport);
    configurationForm.Nationality = new ItemModel(model.Nationality);
    configurationForm.MethodOfPayment = new ItemModel(model.MethodOfPayment);
    configurationForm.Country = new ItemModel(model.Country);
    configurationForm.CountryId = new ItemModel(model.CountryId);
    configurationForm.Email = new ItemModel(model.Email);
    configurationForm.Phone = new ItemModel(model.Phone);
    configurationForm.Mobile = new ItemModel(model.Mobile);
    configurationForm.ReservationNo = new ItemModel(model.ReservationNo);
    configurationForm.Arrival = new ItemModel(model.Arrival);
    configurationForm.Departure = new ItemModel(model.Departure);
    configurationForm.Room = new ItemModel(model.Room);
    configurationForm.Signature = new ItemModel(model.Signature);
    configurationForm.ShowPrice = new ItemModel(model.ShowPrice);
    configurationForm.Price = new ItemModel(model.Price);
    configurationForm.IsInvoice = new ItemModel(model.IsInvoice);
    configurationForm.Afm = new ItemModel(model.Afm);
    configurationForm.CreditCard = new ItemModel(model.CreditCard);
    configurationForm.AcceptanceText = new ItemModel(model.AcceptanceText);
    configurationForm.InvoiceAfm = new ItemModel(model.InvoiceAfm);
    configurationForm.InvoiceCompany = new ItemModel(model.InvoiceCompany);
    configurationForm.InvoiceOccupation = new ItemModel(model.InvoiceOccupation);
    configurationForm.InvoiceStreet = new ItemModel(model.InvoiceStreet);
    configurationForm.InvoiceZipCode = new ItemModel(model.InvoiceZipCode);
    configurationForm.InvoiceCity = new ItemModel(model.InvoiceCity);
    configurationForm.InvoiceCountry = new ItemModel(model.InvoiceCountry);
    configurationForm.SendLetter = new ItemModel(model.SendLetter);
    configurationForm.SendPhone = new ItemModel(model.SendPhone);
    configurationForm.SendEmail = new ItemModel(model.SendEmail);
    configurationForm.SendTextMessage = new ItemModel(model.SendTextMessage);
    configurationForm.CheckAllAds = new ItemModel(model.CheckAllAds);
    configurationForm.CheckedItem1 = new CheckedBoxItemModel(model.CheckedItem1);
    configurationForm.CheckedItem2 = new CheckedBoxItemModel(model.CheckedItem2);
    configurationForm.CheckedItem3 = new CheckedBoxItemModel(model.CheckedItem3);
    configurationForm.CheckedItem4 = new CheckedBoxItemModel(model.CheckedItem4);
    configurationForm.CheckedItem5 = new CheckedBoxItemModel(model.CheckedItem5);
    configurationForm.CheckedItem6 = new CheckedBoxItemModel(model.CheckedItem6);
    configurationForm.CheckedItem7 = new CheckedBoxItemModel(model.CheckedItem7);
};

function ItemModel(model) {
    var item = this;
    item.ControlType = model.ControlType;
    item.ControlName = model.ControlName;
    item.Description = model.Description;
    item.IsVisible = model.IsVisible;
    item.IsReadOnly = model.IsReadOnly;
    item.IsMandatory = model.IsMandatory;
    item.IsBold = model.IsBold;
    item.IsUpperCase = model.IsUpperCase;
    item.OrderField = model.OrderField;
    item.Width = model.Width;
    item.UnvisibleIfTrue = model.UnvisibleIfTrue;
    item.CustomerLanguageId = model.CustomerLanguageId;
};

function CheckedBoxItemModel(model) {
    var checkedBoxItem = this;
    checkedBoxItem.ControlType = model.ControlType;
    checkedBoxItem.ControlName = model.ControlName;
    checkedBoxItem.Description = model.Description;
    checkedBoxItem.IsVisible = model.IsVisible;
    checkedBoxItem.IsReadOnly = model.IsReadOnly;
    checkedBoxItem.IsMandatory = model.IsMandatory;
    checkedBoxItem.IsBold = model.IsBold;
    checkedBoxItem.IsUpperCase = model.IsUpperCase;
    checkedBoxItem.OrderField = model.OrderField;
    checkedBoxItem.Width = model.Width;
    checkedBoxItem.UnvisibleIfTrue = model.UnvisibleIfTrue;
    checkedBoxItem.CustomerLanguageId = model.CustomerLanguageId;
    checkedBoxItem.Link = model.Link;
    checkedBoxItem.IsMandatoryLink = model.IsMandatoryLink;
    checkedBoxItem.MetadataKey = model.MetadataKey;
    checkedBoxItem.IsMailing = model.IsMailing;
};

function NationalityModel(model) {
    var nationality = this;
    nationality.Id = model.NatId;
    nationality.Description = model.NatCode;

};

function LanguageModel(model) {
    var language = this;
    language.LanguageId = model.LanguageId;
    language.LanguageName = model.LanguageName;
    language.Code = model.Code;
    language.IsDefault = model.IsDefault;
};

function TitleModel(model) {
    var title = this;
    title.Id = model.anredenr;
    title.Description = model.anrede;
    title.Description2 = model.persanr;
    title.Title = model.titel;
    //title.TableId = model.anredenr;
    //title.ShortName = model.anrede;
    //title.Description = model.persanr;
    //title.Title = model.titel;
};

function PaymentMethodModel(model) {
    var paymentMethod = this;
    paymentMethod.MethodId = model.MethodId;
    paymentMethod.MethodDescription = model.MethodDescription;
};

function globalAttributesModel(model) {
    var globalAttributes = this;
    globalAttributes.selectedTemplate = model.selectedTemplate;
    globalAttributes.pageBackgroundColor = model.pageBackgroundColor;
    globalAttributes.sectionBackgroundColor = model.sectionBackgroundColor;
    globalAttributes.sectionFontColor = model.sectionFontColor;
    globalAttributes.lineboxAttributes = new lineboxAttributes(model.lineboxAttributes);
    globalAttributes.entryboxAttributes = new entryboxAttributes(model.entryboxAttributes);
    globalAttributes.labelAttributes = new labelAttributes(model.labelAttributes);
    globalAttributes.entryAttributes = new entryAttributes(model.entryAttributes);
    globalAttributes.headerAttributes = new headerAttributes(model.headerAttributes);
};

function lineboxAttributes(model) {
    var lineboxModel = this;
    lineboxModel.lineBoxMarginLeft = model.lineBoxMarginLeft;
    lineboxModel.lineBoxMarginBottom = model.lineBoxMarginBottom;
    lineboxModel.lineBoxMarginRight = model.lineBoxMarginRight;
    lineboxModel.lineBoxMarginTop = model.lineBoxMarginTop;
};

function entryboxAttributes(model) {
    var entryBoxModel = this;
    entryBoxModel.EntryBoxMarginLeft = model.EntryBoxMarginLeft;
    entryBoxModel.EntryBoxMarginBottom = model.EntryBoxMarginBottom;
    entryBoxModel.EntryBoxMarginRight = model.EntryBoxMarginRight;
    entryBoxModel.EntryBoxMarginTop = model.EntryBoxMarginTop;
};

function labelAttributes(model) {
    var labelsModel = this;
    labelsModel.fontSize = model.fontSize;
    labelsModel.textColor = model.textColor;
    labelsModel.fontWeight = model.fontWeight;
    labelsModel.LabelsMarginLeft = model.LabelsMarginLeft;
    labelsModel.LabelsMarginBottom = model.LabelsMarginBottom;
    labelsModel.LabelsMarginRight = model.LabelsMarginRight;
    labelsModel.LabelsMarginTop = model.LabelsMarginTop;
    labelsModel.textAlign = model.textAlign;
    labelsModel.fontFamily = model.fontFamily;
};

function entryAttributes(model) {
    var entriesModel = this;
    entriesModel.fontSize = model.fontSize;
    entriesModel.textColor = model.textColor;
    entriesModel.fontWeight = model.fontWeight;
    entriesModel.EntriesMarginLeft = model.EntriesMarginLeft;
    entriesModel.EntriesMarginBottom = model.EntriesMarginBottom;
    entriesModel.EntriesMarginRight = model.EntriesMarginRight;
    entriesModel.EntriesMarginTop = model.EntriesMarginTop;
    entriesModel.textAlign = model.textAlign;
    entriesModel.fontFamily = model.fontFamily;
};

function headerAttributes(model) {
    var headersModel = this;
    headersModel.headerBackgroundColor = model.headerBackgroundColor;
    headersModel.headerFontColor = model.headerFontColor;
    headersModel.headerFontSize = model.headerFontSize;
    headersModel.headerfontFamily = model.headerfontFamily;
    headersModel.headerFontWeight = model.headerFontWeight;
};