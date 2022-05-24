import React from "react";

import { ReactComponent as LinkedinIcon } from "../../assets/linkedin-icon.svg";

import "./contact.styles.scss";

const ContactPage = () => (
  <div className="contact-page page">
    <h1>Contact Us</h1>
    <a
      rel="noreferrer"
      target="_blank"
      href="https://www.linkedin.com/in/marko-zastavnikovi%C4%87-509048237/"
      className="contact-container"
    >
      <LinkedinIcon className="linkedin-icon" />
      <span>Marko Zastavniković</span>
    </a>
  </div>
);

export default ContactPage;
