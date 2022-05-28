import React from "react";
import { IContact } from "../stores/store";
import '../App.css';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

const AttendeesDropdown = (props: {
    filteredContactsList: IContact[];
    chooseAttendee: any;
}) => {
    const {filteredContactsList} = props;

    return (
        <Paper elevation={3}
               className="suggestion-list"
        >
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {
                    filteredContactsList.map((contact: IContact) => {
                        return (
                            <ListItem
                                id={contact.id}
                                disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        props.chooseAttendee(contact);
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                                    </ListItemAvatar>
                                    <ListItemText primary={contact.fullName} secondary={contact.email}/>
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Paper>
    )
};

export default AttendeesDropdown;
