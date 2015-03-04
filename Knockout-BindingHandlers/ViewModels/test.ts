class State {
    constructor(public id, public text) {
        this.id = id;
        this.text = text;
    }
}

class CustomIdState {
    constructor(public value, public text) {
        this.value = value;
        this.text = text;
    }
}

class CustomTextState {
    constructor(public id, public display) {
        this.id = id;
        this.display = display;
    }
}

var json = [
    // integer ID
    new State(1, "Alabama"), 
    // litteral object
    { id: "AK", text: "Alaska" }, 
    // constructor objects 
    new State("AZ", "Arizona"), 
    new State("WV", "West Virginia"),
    new State("WI", "Wisconsin"),
    new State("WY", "Wyoming")
];

var customIdJson = [
    // integer ID
    new CustomIdState(1, "Alabama"), 
    // litteral object
    { value: "AK", text: "Alaska" }, 
    // constructor objects 
    new CustomIdState("AZ", "Arizona"),
    new CustomIdState("WV", "West Virginia"),
    new CustomIdState("WI", "Wisconsin"),
    new CustomIdState("WY", "Wyoming")
];

var customTextJson = [
    // integer ID
    new CustomTextState(1, "Alabama"), 
    // litteral object
    { id: "AK", display: "Alaska" }, 
    // constructor objects 
    new CustomTextState("AZ", "Arizona"),
    new CustomTextState("WV", "West Virginia"),
    new CustomTextState("WI", "Wisconsin"),
    new CustomTextState("WY", "Wyoming")
];

class ViewModel {
    constructor(scope: HTMLElement) {
        ko.applyBindings(this, scope);
        this.states(json);
        this.customIdStates(customIdJson);
        this.customTextStates(customTextJson);
    }

    private states = ko.observableArray<State>([]);
    private customIdStates = ko.observableArray<CustomIdState>([]);
    private customTextStates = ko.observableArray<CustomTextState>([]);

    private selectedState = ko.observable<State>();
    private selectedCustomIdState = ko.observable<CustomIdState>();
    private selectedCustomTextState = ko.observable<CustomTextState>();
    private selectedStates = ko.observableArray<State>([]);

    private isEnabled = ko.observable<boolean>(false);

    private getStates = () => {
        return { results: this.states() };
    }

    private getCustomIdStates = () => {
        return { results: this.customIdStates() };
    }

    private getCustomTextStates = () => {
        return { results: this.customTextStates() };
    }

    private getStateId = (obj) => {
        return obj.value;
    }

    private getStateText = (obj) => {
        return obj.display;
    }

    private selectFirstState() {
        this.selectedState(this.states()[0]);
    }

    private selectFirstCustomIdState() {
        this.selectedCustomIdState(this.customIdStates()[0]);
    }

    private selectFirstCustomTextState() {
        this.selectedCustomTextState(this.customTextStates()[0]);
    }

    private toggleIsEnabled() {
        if (this.isEnabled()) {
            this.isEnabled(false);
        } else {
            this.isEnabled(true);
        }
    }
};

jQuery(document).ready(() => {
    var scope = document.getElementById("scope");
    var viewModel = new ViewModel(scope);
});
