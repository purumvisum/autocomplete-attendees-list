import { makeAutoObservable, observable, computed } from "mobx";
// import { toast } from "react-toastify";
// import { v4 as uuidv4 } from 'uuid';

export interface IContact  {
    id: string;
    fullName: string;
    name: string;
    email: string;
    // photo: string;
    status: string;
}

function uuidv4() {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export class AttendeesStore {

    constructor() {
        // Call it here
        makeAutoObservable(this)
    }

    public contacts : IContact[] = [
        { id: uuidv4(), name:"Daria", fullName: "Daria Ivanovich", email: 'purumvisum@gmail.com', status: "Available" },
        { id: uuidv4(), name:"Daaria", fullName: "Daaria Ivanovich", email: 'purumvisum@gmail.com', status: "Unavailiable" },
        { id: uuidv4(), name:"Rick", fullName: "Rick Pastoor", email: 'rick@risecalendar.com', status: "Unavailiable" },
        { id: uuidv4(), name:"Emiel", fullName: "Emiel Janson", email: 'emiel@risecalendar.com', status: "Available" },
        { id: uuidv4(), name:"Willem", fullName: "Willem Spruijt", email: 'willem@risecalendar.com', status: "Available" },
    ];

    public meetingTitle: any[] = []

    // public meetingTitleArray: any[] = []

    public saveMeetingTitleArray = (value: IContact | String) => {
        this.meetingTitle.push(value);

        console.log("meetingTitle",this.parseMeetingTitleArray())
        // toast.success("New Todo added", {
        //     position: toast.POSITION.BOTTOM_CENTER
        // });
    };

    // parse array with contacts and text to the string for title
    public parseMeetingTitleArray = () => {
        return this.meetingTitle.map((titlePart) => {
            switch (typeof titlePart){
                case 'object':
                    return titlePart.fullName
                    // code block
                    break;
                case 'string':
                    return titlePart
                    // code block
                    break;
                default:
                    return " "
            }
        }).join(" ")
    }
    //
    // public toggleCompleted = (id: number) => {
    //     const updatedTodos = this.todos.map(todo => {
    //         if (todo.id === id) {
    //             todo.completed = !todo.completed;
    //         }
    //         return todo;
    //     });
    //     this.todos = updatedTodos;
    // };
    //
    // public updateTodo = (updatedTodo: ITodo) => {
    //     const updatedTodos = this.todos.map(todo => {
    //         if (todo.id === updatedTodo.id) {
    //             return { ...updatedTodo };
    //         }
    //         return todo;
    //     });
    //     this.todos = updatedTodos;
    // };
    //
    // public deleteTodo = (id: number) => {
    //     const updatedTodos = this.todos.filter(todo => todo.id !== id);
    //     this.todos = updatedTodos;
    //     toast.info("Todo deleted", {
    //         position: toast.POSITION.BOTTOM_CENTER
    //     });
    // };
    //
    // get todoProgress() {
    //     const completedCount = this.todos.filter(t => t.completed).length;
    //     const totalCount = this.todos.length;
    //     return `${completedCount} / ${totalCount}`;
    // }
    //
    get getAllContacts() {
        return this.contacts;
    }
    //
    // get incompleteTodos() {
    //     return this.todos.filter(todo => !todo.completed);
    // }
}

// decorate(AttendeesStore, {
//     contacts: observable,
//     // todos: observable,
//     // todoProgress: computed,
//     // completedTodos: computed,
//     // incompleteTodos: computed
// });
