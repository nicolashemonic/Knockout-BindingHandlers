interface KnockoutBindingHandlers {
    select2: KnockoutBindingHandler;
}

ko.bindingHandlers.select2 = {

    init: (el, valueAccessor, allBindingsAccessor, viewModel) => {
        ko.utils.domNodeDisposal.addDisposeCallback(el, () => {
            $(el).select2('destroy');
        });

        var allBindings = allBindingsAccessor(),
            select2 = ko.utils.unwrapObservable(allBindings.select2);

        $(el).select2(select2);
    },

    update: (el, valueAccessor, allBindingsAccessor, viewModel) => {
        var allBindings = allBindingsAccessor();

        if ("value" in allBindings) {
            $(el).select2("val", allBindings.value());
        } else if ("selectedOptions" in allBindings) {
            var converted = [];
            var textAccessor = (value) => { return value; };
            if ("optionsText" in allBindings) {
                textAccessor = (value) => {
                    var valueAccessor = (item) => { return item; }
                    if ("optionsValue" in allBindings) {
                        valueAccessor = (item) => { return item[allBindings.optionsValue]; }
                    }
                    var items = $.grep(allBindings.options(), (e) => { return valueAccessor(e) == value });
                    if (items.length == 0 || items.length > 1) {
                        return "UNKNOWN";
                    }
                    return items[0][allBindings.optionsText];
                }
            }
            $.each(allBindings.selectedOptions(), (key, value) => {
                converted.push({ id: value, text: textAccessor(value) });
            });
            $(el).select2("data", converted);
        }
    }
};