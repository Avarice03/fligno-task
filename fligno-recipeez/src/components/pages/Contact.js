import React from 'react'
import phone from "../images/phone.png"
import gmail from "../images/gmail.png"
import gitlab from "../images/gitlab.png"
import github from "../images/github.png"
import linkedin from "../images/linkedin.png"

// Contact page for RecipeEZ
function Contact() {
  return (
    <div className="contact-container">
      <h2 className="text-danger">Contact Me</h2>
      <div className="content-body">
          <div className="contact-item">
            <img src={phone} alt="An icon of a phone"/> 
            <a href="sms:639175968907">+63-917-596-8907</a>
          </div>
          <div className="contact-item">
            <img src={gmail} alt="An icon of gmail"/>
            <a href="mailto:dmendegorin@gmail.com">dmendegorin@gmail.com</a> 
          </div>
          <div className="contact-item">
            <img src={gitlab} alt="An icon of gitlab"/>  
            <a href="https://github.com/Avarice03">Avarice03</a>
          </div>
          <div className="contact-item">
            <img src={github} alt="An icon of github"/>
            <a href="https://gitlab.com/dmendegorin">dmendegorin</a>
          </div>
          <div className="contact-item">
            <img src={linkedin} alt="An icon of linkedIn"/> 
            <a href="https://www.linkedin.com/in/daniel-edison-mendegorin-5b13a8247/">Profile</a>
          </div>
        </div>
    </div>
  )
}

export default Contact;