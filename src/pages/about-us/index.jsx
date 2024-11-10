import React from "react";
import { Card } from "antd";
import { FacebookOutlined, TwitterOutlined, GithubOutlined } from "@ant-design/icons";
import "./index.scss";

const teamMembers = [
  {
    name: "Lê Hoàn Nhơn",
    role: "Frontend Developer",
    image: "src/assets/pexels-olly-846741.png", // Update with the actual path to the image
    social: {
      facebook: "https://facebook.com/alice",
      twitter: "https://twitter.com/alice",
      github: "https://github.com/alice",
    },
  },
  {
    name: "Nguyễn	Ngọc Tường Vi",
    role: "Frontend Developer",
    image: "src/assets/pexels-olly-846741.png", // Update with the actual path to the image
    social: {
      facebook: "https://facebook.com/bob",
      twitter: "https://twitter.com/bob",
      github: "https://github.com/bob",
    },
  },
  {
    name: "Trần	Hữu	Quang",
    role: "Backend Developer",
    image: "src/assets/pexels-olly-846741.png", // Update with the actual path to the image
    social: {
      facebook: "https://facebook.com/charlie",
      twitter: "https://twitter.com/charlie",
      github: "https://github.com/charlie",
    },
  },
  {
    name: "Lâm Thanh Anh	Quân",
    role: "Fullstack Developer",
    image: "src/assets/pexels-olly-846741.png", // Update with the actual path to the image
    social: {
      facebook: "https://facebook.com/diana",
      twitter: "https://twitter.com/diana",
      github: "https://github.com/diana",
    },
  },
  {
    name: "Lê	Hoàng Minh Thư",
    role: "Mobile Developer",
    image: "src/assets/pexels-olly-846741.png", // Update with the actual path to the image
    social: {
      facebook: "https://facebook.com/diana",
      twitter: "https://twitter.com/diana",
      github: "https://github.com/diana",
    },
  }
];

const AboutUs = () => {
  return (
    <div className="about-us" style={{ marginTop: "135px", }}>
      <div className="description-container">
        <h1>About Us</h1>
        <p>
          We are dedicated to providing the best booking experience for POD workspaces. <br />Our mission is to connect
          people with the ideal spaces for their needs, whether for work or leisure.
        </p>

        {/* New Page Description Section */}
        <div className="page-description">
          <div className="text-content">
            <h2>What we aim?</h2>
            <p>
              At Boo Coffee, our mission is to revolutionize how people work by making comfortable,<br />
              inspiring spaces in coffee shops easily accessible for everyone. We understand that the traditional<br />
              office environment isn’t suitable for everyone, and finding the right space to focus, create, and <br />
              collaborate can be challenging. That’s why we’re committed to connecting professionals, freelancers,<br />
              students, and remote workers with ideal coffee shop environments that foster productivity and creativity.<br />
              <br />
              Our platform simplifies the process of discovering and booking the perfect working spot in local coffee shops. <br />
              Whether you’re looking for a quiet corner to concentrate, a lively ambiance to fuel creativity, or a spot for <br />
              team collaboration, we’re here to make sure you find exactly what you need. We aim to support local businesses <br />
              by promoting unique workspaces in coffee shops while giving you the flexibility to work where and when it suits <br />
              you best.<br />
              <br />
              By empowering the work-from-anywhere lifestyle, we strive to enhance work-life balance and contribute to a more <br />
              dynamic, flexible work culture. We believe that great ideas can be born anywhere, and our goal is to provide the<br />
              spaces where they can grow.
            </p>
          </div>
          <div className="image-container">
            <img src="src\assets\comfortable-workplace-counter-bar-cafe-with-take-away-coffee-cup-laptop-note-book-mobile-w_880763-22208.png" alt="Workspace" className="description-image" />
          </div>
        </div>
      </div>

      <h3>Our team</h3>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <Card className="team-member" key={`${member.name}-${index}`}>
            <img src={member.image} alt={member.name} className="member-image" />
            <h2>{member.name}</h2>
            <p>{member.role}</p>
            <div className="social-icons">
              <a href={member.social.facebook} target="_blank" rel="noopener noreferrer">
                <FacebookOutlined />
              </a>
              <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                <TwitterOutlined />
              </a>
              <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                <GithubOutlined />
              </a>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default AboutUs;
