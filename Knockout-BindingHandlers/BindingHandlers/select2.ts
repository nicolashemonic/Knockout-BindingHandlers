interface KnockoutBindingHandlers {
    select2: KnockoutBindingHandler;
}

module BindingHandlers {

    ko.bindingHandlers.select2 = {

        init: (element, valueAccessor, allBindingsAccessor, viewModel) => {
            var select2 = valueAccessor();
            var value = ko.utils.unwrapObservable(select2.value);
            var isEnabled = ko.utils.unwrapObservable(select2.enable);

            ko.utils.domNodeDisposal.addDisposeCallback(element,() => {
                jQuery(element).select2('destroy');
            });

            // unwrap data from observable for select2 constructor
            select2.data = ko.utils.unwrapObservable(select2.data);

            jQuery(element).select2(select2);

            // set defaults
            if (value) {
                jQuery(element).select2("data", value);
            }
            if (isEnabled === false) {
                jQuery(element).select2("enable", isEnabled);
            }

            jQuery(element).on("change",(data) => {
                if (select2.multiple) { // update observable array from select2
                    if (data.added) {
                        select2.value.push(data.added); 
                    } else {
                        select2.value.remove(data.removed);
                    }
                } else { // update observable from select2
                    if (data.added) {
                        select2.value(data.added);
                    } else {
                        select2.value(undefined);
                    }
                }
            });
        },

        update: (element, valueAccessor, allBindingsAccessor, viewModel) => {
            var select2 = valueAccessor();
            var value: any = ko.utils.unwrapObservable(select2.value);
            var isEnabled = ko.utils.unwrapObservable(select2.enable);
            
            jQuery(element).select2("data", value); // update select2 from observable

            if (isEnabled === false) {
                jQuery(element).select2("enable", isEnabled);
            } else {
                jQuery(element).select2("enable", true);
            }
        }
    };

}