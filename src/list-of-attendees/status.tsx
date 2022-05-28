import React from "react";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

import '../App.css';

const Status = (props: {
    status: string
}) => {
    const {status} = props;

    console.log("status",status)
    switch (status) {
        case ("Available"):
            return (
                <span className="list-item-status" >
                    <CheckCircleOutlineIcon
                        style={{fill: "#25c139", width: '15px', margin: '0 3px 0 0'}}
                    />
                    <span  className="list-item-status-text">{status}</span>
                </span>
            )
            break;
        case ("Unavailiable"):
            return (
                <span className="list-item-status no-avail" >
                    <DoNotDisturbIcon
                        style={{fill: "#8b8e99", width: '15px', margin: '0 3px 0 0'}}
                    />
                    {status}</span>
            )
            break;
        default:
            return (
                <span className="list-item-status" >
                    <CheckCircleOutlineIcon />
                    <span  className="list-item-status-text">{status.toUpperCase()}</span>
                </span>
            )
            break;
    }
};

export default Status;
