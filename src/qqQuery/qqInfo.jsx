import React from "react";
import "./index.css";

export const QqInfo = (props) => {
    const { info } = props;
    const { name = "", qlogo = "", qq = "" } = info;

    return <div className="showQQInfo">
        <div className="left">
            <img src={qlogo} alt={name} title={name} />
        </div>
        <div className="right">
            <div className="right-t">{name}</div>
            <div className="right-b">{qq}</div>
        </div>
    </div>
}