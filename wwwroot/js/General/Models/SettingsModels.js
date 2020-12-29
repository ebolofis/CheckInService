function SettingsModel(model) {
    let settings = this;
    settings.selectedTemplate = model !== undefined && model !== null ? model.selectedTemplate : null;
    settings.pageBackgroundColor = model !== undefined && model !== null ? model.pageBackgroundColor : null;
    settings.sectionBackgroundColor = model !== undefined && model !== null ? model.sectionBackgroundColor : null;
    settings.sectionFontColor = model !== undefined && model !== null ? model.sectionFontColor : null;
    settings.lineboxAttributes = new LineBoxModel(model !== undefined && model !== null ? model.lineboxAttributes : null);
    settings.entryboxAttributes = new EntryBoxModel(model !== undefined && model !== null ? model.entryboxAttributes : null);
    settings.labelAttributes = new LabelModel(model !== undefined && model !== null ? model.labelAttributes : null);
    settings.entryAttributes = new EntryModel(model !== undefined && model !== null ? model.entryAttributes : null);
    settings.headerAttributes = new HeaderModel(model !== undefined && model !== null ? model.headerAttributes : null);
};

function LineBoxModel(model) {
    let lineBox = this;
    lineBox.lineBoxMarginTop = model !== undefined && model !== null ? model.lineBoxMarginTop : 0;
    lineBox.lineBoxMarginBottom = model !== undefined && model !== null ? model.lineBoxMarginBottom : 0;
    lineBox.lineBoxMarginLeft = model !== undefined && model !== null ? model.lineBoxMarginLeft : 0;
    lineBox.lineBoxMarginRight = model !== undefined && model !== null ? model.lineBoxMarginRight : 0;
};

function EntryBoxModel(model) {
    let entryBox = this;
    entryBox.EntryBoxMarginTop = model !== undefined && model !== null ? model.EntryBoxMarginTop : 0;
    entryBox.EntryBoxMarginBottom = model !== undefined && model !== null ? model.EntryBoxMarginBottom : 0;
    entryBox.EntryBoxMarginLeft = model !== undefined && model !== null ? model.EntryBoxMarginLeft : 0;
    entryBox.EntryBoxMarginRight = model !== undefined && model !== null ? model.EntryBoxMarginRight : 0;
    entryBox.EntryBoxBorderWidthTop = model !== undefined && model !== null ? model.EntryBoxBorderWidthTop : 0;
    entryBox.EntryBoxBorderWidthBottom = model !== undefined && model !== null ? model.EntryBoxBorderWidthBottom : 0;
    entryBox.EntryBoxBorderWidthLeft = model !== undefined && model !== null ? model.EntryBoxBorderWidthLeft : 0;
    entryBox.EntryBoxBorderWidthRight = model !== undefined && model !== null ? model.EntryBoxBorderWidthRight : 0;
    entryBox.EntryBoxBorderColor = model !== undefined && model !== null ? model.EntryBoxBorderColor : null;
};

function LabelModel(model) {
    let label = this;
    label.LabelsMarginTop = model !== undefined && model !== null ? model.LabelsMarginTop : 0;
    label.LabelsMarginBottom = model !== undefined && model !== null ? model.LabelsMarginBottom : 0;
    label.LabelsMarginLeft = model !== undefined && model !== null ? model.LabelsMarginLeft : 0;
    label.LabelsMarginRight = model !== undefined && model !== null ? model.LabelsMarginRight : 0;
    label.textAlign = model !== undefined && model !== null ? model.textAlign : null;
    label.textColor = model !== undefined && model !== null ? model.textColor : null;
    label.fontFamily = model !== undefined && model !== null ? model.fontFamily : null;
    label.fontSize = model !== undefined && model !== null ? model.fontSize : 0;
    label.fontWeight = model !== undefined && model !== null ? model.fontWeight : null;
};

function EntryModel(model) {
    let entry = this;
    entry.backColor = model !== undefined && model !== null ? model.backColor : null;
    entry.EntriesMarginTop = model !== undefined && model !== null ? model.EntriesMarginTop : 0;
    entry.EntriesMarginBottom = model !== undefined && model !== null ? model.EntriesMarginBottom : 0;
    entry.EntriesMarginLeft = model !== undefined && model !== null ? model.EntriesMarginLeft : 0;
    entry.EntriesMarginRight = model !== undefined && model !== null ? model.EntriesMarginRight : 0;
    entry.textAlign = model !== undefined && model !== null ? model.textAlign : null;
    entry.textColor = model !== undefined && model !== null ? model.textColor : null;
    entry.fontFamily = model !== undefined && model !== null ? model.fontFamily : null;
    entry.fontSize = model !== undefined && model !== null ? model.fontSize : 0;
    entry.fontWeight = model !== undefined && model !== null ? model.fontWeight : null;
};

function HeaderModel(model) {
    let header = this;
    header.headerDescription = model !== undefined && model !== null ? model.headerDescription : null;
    header.headerBackgroundColor = model !== undefined && model !== null ? model.headerBackgroundColor : null;
    header.headerFontColor = model !== undefined && model !== null ? model.headerFontColor : null;
    header.headerfontFamily = model !== undefined && model !== null ? model.headerfontFamily : null;
    header.headerFontSize = model !== undefined && model !== null ? model.headerFontSize : 0;
    header.headerFontWeight = model !== undefined && model !== null ? model.headerFontWeight : null;
};