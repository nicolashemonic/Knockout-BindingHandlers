interface KnockoutBindingHandlers {
    select2: KnockoutBindingHandler;
}

module BindingHandlers {

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

                var selectedOption;
                for (var i = 0; i < allBindings.options().length; i++) {
                    if (allBindings.options()[i].id == allBindings.value()) {
                        selectedOption = allBindings.options()[i];
                    }
                }
                allBindings.select2.value(selectedOption);
                console.log(selectedOption);

            } else if ("selectedOptions" in allBindings) {
                var converted = [];
                var textAccessor = (value) => { return value; };

                var selectedOptions = [];
                for (var i = 0; i < allBindings.options().length; i++) {
                    for (var j = 0; j < allBindings.selectedOptions().length; j++) {
                        if (allBindings.options()[i].id == allBindings.selectedOptions()[j]) {
                            selectedOptions.push(allBindings.options()[i]);
                        }
                    }
                }
                allBindings.select2.value(selectedOptions);
                console.log(selectedOptions);

                // if options are object
                // the text/value could be changed
                if ("optionsText" in allBindings) {
                    textAccessor = (value) => {
                        var valueAccessor = (item) => { return item; }
                        if ("optionsValue" in allBindings) {
                            valueAccessor = (item) => {
                                return item[allBindings.optionsValue];
                            }
                        }
                        var items = $.grep(allBindings.options(), (e) => {
                            return valueAccessor(e) == value
                        });
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

}