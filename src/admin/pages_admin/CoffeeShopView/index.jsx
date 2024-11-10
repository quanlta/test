import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Dropdown } from "react-bootstrap";
import AnchorComponent from "../../../admin/components_admin/elements/AnchorComponent";
import ButtonComponent from "../../../admin/components_admin/elements/ButtonComponent";
import LabelTextareaComponent from "../../../admin/components_admin/fields/LabelTextareaComponent";
import reviews from "../../../assets/data/reviews.json";
import Footer from "../../../admin/layouts_admin/Footer_admin";
import api from "../../../config/axios";

export default function CoffeeShopViewPage() {
    const { id } = useParams(); // Get the coffee shop name from the URL
    const [coffee, setCoffee] = useState(null);

    useEffect(() => {
        // Fetch coffee shop details by name
        const fetchCoffeeShop = async () => {
            try {
                const response = await api.get(`/coffeeshops/${id}`);
                setCoffee(response.data);
            } catch (error) {
                console.error("Error fetching coffee shop details:", error);
            }
        };
        fetchCoffeeShop();
    }, [id]);

    const ratings = [
        { "count": "5 star", "graph": "90%", "user": "22" },
        { "count": "4 star", "graph": "75%", "user": "06" },
        { "count": "3 star", "graph": "30%", "user": "05" },
        { "count": "2 star", "graph": "15%", "user": "03" },
        { "count": "1 star", "graph": "5%", "user": "02" }
    ]

    return (
        <div className="mc-main active">
            <div className="mc-card mb-4">
                <div className='mc-breadcrumb'>
                    <h3 className="mc-breadcrumb-title">Coffee Shop View</h3>
                    <ul className="mc-breadcrumb-list">
                        <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Home</Link></li>
                        <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Products</Link></li>
                        <li className="mc-breadcrumb-item">Coffee Shop View</li>
                    </ul>
                </div>
            </div>
            <div className="mc-card p-lg-4">
                <Row>
                    <Col xl={5}>
                        <h6 className="mc-divide-title mb-4">Coffee Shop Gallery</h6>
                        <div className="mc-product-view-gallery">
                            <img src={coffee?.image} alt="product" />
                        </div>
                    </Col>
                    <Col xl={7}>
                        <h6 className="mc-divide-title mb-4">Coffee Shop Details</h6>
                        <div className="mc-product-view-info-group">
                            <h2 className="mc-product-view-info-title">{coffee?.name}</h2>
                            <div className="mc-product-view-meta">
                                <h5>Address</h5>
                                <span>:</span>
                                <p>{coffee?.address}</p>
                                
                            </div>
                            
                            <div className="mc-product-view-meta">       
                                <h5>Phone</h5>
                                <span>:</span>
                                <p>{coffee?.phone}</p>
                               
                            </div>
                            <div className="mc-product-view-meta">       
                                <h5>Open Time</h5>
                                <span>:</span>
                               <p>{coffee?.openTime}</p>
                                
                            </div>
                            <div className="mc-product-view-meta">                 
                                <h5>Close Time</h5>
                                <span>:</span>
                                <p>{coffee?.closeTime}</p>
                            </div>
                        </div>
                    </Col>
                    <Col xl={12}>
                        <h6 className="mc-divide-title mt-5 mb-4">Coffee Shop Description</h6>
                        <div className="mc-product-view-descrip">
                            <p>Book a table quickly, comfortably in time and sit in your favorite place at our cafe.</p>
                        </div>
                    </Col>
                    <Col xl={12}>
                        <h6 className="mc-divide-title mt-5 mb-4">Rating Analytics</h6>
                        <div className="mc-review-analytics-group">
                            <div className="mc-review-analytics-graph-group">
                                <ul className="mc-review-analytics-list">
                                    {ratings.map((rating, index) => (
                                        <li key={index} className="mc-review-analytics-item">
                                            <span className="mc-review-analytics-count">{rating.count}</span>
                                            <div className="mc-review-analytics-graph"><span style={{ width: rating.graph }}></span></div>
                                            <span className="mc-review-analytics-user">({rating.user})</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mc-review-analytics-detail-group">
                                <h3 className="mc-review-analytics-total">Total Reviews (38)</h3>
                                <h4 className="mc-review-analytics-score">4.9</h4>
                                <div className="mc-review-analytics-star">
                                    <i className="material-icons active">star</i>
                                    <i className="material-icons active">star</i>
                                    <i className="material-icons active">star</i>
                                    <i className="material-icons active">star</i>
                                    <i className="material-icons active">star_half</i>
                                </div>
                                <p className="mc-review-analytics-text">Your average rating star</p>
                            </div>
                        </div>
                    </Col>
                    <Col xl={12}>
                        <h6 className="mc-divide-title mt-5 mb-4">Customer Reviews</h6>
                        <ul className="mc-review-list">
                            {reviews?.map((item, index) => (
                                <li key={index} className="mc-review-item">
                                    <div className="mc-review-group">
                                        <div className="mc-review-data">
                                            <div className="mc-review-head">
                                                <div className="mc-review-user">
                                                    <div className="mc-round-avatar sm">
                                                        <img src={item.src} alt="avatar" />
                                                    </div>
                                                    <div className="mc-duel-text sm">
                                                        <h3 className="mc-duel-text-title">{item.name}</h3>
                                                        <p className="mc-duel-text-descrip">{item.date}</p>
                                                    </div>
                                                    {item.admin && <span className="mc-review-admin">{item.admin}</span>}
                                                </div>
                                                <div className="mc-review-reply">
                                                    <AnchorComponent
                                                        to={item.button.path}
                                                        icon={item.button.icon}
                                                        text={item.button.text}
                                                        className="mc-btn primary"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mc-review-star">
                                                {item.star.map((item, index) => (
                                                    <i key={index} className="material-icons">{item}</i>
                                                ))}
                                            </div>
                                            <p className="mc-review-describe">{item.text}</p>
                                        </div>
                                        <div className="mc-review-dots">
                                            <Dropdown bsPrefix="mc-dropdown">
                                                <Dropdown.Toggle bsPrefix="mc-dropdown-toggle">
                                                    <i className='material-icons'>more_vert</i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu align="end" className="mc-dropdown-paper">
                                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>edit</i><span>Edit</span></button>
                                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>gpp_bad</i><span>Block</span></button>
                                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>report</i><span>Report</span></button>
                                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>delete</i><span>Delete</span></button>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    {item.reply &&
                                        <ul>
                                            {item.reply.map((item, index) => (
                                                <li key={index}>
                                                    <div className="mc-review-group">
                                                        <div className="mc-review-data">
                                                            <div className="mc-review-head">
                                                                <div className="mc-review-user">
                                                                    <div className="mc-round-avatar sm">
                                                                        <img src={item.src} alt="avatar" />
                                                                    </div>
                                                                    <div className="mc-duel-text sm">
                                                                        <h3 className="mc-duel-text-title">{item.name}</h3>
                                                                        <p className="mc-duel-text-descrip">{item.date}</p>
                                                                    </div>
                                                                    {item.admin && <span className="mc-review-admin">{item.admin}</span>}
                                                                </div>
                                                                <div className="mc-review-reply">
                                                                    <AnchorComponent
                                                                        to={item.button.path}
                                                                        icon={item.button.icon}
                                                                        text={item.button.text}
                                                                        className="mc-btn primary"
                                                                    />
                                                                </div>
                                                            </div>
                                                            {item.star &&
                                                                <div className="mc-review-star">
                                                                    {item.star.map((item, index) => (
                                                                        <i key={index} className="material-icons">{item}</i>
                                                                    ))}
                                                                </div>
                                                            }
                                                            <p className="mc-review-describe">{item.text}</p>
                                                        </div>
                                                        <div className="mc-review-dots">
                                                            <Dropdown bsPrefix="mc-dropdown">
                                                                <Dropdown.Toggle bsPrefix="mc-dropdown-toggle">
                                                                    <i className='material-icons'>more_vert</i>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu align="end" className="mc-dropdown-paper">
                                                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>edit</i><span>Edit</span></button>
                                                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>gpp_bad</i><span>Block</span></button>
                                                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>report</i><span>Report</span></button>
                                                                    <button type='button' className='mc-dropdown-menu'><i className='material-icons'>delete</i><span>Delete</span></button>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col xl={12}>
                        <h6 className="mc-divide-title mt-3 mb-4">Review Reply Form</h6>
                        <LabelTextareaComponent placeholder="Write here..." fieldSize="w-100 h-text-xl" />
                        <ButtonComponent className="mc-btn mc-review-form-btn primary">Drop Your Replies</ButtonComponent>
                    </Col>
                </Row>
                <Footer />
            </div>
        </div>
    )
}
