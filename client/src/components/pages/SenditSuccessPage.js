import React from "react";
import { Link } from "react-router-dom";

import "./SenditSuccessPage.css";

function SenditSuccessPage(props) {
    return (
        <div id="sendit" className="page-container">
            <Link to="/sendit" id="findit-title" className="page-title">
                sendit
            </Link>
            <div className="formpage-body sendit-feedback">
                <p className="sendit-feedback-text">Dormspams sent!</p>
                <div className="button-container">
                    <Link className="action-button sendit-actions" to="/findit">
                        browse dormspams
                    </Link>
                    <Link className="action-button sendit-actions" to="/">
                        go home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SenditSuccessPage;
