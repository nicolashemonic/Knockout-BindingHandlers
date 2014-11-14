function format(state) {
    return state.text.toUpperCase();
}

class State {
    constructor(public id, public text) {
        this.id = id;
        this.text = text;
    }
    public toString () {
        return this.text + "(" + this.id + ")";
    }
}

class ViewModel {
    constructor(){
        this.states = [
            new State("AL", "Alabama"),
            new State("AK", "Alaska"),
            new State("AZ", "Arizona"),
            new State("WV", "West Virginia"),
            new State("WI", "Wisconsin"),
            new State("WY", "Wyoming")
        ];
    }
    
    private states;
    private selectedState = ko.observable<string>("(none)");
};

$(document).ready(() => {
    ko.applyBindings(new ViewModel());
});
