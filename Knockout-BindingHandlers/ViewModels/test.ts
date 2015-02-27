class State {
    constructor(public value, public text) {
        this.value = value;
        this.text = text;
    }
}

var json = [
    new State(1, "Alabama"),
    new State("AK", "Alaska"),
    new State("AZ", "Arizona"),
    new State("WV", "West Virginia"),
    new State("WI", "Wisconsin"),
    new State("WY", "Wyoming")
];

class ViewModel {
    constructor() {
        setTimeout(() => {
            this.states(json);
        }, 500);

        setTimeout(() => {
            this.selectedState(json[4]);
        }, 1000);
    }

    private states = ko.observableArray<State>([]);

    private selectedState = ko.observable<State>();

    private getStates = () => {
        return { results: this.states() };
    }

    private getStateId = (obj) => {
        return obj.value;
    }

    private selectFirstState() {
        this.selectedState(this.states()[0]);
    }
};

$(document).ready(() => {
    ko.applyBindings(new ViewModel());
});
