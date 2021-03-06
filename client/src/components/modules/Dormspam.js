import React, { useState } from "react";
import { format } from "date-fns";
import { IoCloseOutline, IoStarOutline, IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";
import { post } from "../../utilities";

import Tag from "./Tag";

import "./Dormspam.css";

function Dormspam(props) {
    const [star, setStar] = useState(props.star);
    function toggleStar() {
        post("/api/toggle-star", { star: star, dormspam: props.id }).then((res) => {
            if (!star && !props.parentStars.includes(props.id)) {
                var starsTemp = [...props.parentStars];
                starsTemp.push(props.id);
                props.parentSetStars(starsTemp);
            } else if (star && props.parentStars.includes(props.id)) {
                var starsTemp = [...props.parentStars];
                starsTemp.splice(starsTemp.indexOf(props.id), 1);
                props.parentSetStars(starsTemp);
            }
            setStar(!star);
        });
    }
    // focused
    if (props.focused) {
        return (
            <article id={`dormspam-${props.id}`} className="dormspam-focus">
                <div className="dormspam-toprow-focus">
                    <p className="dormspam-date">{format(props.date, "MMM dd")}</p>
                    <Link
                        className="dormspam-close-button"
                        onClick={props.toggleFocusMode}
                        to={`/findit`}
                    >
                        <IoCloseOutline className="dormspam-icon" />
                    </Link>
                </div>
                <div className="dormspam-row2-focus">
                    <h2 className="dormspam-title dormspam-title-focus">{props.title}</h2>
                    <button
                        className="dormspam-fave-button"
                        onClick={(e) => {
                            toggleStar();
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                    >
                        {star ? (
                            <IoStar className="dormspam-icon dormspam-fave" />
                        ) : (
                            <IoStarOutline className="dormspam-icon dormspam-nofave" />
                        )}
                    </button>
                </div>
                <div
                    className="dormspam-body-focus"
                    dangerouslySetInnerHTML={{ __html: props.body }}
                />
                <div className="dormspam-bottomrow-focus">
                    <Link
                        className="dormspam-author"
                        to="#"
                        onClick={(e) => {
                            window.location = `mailto:${props.address}`;
                            e.preventDefault();
                        }}
                    >
                        {props.author}
                    </Link>
                    <p className="dormspam-bctalk">{props.bctalk} for bc-talk</p>
                    <Tag text={props.tag} updateTags={props.updateTags} />
                </div>
            </article>
        );
    }
    // normal card, not focused
    return (
        <article
            id={`dormspam-${props.id}`}
            className="dormspam-nofocus"
            onClick={(e) => props.handleCardClick(e, props.id)}
        >
            <div className="dormspam-toprow-nofocus">
                <p className="dormspam-date">{format(props.date, "MMM dd")}</p>
                <button
                    className="dormspam-fave-button"
                    onClick={(e) => {
                        toggleStar();
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                >
                    {star ? (
                        <IoStar className="dormspam-icon dormspam-fave" />
                    ) : (
                        <IoStarOutline className="dormspam-icon dormspam-nofave" />
                    )}
                </button>
            </div>
            <h2 className="dormspam-title">{props.title}</h2>
            <hr />
            <div className="dormspam-bottomrow-nofocus">
                <Link
                    className="dormspam-author"
                    to="#"
                    onClick={(e) => {
                        window.location = `mailto:${props.address}`;
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                >
                    {props.author}
                </Link>
                <Tag text={props.tag} updateTags={props.updateTags} />
            </div>
        </article>
    );
}

export default Dormspam;
