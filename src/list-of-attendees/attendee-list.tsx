import React from "react";
import { IContact } from "../stores/store";
import '../App.css';
import List from "@mui/material/List";
import ListItemWithStatus from "./list-item";

const AttendeesList = (props: {
    listOfAttendees: IContact[];
}) => {
    const {listOfAttendees} = props;

    return (
        <div className="attendees-box">
            <div className="text-attendees">Attendees</div>
            <List disablePadding sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    listOfAttendees.map((contact:IContact) => {
                        return (
                            <ListItemWithStatus contact ={contact}/>
                        )
                    })
                }
            </List>
        </div>

    )
};

export default AttendeesList;
