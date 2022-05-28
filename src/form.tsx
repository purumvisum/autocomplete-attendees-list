import React, { useState } from "react";
import { useStores } from "./use-stores";
import { IContact } from "./stores/store";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import './App.css';

const EventForm = () => {
    const { attendeesStore } = useStores();
    const [filteredContactsList, setFilteredContactsList] = useState<any[]>([]);
    
    const [listOfAttendees, setListOfAttendees] = useState<IContact[]>([]);

    const [startOfTheContact, setStartOfTheContact] = useState(null);


    const currentWordWithAnchor = () => {

        // @ts-ignore
        const selection = window.getSelection();
        // @ts-ignore
        console.log('anchorSymbol', selection, selection.extentNode)
        // @ts-ignore
        // let anchorSymbol = document.querySelector('[contenteditable]')?.textContent.indexOf("@");
        let anchorSymbol = startOfTheContact;
        // console.log('anchorSymbol',anchorSymbol)

        const caretIndex = getCaretIndex(document.querySelector('[contenteditable]'))
        // @ts-ignore
        return document.querySelector('[contenteditable]')?.textContent.slice(anchorSymbol,caretIndex);
    }



    const keyUp = (event:any) => {

        console.log("event.target.value",event.target.innerHTML)
        console.log("event.keyCode",event.keyCode)

        // field is with a text
        if (event.target.innerHTML) {

            const selection = window.getSelection();
            // @ts-ignore
            const parentSpan = selection.extentNode.parentElement;
            // @ts-ignore
            const contactID = selection.extentNode.parentElement.getAttribute("data-contact");

            if (contactID) {
                // @ts-ignore
                console.log("It's contact",  parentSpan.innerText)
                // @ts-ignore
                parentSpan.innerText = `@${parentSpan.innerText}`
                // @ts-ignore
                // set @ to as a start Set start of a contact
                const caretIndex = getCaretIndex(document.querySelector('[contenteditable]'))
                // @ts-ignore
                const lastSpaceIndex = document.querySelector('[contenteditable]')?.textContent.lastIndexOf("@", caretIndex)
                // @ts-ignore
                setStartOfTheContact(lastSpaceIndex);

                // console.log("parentSpan",lastSpaceIndex)
                // @ts-ignore
                parentSpan.outerHTML = parentSpan.innerHTML
                // @ts-ignore
                // console.log('contactID',contactID, listOfAttendees.toJS)
                const filterList = listOfAttendees.filter(attendee => {
                    return attendee.id !== contactID;
                })

                console.log('contactID',filterList)
                setListOfAttendees(filterList)

                // selection!.extentNode.parentElement.innerText = `@${selection!.extentNode.parentElement.innerText}`

            }
        }


        // if @ was pressed
        if (event.shiftKey) {
            if(event.keyCode === 50) {
                console.log("@@@")
                // set the start of this contact to the state
                // @ts-ignore
                setStartOfTheContact(getCaretIndex(document.querySelector('[contenteditable]')) - 1);

            }
        }

        const wordWithAnchor = currentWordWithAnchor();
        // if you type anything with @ it will show filtered contact list
        // @ts-ignore
        if(wordWithAnchor) {
            setFilteredContactsList(attendeesStore.getAllContacts.filter((contact: IContact) => {
                // @ts-ignore
                return contact.name.includes(wordWithAnchor.replace('@', ''))
            }))
        } else {
            setFilteredContactsList([])
        }

    }



    // https://javascript.plainenglish.io/how-to-find-the-caret-inside-a-contenteditable-element-955a5ad9bf81
    function getCaretIndex(element:any) {
        let position = 0;
        const isSupported = typeof window.getSelection !== "undefined";
        if (isSupported) {
            const selection = window.getSelection();
            if (selection && selection.rangeCount !== 0) {
                // @ts-ignore
                const range =  window && window.getSelection().getRangeAt(0);
                const preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                position = preCaretRange.toString().length;
            }
        }
        return position;
    }


    const chooseAttendee = (contact: IContact) => {
        // remove all contact list from the screen
        setFilteredContactsList([])
        // add contact to the list of Attendees
        setListOfAttendees([...listOfAttendees, contact])
        const textToReplace = currentWordWithAnchor();

        // Inner text that started woth @ and ended at the cursor position replsed with contact name
        // @ts-ignore
        document.querySelector('[contenteditable]').innerHTML = document.querySelector('[contenteditable]').innerHTML.replace(textToReplace,
            `<span style="color:#FF0000"  data-contact=${contact.id} }>${contact.name}</span><span>&nbsp;</span>`);


    }

    return (
        <div>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >

                <span
                    className="text-field"
                    suppressContentEditableWarning={true}
                    onKeyUp={keyUp}
                    // onClick={onKeyPress}
                    contentEditable="true">This is a paragraph.<span style={{color: "red"}}> It is editable. </span> Try to
                    change this text.
                </span>

                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {
                        filteredContactsList.map((contact:IContact) => {
                            return (
                                <ListItem
                                    id = {contact.id}
                                    disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            chooseAttendee(contact);
                                        }}
                                    >
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText primary={contact.fullName} secondary={contact.email} />
                                </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </List>

                {attendeesStore.meetingTitle}
            </Box>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    listOfAttendees.map((contact:IContact) => {
                        return (
                            <ListItem
                                id = {contact.id}
                                disablePadding>
                                <ListItemButton
                                >
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText primary={contact.fullName} secondary={contact.email} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List>
        </div>

    );
};

export default EventForm;
