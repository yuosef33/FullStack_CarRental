const ContactMessage = require('../models/ContactMessage');


const submitContactForm = async (req, res) => {
    const { name, email, subject, message } = req.body;
  
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    if (!['inquiry', 'complaint', 'feedback', 'partnerShip Request'].includes(subject)) {
      return res.status(400).json({ message: 'Invalid subject value' });
    }
  
    try {
      const newMessage = new ContactMessage({ name, email, subject, message });
      await newMessage.save();
  
      res.status(201).json({ message: 'Your message has been received. Thank you!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const getAllMessages = async (req, res) => {
    try {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      res.status(200).json({ messages });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  module.exports = {
    submitContactForm,
    getAllMessages
  };