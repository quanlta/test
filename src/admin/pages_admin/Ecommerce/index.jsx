import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import EcommerceCardComponent from "../../../admin/components_admin/cards/EcommerceCardComponent";
import SalesCardComponent from "../../../admin/components_admin/cards/SalesCardComponent";
import ProductsCardComponent from "../../../admin/components_admin/cards/ProductsCardComponent";
import RevenueCardComponent from "../../../admin/components_admin/cards/RevenueCardComponent";
import ClientsCardComponent from "../../../admin/components_admin/cards/ClientsCardComponent";
import heros from "../../../assets/data/heros.json";
import Footer from "../../../admin/layouts_admin/Footer_admin";

export default function EcommercePage() {


    return (
        <div className="mc-main active">
            <Row>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">Ecommerce</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Home</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Dash Board</Link></li>
                                <li className="mc-breadcrumb-item">Ecommerce</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                {/* <Col xs={12} xl={8}>
                    <Row xs={1} sm={2}>
                        {heros.map((hero, index) => (
                            <Col key={index}>
                                <EcommerceCardComponent
                                    icon={hero.icon}
                                    trend={hero.trend}
                                    title={hero.title}
                                    variant={hero.variant}
                                    number={hero.number}
                                    percent={hero.percent} 
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>                 */}
                <Col xl={12}> <ProductsCardComponent /> </Col>
                <Col xl={12}> <RevenueCardComponent /> </Col>               
                <Col xl={12}> <ClientsCardComponent /> </Col>
               
            </Row>
            <Footer />
        </div>
    );
}
