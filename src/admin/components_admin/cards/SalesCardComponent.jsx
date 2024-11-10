import React from "react";
import SalesChartComponent  from "../../components_admin/charts/SalesChartComponent";
import { Dropdown } from "react-bootstrap";

export default function SalesCardComponent() {

    return (
        <div className="mc-sales-card">
            <div className="mc-sales-card-group">
                <div className="mc-card-header">
                    <h4 className="mc-card-title">Total Sales</h4>
                    {/* <Dropdown bsPrefix="mc-dropdown">
                        <Dropdown.Toggle bsPrefix="mc-dropdown-toggle">
                            <i className="material-icons">more_horiz</i>
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
                <div className="mc-sales-card-amount trending_up green">
                    <h3>$3,787,681.00</h3>
                    <p>
                        40.63%
                        <i className="material-icons">trending_up</i>
                    </p>
                </div>
                <p className="mc-sales-card-compare">$3,578.90 in Last Month</p>
            </div>
            <SalesChartComponent />
        </div>
    );
}
