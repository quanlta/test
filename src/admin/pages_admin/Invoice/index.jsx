import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Dropdown } from "react-bootstrap";
import FloatCardComponent from "../../../admin/components_admin/cards/FloatCardComponent";
import PaginationComponent from "../../../admin/components_admin/PaginationComponent";
import LabelFieldComponent from "../../../admin/components_admin/fields/LabelFieldComponent";
import InvoiceTableComponent from "../../../admin/components_admin/tables/InvoiceTableComponent";
import invoices from "../../../assets/data/invoices.json";
import Footer from "../../../admin/layouts_admin/Footer_admin";

export default function InvoiceListPage() {

    const floats = [
        { "title": "Received Amount", "digit": "$78,593.00", "icon": "account_balance", "variant": "lg green" },
        { "title": "Drafts Amount", "digit": "$24,950.00", "icon": "drafts", "variant": "lg blue" },
        { "title": "Pending Amount", "digit": "$53,617.00", "icon": "pending", "variant": "lg purple" } 
    ];

    return (
        <div className="mc-main active">
            <Row>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">Invoice List</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Home</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Invoices</Link></li>
                                <li className="mc-breadcrumb-item">Invoice List</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                {floats.map((float, index) => (
                    <Col key={ index } md={6} lg={4}>
                        <FloatCardComponent 
                            variant={ float.variant }
                            digit={ float.digit }  
                            title={ float.title }
                            icon={ float.icon }
                        />
                    </Col>
                ))}
                <Col xl={12}>
                    <div className="mc-card">
                        <div className="mc-card-header">
                            <h4 className="mc-card-title">Shopping Invoices</h4>
                            <Dropdown bsPrefix="mc-dropdown">
                                <Dropdown.Toggle bsPrefix="mc-dropdown-toggle">
                                    <i className='material-icons'>more_horiz</i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="mc-dropdown-paper">
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>edit</i><span>Edit</span></button>
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>delete</i><span>Delete</span></button>
                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>download</i><span>Download</span></button>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <Row xs={1} sm={2} lg={4}>
                            <Col>
                                <LabelFieldComponent 
                                    label="Show by"
                                    option={["12 row", "24 row", "36 row"]}
                                    labelDir="label-col"
                                    fieldSize="mb-4 w-100 h-md"
                                /> 
                            </Col>
                            <Col>
                                <LabelFieldComponent 
                                    label="Status by"
                                    option={["Received", "Drafts", "Pending"]}
                                    labelDir="label-col"
                                    fieldSize="mb-4 w-100 h-md"
                                /> 
                            </Col>
                            <Col>
                                <LabelFieldComponent 
                                    type="date"
                                    label="Issued by"
                                    labelDir="label-col"
                                    fieldSize="mb-4 w-100 h-md"
                                /> 
                            </Col>
                            <Col>
                                <LabelFieldComponent 
                                    type="search"
                                    label="Search by"
                                    labelDir="label-col"
                                    fieldSize="mb-4 w-100 h-md"
                                    placeholder="ID / Name / Email"
                                /> 
                            </Col>
                        </Row>
                        <InvoiceTableComponent 
                            thead={ invoices.thead } 
                            tbody={ invoices.tbody } 
                        />
                        <PaginationComponent />
                    </div>
                </Col>
            </Row>
            <Footer />
        </div>
    )
}
