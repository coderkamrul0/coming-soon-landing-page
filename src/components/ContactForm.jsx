import { useState } from "react";
import emailjs from 'emailjs-com';


const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
      });
      const [sent, setSent] = useState(false);
      const [error, setError] = useState(null);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Your EmailJS service ID
        const serviceID = 'your_service_id';
    
        // Your EmailJS template ID
        const templateID = 'your_template_id';
    
        // Your EmailJS user ID
        const userID = 'your_user_id';
    
        emailjs.sendForm(serviceID, templateID, e.target, userID)
          .then((result) => {
            console.log('Email sent successfully:', result.text);
            setSent(true);
            setError(null);
          }, (error) => {
            console.error('Email send failed:', error);
            setSent(false);
            setError("Failed to send message. Please try again later.");
          });
      };
    
      return (
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white rounded-md">
          <form className="text-black w-full p-5" onSubmit={handleSubmit}>
            <h4 className="text-center text-lg md:text-xl font-bold py-3">Send Your Message!</h4>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent border border-black py-2 px-4 mb-4 text-lg w-full outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border border-black py-2 px-4 mb-4 text-lg w-full outline-none"
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="bg-transparent border border-black py-2 px-4 mb-4 text-lg w-full outline-none resize-none"
              rows="3"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-black w-full text-white py-2 px-4 rounded-md uppercase font-semibold hover:bg-gray-800 transition-colors duration-300"
            >
              Submit
            </button>
            {sent && <p className="text-green-500 mt-2">Message sent successfully!</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      );
    }
    
    export default ContactForm;