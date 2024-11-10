import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";
import ButtonComponent from "../../../admin/components_admin/elements/ButtonComponent";
import LabelFieldComponent from "../../../admin/components_admin/fields/LabelFieldComponent";
import LabelTextareaComponent from "../../../admin/components_admin/fields/LabelTextareaComponent";
import Footer from "../../layouts_admin/Footer_admin";


export default function SettingsPage() {

    return (
        <div className="mc-main active">
            <div className="mc-card">
                <div className='mc-breadcrumb'>
                    <h3 className="mc-breadcrumb-title">Settings</h3>
                    <ul className="mc-breadcrumb-list">
                        <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Home</Link></li>
                        <li className="mc-breadcrumb-item">Settings</li>
                    </ul>
                </div>
            </div>
            <div className="mc-card p-sm-5">
                <div className="mb-5">
                    <h6 className="mc-divide-title mb-4">Information</h6>
                    <Row>
                        <Col xl={4}>
                            <p className="mc-setting-descrip">Lorem Ipsum is simply dummy text of the printing and typesetting industry dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </Col>
                        <Col xl={8} className="ps-xl-5">
                            <Row>
                                <Col xl={6}><LabelFieldComponent type="text" label="Site Title"  fieldSize="mb-4 w-100 h-md" /></Col>
                                <Col xl={6}><LabelFieldComponent type="text" label="Tagline"  fieldSize="mb-4 w-100 h-md" /></Col>
                                <Col xl={6}><LabelFieldComponent type="email" label="Email Address"  fieldSize="mb-4 w-100 h-md" /></Col>
                                <Col xl={6}><LabelFieldComponent type="url" label="Website URL"  fieldSize="mb-4 w-100 h-md" /></Col>
                                <Col xl={12}><LabelTextareaComponent label="Description" fieldSize="mb-4 w-100 h-text-md" /></Col>
                            </Row>
                        </Col>
                    </Row>
                </div> 
                <div className="mb-5">
                    <h6 className="mc-divide-title mb-4">Accessibility</h6>
                    <Row>
                        <Col xl={4}>
                            <p className="mc-setting-descrip">Lorem Ipsum is simply dummy text of the printing and typesetting industry dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </Col>
                        <Col xl={8} className="ps-xl-5">
                            <Form.Check type="checkbox" id="checkbox4" className="mb-3" label="Send notification on each user registration" defaultChecked />
                            <Form.Check type="checkbox" id="checkbox1" className="mb-3" label="All registration is enabled on this site" defaultChecked />
                            <Form.Check type="checkbox" id="checkbox2" className="mb-3" label="You're sent a direct message" />
                            <Form.Check type="checkbox" id="checkbox3" className="mb-3" label="New membership approval" />
                        </Col>
                    </Row>
                </div>
                <ButtonComponent className="mc-btn primary" icon="verified" text="Save All Changes" />
            </div>
            <Footer />
        </div>
    )
}
