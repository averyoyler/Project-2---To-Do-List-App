let listyLists = new ListCollection;

function ListCollection(){
    this.collection = [];
    this.add = function(name){
        this.collection.push(new List(name));
    }
}

function List(name){
    this.name = name;
    this.collection = [];
    this.add = function(name, completed){
        this.collection.push(new Task(name, completed))
    }
}

function Task(name, completed){
    this.name = name;
    this.completed = false;
}