import React from "react";
import PropTypes from "prop-types";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const TeamMember = ({ name, role, githubLink, linkedinLink }) => {
  return (
    <div className="team-member" style={styles.card}>
      <div className="member-info">
        <h2 style={styles.name}>{name}</h2>
        <p style={styles.role}>{role}</p>
      </div>
      <div className="member-links" style={styles.links}>
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          <FaGithub style={styles.icon} /> GitHub
        </a>
        <a
          href={linkedinLink}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          <FaLinkedin style={styles.icon} /> LinkedIn
        </a>
      </div>
    </div>
  );
};

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  githubLink: PropTypes.string.isRequired,
  linkedinLink: PropTypes.string.isRequired,
};

const styles = {
  card: {
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    margin: "20px",
    padding: "20px",
    width: "250px",
    height: "250px",
    textAlign: "center",
  },
  name: {
    margin: "0",
    fontSize: "1.5rem",
    color: "#666",
  },
  role: {
    margin: "0",
    color: "#666",
  },
  links: {
    marginTop: "10px",
  },
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "#333",
    marginBottom: "5px",
  },
  icon: {
    marginRight: "5px",
  },
};

export default TeamMember;
