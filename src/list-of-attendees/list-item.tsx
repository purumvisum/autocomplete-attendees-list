import React from "react";
import { IContact } from "../stores/store";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import '../App.css';
import Status from "./status";

const ListItemWithStatus = (props: {
    contact: IContact;
}) => {
    const {contact} = props;

    return (
        <ListItem
            id = {contact.id}
            disablePadding>
            <ListItemAvatar>
                <Avatar alt={contact.name} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText primary={contact.fullName} secondary={<Status status={contact.status}/>} />
        </ListItem>
    )
};

export default ListItemWithStatus;
