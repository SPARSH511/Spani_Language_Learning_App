import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Aboutus.css";
import SpanioLogo from "../components/spanio.jpg";
import TeamMember from "./TeamMember"; // Import the TeamMember component

const Aboutus = (props) => {
  const navigate = useNavigate();
  const teamMembers = [
    {
      name: "Ch. Venkata Rajasekhar",
      role: " Backend Developer",
      githubLink: "https://github.com/Venkata-Rajasekhar",
      linkedinLink: "www.linkedin.com/in/rajasekhar1484 ",
    },
    {
      name: "Sparsh Saxena",
      role: "Frontend Developer",
      githubLink: "https://github.com/SPARSH511",
      linkedinLink: "http://www.linkedin.com/in/sparsh511",
    },
    {
      name: "Anubhava Tripathi",
      role: "Backend Developer",
      githubLink: "https://github.com/Anubhava2105",
      linkedinLink: "www.linkedin.com/in/anubhava-tripathi-8b551b269",
    },
    {
      name: "Parvesh",
      role: "Frontend Developer",
      githubLink: "https://github.com/SPARSH511",
      linkedinLink: "http://www.linkedin.com/in/sparsh511",
    },
  ];

  return (
    <div className="wrapper">
      <header id="Home" className="header">
        <div className="header-left">
          <img src={SpanioLogo} height="60px" width="80px" alt="Logo" />
          <h1>Spanio</h1>
        </div>
        <div className="header-right">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <a onClick={() => navigate("/aboutus")}>About Us</a>
            </li>
            <li>
              <a href="#Contact">Contact</a>
            </li>
          </ul>
        </div>
      </header>
      <main className="main">
        <h1>About Us</h1>
        <div className="content">
          <div>
            <p>
              Welcome to Spanio, your gateway to mastering the Spanish language!
              At Spanio, we are passionate about helping students of all levels
              learn Spanish effectively and confidently.{" "}
            </p>
            <p>
              Our mission is to provide engaging and interactive learning
              resources that cater to diverse learning styles. Whether you're a
              beginner looking to grasp the basics or an advanced learner aiming
              to refine your skills, Spanio offers a comprehensive platform
              designed to meet your needs.
            </p>
          </div>
        </div>
      </main>
      <div className="team">
        <h1>Our Team</h1>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              githubLink={member.githubLink}
              linkedinLink={member.linkedinLink}
            />
          ))}
        </div>
      </div>
      <div className="footer">
        <div class="uppercontent">
          <div className="footerhead">Spanio</div>

          <div class="leftportion">
            <div class="lpm">
              <p>Menu</p>
              <ul>
                <li>
                  <a href="#Home">Home</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#Contact">Contact</a>
                </li>
              </ul>
            </div>

            <div class="lps">
              <p>Services</p>
              <ul>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Use</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="rightportion">
            <p>Get in Touch</p>
            <a href="mailto:Spanio@mail.com">Email: Spanio@mail.com</a>
          </div>
        </div>

        <div class="lowercontent">
          Copyright © Spanio Technologies Pvt. Limited | All Right Reserved
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
