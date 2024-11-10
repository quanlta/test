import { Layout, Row, Col } from "antd";
import './index.scss'; // Import the SCSS file

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className="app-footer">
      <Row>
        <Col xs={24} md={6}>
          <div className="footer-section logo-section">
            <img src="src\assets\logo.png" alt="" className="footer-logo" />  
            <p>
              Get shoes ready for the new term at your nearest store. Find your
              perfect size in store. Get Rewards.
            </p>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </Col>
        <Col xs={24} md={6}>
          <div className="footer-section">
            <h4>Category</h4>
            <ul>
              <li>Book office</li>
              <li>Order</li>
              <li>About us</li>
              <li>Contact</li>
            </ul>
          </div>
        </Col>
        <Col xs={24} md={6}>
          <div className="footer-section">
            <h4>Help</h4>
            <ul>
              <li>FAQs</li>
              <li>How it works</li>
              <li>Privacy policy</li>
              <li>Payment policy</li>
            </ul>
          </div>
        </Col>
        <Col xs={24} md={6}>
          <div className="footer-section">
            <h4>Get in touch</h4>
            <ul>
              <li>nhonlhse171845@fpt.edu.vn</li>
              <li>+84328446831</li>
            </ul>
          </div>
        </Col>
      </Row>
      <div className="footer-bottom">
        <p className="copyright">©2024 Created by MyApp</p>
        <a href="#" className="terms">Terms & Conditions</a>
      </div>
    </Footer>
  );
};

export default AppFooter;
