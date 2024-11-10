import React, { startTransition, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import FloatCardComponent from "../../../admin/components_admin/cards/FloatCardComponent";
import PaginationComponent from "../../../admin/components_admin/PaginationComponent";
import BookingTableComponent from "../../../admin/components_admin/tables/BookingTableComponent";
import LabelFieldComponent from "../../../admin/components_admin/fields/LabelFieldComponent";
import Footer from "../../../admin/layouts_admin/Footer_admin";
import api from "../../../config/axios";

export default function BookingListPage() {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await api.get("PODBooking/all");
                const bookingData = response.data.map(booking => ({
                    id: booking.id,
                    pod: {
                        name: booking.pod?.description || "Unknown",
                        price: booking.pod?.price || "Unknown",
                    },
                    startTime: booking.startTime || "Unknown",
                    endTime: booking.endTime || "Unknown",
                    total: booking.totalPrice || "Unknown",
                    accountId: booking.pod?.accountId || "Unknown",
                }));

                // Fetch usernames for each booking
                const bookingsWithUsernames = await Promise.all(bookingData.map(async (booking) => {
                    try {
                        const userResponse = await api.get(`account/id`, { params: { id: booking.accountId } });
                        console.log(userResponse.data.email);
                        return {
                            ...booking,
                            username: userResponse.data.email || "Unknown"
                        };
                    } catch (error) {
                        console.error(`Error fetching username for accountId ${booking.accountId}:`, error);
                        return {
                            ...booking,
                            username: "Unknown"
                        };
                    }
                }));

                setBookings(bookingsWithUsernames);
                setFilteredBookings(bookingsWithUsernames);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setError("Error fetching bookings.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    // Hàm tìm kiếm Bookings theo ID hoặc Name
    const handleSearch = () => {
        if (searchTerm) {
            if (!isNaN(searchTerm)) {
                // Tìm kiếm theo ID
                const result = bookings.find(booking => booking.id === parseInt(searchTerm));
                setFilteredBookings(result ? [result] : []);
                setError(result ? "" : "No booking found with that ID.");
            } else {
                // Tìm kiếm theo Name
                const filtered = bookings.filter(booking => {
                    const bookingName = booking.pod.description || ""; // Đảm bảo có giá trị hợp lệ để gọi toLowerCase
                    return bookingName.toLowerCase().includes(searchTerm.toLowerCase());
                });
                setFilteredBookings(filtered);
                setError(filtered.length > 0 ? "" : "No bookings found with that name.");
            }
        } else {
            setFilteredBookings(bookings);
        }
    };

const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
}

useEffect(() => {
    handleSearch();
}, [searchTerm, bookings]);

    return (
        <div className="mc-main active">
            <Row>
                <Col xl={12}>
                <div className="mc-card">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">Bookings List</h3>
                            <ul className="mc-breadcrumb-list">
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Home</Link></li>
                                <li className="mc-breadcrumb-item"><Link to='#' className="mc-breadcrumb-link">Bookings</Link></li>
                                <li className="mc-breadcrumb-item">Bookings List</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col xl={12}>
                    <div className="mc-card">
                        <Row>
                            <Col xs={12} sm={6} md={4} lg={3}>
                                <LabelFieldComponent
                                    type="search"
                                    label="Search By"
                                    placeholder="ID / Name"
                                    labelDir="label-col"
                                    fieldSize="mb-4 w-100 h-md"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    variant="outlined"
                                />
                            </Col>
                            <Col xl={12}>
                                {loading ? (
                                    <p>Loading...</p>
                                ) : error ? (
                                    <p>{error}</p>
                                ) : (
                                    <BookingTableComponent
                                    thead={["POD + Price/hour", "Start Time", "End Time", "Email"]}
                                    tbody={filteredBookings.map(booking => ({
                                        id: booking.id,
                                        pod: `${booking.pod.name } | ${booking.pod.price} vnd`,
                                        startTime: booking.startTime,
                                        endTime: booking.endTime,
                                        username: booking.username
                                    }))}
                                    />
                                )}
                                <PaginationComponent />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Footer />
        </div>
    );
}