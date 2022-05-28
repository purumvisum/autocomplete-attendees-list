import React, { useState } from "react";
import { useStores } from "./use-stores";
import { IContact } from "./stores/store";

import AttendeesList from "./list-of-attendees/attendee-list";
import TitleForm from "./form/title-form";
import { getCursorPosition, restoreCaretPosition, setCursorPosition} from "./helpers";

const EventForm = () => {
    const { attendeesStore } = useStores();
    // list is shown in the dropdown to choose from
    const [filteredContactsList, setFilteredContactsList] = useState<any[]>([]);
    //  list of attendees
    const [listOfAttendees, setListOfAttendees] = useState<IContact[]>([]);
    // position of the char @ of current contact
    const [startOfTheContact, setStartOfTheContact] = useState<number|undefined>(undefined);

    const editableContent =  document.querySelector('[contenteditable]');
    let sel = window.getSelection();

    const getCursor = () => {
        // Get cursor position
        let node = sel?.focusNode;
        let offset = sel?.focusOffset;
        return getCursorPosition(document.querySelector('[contenteditable]'), node, offset, {pos: 0, done: false});
    }

    // Give back a word part that start from @ and end where is a cursor
    // @Dar|ia ==> @Dar This part will be replaced with Contact span
    const currentWordWithAnchor = () => {
        // Get cursor position
        let pos = getCursor();
        return editableContent?.textContent?.slice(startOfTheContact, pos.pos);
    }

    const keyUp = (event:any) => {
        // Get cursor position
        let pos = getCursor();

        // if parent element has data-contact attribute then it's a contact node
        // @ts-ignore
        const parentSpan = sel.extentNode.parentElement;
        // @ts-ignore
        const contactID = sel.extentNode.parentElement.getAttribute("data-contact");

        // If arrows were pressed do nothing
        if( event.keyCode <= 40 && event.keyCode >= 37 ) {
            return;
        }

        // if @ was pressed
        if (event.shiftKey) {
            if(event.keyCode === 50) {
                // set the first letter position of this contact to the state
                setStartOfTheContact(Number(pos.pos) - Number(1));
            }
        }

        // if field is with a text
        if (event.target.innerHTML && editableContent) {
            if (contactID) {
                //Replace contact span with a "@contact" string
                parentSpan.innerText = `@${parentSpan.innerText}`
                parentSpan.outerHTML = parentSpan.innerHTML

                // restore the cursor position after changing HTML
                restoreCaretPosition(sel,editableContent, pos);

                // set @ to as a start Set start of a contact
                // @ts-ignore
                const lastContactIndex = editableContent?.textContent.lastIndexOf("@", pos.pos)
                setStartOfTheContact(lastContactIndex);

                // Delete edited attendees from the list
                const filterList = listOfAttendees.filter(attendee => {
                    return attendee.id !== contactID;
                })
                setListOfAttendees(filterList)

            }
        }

        const wordWithAnchor = currentWordWithAnchor();
        // if you type anything with @ it will show filtered contact list
        if(wordWithAnchor) {
            setFilteredContactsList(attendeesStore.getAllContacts.filter((contact: IContact) => {
                return contact.name.includes(wordWithAnchor.replace('@', ''))
            }))
        } else {
            setFilteredContactsList([])
        }
    }


    const chooseAttendee = (contact: IContact) => {
        // remove all contact list from the screen
        setFilteredContactsList([])

        // Don't add contact id it's already in the list
        const contactIsInList = listOfAttendees.find(attendee => {
            return attendee.id === contact.id
        })
        if (!contactIsInList) {
            // add contact to the list of Attendees
            setListOfAttendees([...listOfAttendees, contact])
        }

        const textToReplace = currentWordWithAnchor();

        if (editableContent && textToReplace) {
            // Inner text that started with @ and ended at the cursor position replased with contact name
            editableContent.innerHTML =editableContent.innerHTML.replace(textToReplace,
                `<span style="background: rgba(var(--sk_highlight_accent,29,155,209),.1);
    color: rgba(var(--sk_highlight,18,100,163),1);border-radius: 3px;
    padding: 2px 5px 2px;"  data-contact=${contact.id} }>${contact.name}</span><span>&nbsp;</span>`);
        }

    }

    return (
        <div>
           <TitleForm
                keyUp = {keyUp}
                chooseAttendee = {chooseAttendee}
                attendeesStore = {attendeesStore}
                filteredContactsList = {filteredContactsList}
           />
           <AttendeesList listOfAttendees={listOfAttendees}/>
        </div>

    );
};

export default EventForm;
