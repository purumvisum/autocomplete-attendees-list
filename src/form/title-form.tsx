import React from "react";
import { IContact } from "../stores/store";
import '../App.css';

import Box from "@mui/material/Box";
import AttendeesDropdown from "../attendees-dropdown/attendees-deopdown";

const TitleForm = (props: {
    keyUp: any;
    chooseAttendee: any;
    attendeesStore: any;
    filteredContactsList: IContact[];
}) => {
    const {keyUp,chooseAttendee,attendeesStore,filteredContactsList} = props;

    return (
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
                placeholder = "Event name"
                contentEditable="true">
            </span>

            {filteredContactsList.length > 0 &&
                <AttendeesDropdown
                    filteredContactsList = {filteredContactsList}
                    chooseAttendee = {chooseAttendee}
                />
            }

            {attendeesStore.meetingTitle}
        </Box>
    )
};

export default TitleForm;
