import React, { useState } from "react";
// import { useStores } from "./use-stores";
import { IContact } from "../stores/store";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';


import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import { CheckCircleOutlineIcon } from "@mui/icons-material";


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
