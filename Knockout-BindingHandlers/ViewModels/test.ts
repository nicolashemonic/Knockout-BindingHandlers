class State {
    constructor(public id, public text) {
        this.id = id;
        this.text = text;
    }
}

class ViewModel {
    constructor(){
        this.states = ko.observableArray<State>([
            new State("AL", "Alabama"),
            new State("AK", "Alaska"),
            new State("AZ", "Arizona"),
            new State("WV", "West Virginia"),
            new State("WI", "Wisconsin"),
            new State("WY", "Wyoming")
        ]);
    }
    
    private states;
    private selectedState = ko.observable<string>();
    private selectedStateObj = ko.observable<State>();
    private selectedStates = ko.observableArray<string>([]);
    private selectedStatesObj = ko.observableArray<State>([]);
};

$(document).ready(() => {
    ko.applyBindings(new ViewModel());
});
