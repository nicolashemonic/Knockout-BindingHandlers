interface KnockoutBindingHandlers {
    select2: KnockoutBindingHandler;
}

module BindingHandlers {

    ko.bindingHandlers.select2 = {

        init: (element, valueAccessor, allBindingsAccessor, viewModel) => {
            var select2 = valueAccessor();
            var value = ko.utils.unwrapObservable(select2.value);

            ko.utils.domNodeDisposal.addDisposeCallback(element,() => {
                jQuery(element).select2('destroy');
            });

            select2.data = ko.utils.unwrapObservable(select2.data);

            jQuery(element).select2(select2);

            if (value) {
                jQuery(element).select2("data", value);
            }

            jQuery(element).on("change", (data) => {
                select2.value(data.added); // update observable from select2
            });
        },

        update: (element, valueAccessor, allBindingsAccessor, viewModel) => {
            var select2 = valueAccessor();
            var value: any = ko.utils.unwrapObservable(select2.value);
            
            if (value) {
                jQuery(element).select2("data", value); // update select2 from observable
            }
        }
    };

}