
import React from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import ButtonComponent from "../../../admin/components_admin/elements/ButtonComponent";
import IconFieldComponent from "../../../admin/components_admin/fields/IconFieldComponent";
import data from "../../../assets/data/messagePage.json";
import Footer from "../../layouts_admin/Footer_admin";

export default function MessagePage() {

    return (
        <div className="mc-main active">

            <Row>
                <Col md={5} xl={4}>
                    <div className="mc-card p-0">
                        <div className="mc-message-user">
                            <div className="mc-message-user-filter">
                                <IconFieldComponent
                                    type="search"
                                    icon="search"
                                    classes="w-100 h-sm"
                                    placeholder="Search username"
                                />
                                <Dropdown bsPrefix="mc-dropdown">
                                    <Dropdown.Toggle bsPrefix="mc-dropdown-toggle">
                                        <i className='material-icons'>dialpad</i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu align="end" className="mc-dropdown-paper">
                                        <button type='button' className='mc-dropdown-menu'>
                                            <i className='material-icons'>account_circle</i>
                                            <span>Active users</span>
                                        </button>
                                        <button type='button' className='mc-dropdown-menu'>
                                            <i className='material-icons'>question_answer</i>
                                            <span>All conversations</span>
                                        </button>
                                        <button type='button' className='mc-dropdown-menu'>
                                            <i className='material-icons'>mark_chat_unread</i>
                                            <span>Unread messages</span>
                                        </button>
                                        <button type='button' className='mc-dropdown-menu'>
                                            <i className='material-icons'>mark_chat_read</i>
                                            <span>Read messages</span>
                                        </button>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <ul className="mc-message-user-list thin-scrolling">
                                {data?.users.map((item, index) => (
                                    <li key={index} className={`mc-message-user-item ${item.active || ""}`}>
                                        <div className={`mc-round-avatar xs ${item.status || ""}`}>
                                            <img src={item.src} alt="avatar" />
                                        </div>
                                        <div className={`mc-duel-text xs ${item.mark || ""}`}>
                                            <h3 className="mc-duel-text-title">
                                                {item.name}
                                                <small>{item.time}</small>
                                            </h3>
                                            <p className="mc-duel-text-descrip">{item.text}</p>
                                        </div>
                                        {item.mark && <sup>{item.badge}</sup>}
                                        <Dropdown bsPrefix="mc-dropdown">
                                            <Dropdown.Toggle bsPrefix="mc-dropdown-toggle">
                                                <i className='mc material-icons'>more_vert</i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu align="end" className="mc-dropdown-paper">
                                                <button type='button' className='mc-dropdown-menu'>
                                                    <i className='material-icons'>account_circle</i>
                                                    <span>View profile</span>
                                                </button>
                                                <button type='button' className='mc-dropdown-menu'>
                                                    <i className='material-icons'>mark_chat_read</i>
                                                    <span>Mark as unread</span>
                                                </button>
                                                <button type='button' className='mc-dropdown-menu'>
                                                    <i className='material-icons'>delete</i>
                                                    <span>Delete messages</span>
                                                </button>
                                                <button type='button' className='mc-dropdown-menu'>
                                                    <i className='material-icons'>remove_circle</i>
                                                    <span>Block messages</span>
                                                </button>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col md={7} xl={8}>
                    <div className="mc-card">
                        <div className="mc-message-chat">
                            <div className="mc-message-chat-header">
                                <div className="mc-round-avatar xs">
                                    <img src="/src/assets/01.webp" alt="avatar" />
                                </div>
                                <div className="mc-duel-text xs">
                                    <h3 className="mc-duel-text-title">Miron Mahmud</h3>
                                    <p className="mc-duel-text-descrip">Active now</p>
                                </div>
                                <div className="mc-message-chat-action-group">
                                    <i className="material-icons">remove_circle</i>
                                    <i className="material-icons">delete</i>
                                    <i className="material-icons">mark_chat_read</i>
                                    <i className="material-icons">account_circle</i>
                                </div>
                            </div>
                            <ul className="mc-message-chat-list thin-scrolling">
                                {data?.chats.map((chat, index) => (
                                    <li key={index} className="mc-message-chat-item">
                                        <div className="mc-round-avatar mc-message-chat-user">
                                            <img src={chat.src} alt="avatar" />
                                        </div>
                                        <div className="mc-message-chat-group">
                                            {chat.text.map((message, idx) => (
                                                <div key={idx} className="mc-message-chat-text">
                                                    <p>{message.text}</p>
                                                    {message.icon.map((icon, iconIdx) => (
                                                        <i key={iconIdx} className="material-icons">{icon}</i>
                                                    ))}
                                                </div>
                                            ))}
                                            <p className="mc-message-chat-datetime">{chat.time}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <form className="mc-message-chat-footer">
                                <input type="text" placeholder="Type a message" />
                                <ButtonComponent type="button" className="material-icons">send</ButtonComponent>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
            <Footer />
        </div>
    );
}
