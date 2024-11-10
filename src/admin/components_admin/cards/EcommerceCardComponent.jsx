import React from "react";
import { Dropdown } from "react-bootstrap";

export default function EcommerceCardComponent({ variant, trend, number, title, icon, percent }) {

    return (
        <div className={`mc-ecommerce-card ${variant}`}>
            <i className="mc-ecommerce-card-trend material-icons">{trend}</i>
            <div className="mc-ecommerce-card-head">
                <h4 className="mc-ecommerce-card-meta">
                    <span>{title}</span>
                    {number}
                </h4>
                <i className="mc-ecommerce-card-icon material-icons">{icon}</i>
            </div>
            <div className="mc-ecommerce-card-foot">
                <div className="mc-ecommerce-card-compare">
                    <mark>+ {percent}%</mark>
                    <span>Last Month</span>
                </div>
                {/* <Dropdown bsPrefix="mc-dropdown">
                    <Dropdown.Toggle bsPrefix="mc-dropdown-toggle">
                        <i className="material-icons">more_vert</i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end" className="mc-dropdown-paper">
                        <button type="button" className="mc-dropdown-menu">
                            <i className="material-icons">history</i>
                            <span>Last Day</span>
                        </button>
                        <button type="button" className="mc-dropdown-menu">
                            <i className="material-icons">history</i>
                            <span>Last Week</span>
                        </button>
                        <button type="button" className="mc-dropdown-menu">
                            <i className="material-icons">history</i>
                            <span>Last Month</span>
                        </button>
                        <button type="button" className="mc-dropdown-menu">
                            <i className="material-icons">history</i>
                            <span>Last Year</span>
                        </button>
                    </Dropdown.Menu>
                </Dropdown> */}
            </div>
        </div>
    );
}
