import { makeAutoObservable } from "mobx";
export interface IContact  {
    id: string;
    fullName: string;
    name: string;
    email: string;
    status: string;
}

export class AttendeesStore {

    constructor() {
        makeAutoObservable(this)
    }

    public contacts : IContact[] = [
        { id: this.uuidv4(), name:"Daria", fullName: "Daria Ivanovich", email: 'test@gmail.com', status: "Available" },
        { id: this.uuidv4(), name:"Daaria", fullName: "Daaria Ivanovich", email: 'testt@gmail.com', status: "Unavailiable" },
        { id: this.uuidv4(), name:"Rick", fullName: "Rick P", email: 'rick@test.com', status: "Available" },
        { id: this.uuidv4(), name:"Rickk", fullName: "Rickk P", email: 'rickk@test.com', status: "Unavailiable" },
    ];

    public uuidv4 () {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());

    }

    get getAllContacts() {
        return this.contacts;
    }
}
