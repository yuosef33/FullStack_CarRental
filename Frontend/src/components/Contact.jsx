import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  subject: Yup.string().required("Please select a subject"),
  message: Yup.string().min(10, "Too short").required("Message is required"),
});

const Contact = () => (
  <div className="p-7 max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>

    {/* form */}
    <div className="flex justify-center">
      <Formik
        initialValues={{ name: "", email: "", subject: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const response = await axios.post("http://localhost:3000/api/contact", values);
            alert(response.data.message); // e.g. "Your message has been received. Thank you!"
            resetForm();
          } catch (error) {
            const errMsg =
              error.response?.data?.message || "Something went wrong. Please try again.";
            alert(errMsg);
          }
        }}
      >
        <Form className="flex flex-col gap-4 w-full max-w-xl">
          <div>
            <label className="block font-semibold">Name</label>
            <Field name="name" className="border p-2 w-full rounded" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <label className="block font-semibold">Email</label>
            <Field name="email" type="email" className="border p-2 w-full rounded" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <label className="block font-semibold">Subject</label>
            <Field name="subject" as="select" className="border p-2 w-full rounded">
              <option value="">-- Select a subject --</option>
              <option value="inquiry">Inquiry</option>
              <option value="complaint">Complaint</option>
              <option value="feedback">Feedback</option>
              <option value="partnerShip Request">Partnership Request</option>
            </Field>
            <ErrorMessage name="subject" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <label className="block font-semibold">Message</label>
            <Field name="message" as="textarea" rows="5" className="border p-2 w-full rounded" />
            <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800">
            Send Message
          </button>
        </Form>
      </Formik>
    </div>

    {/* follow & working-hours */}
    <div
      className="mt-10 bg-cover bg-center bg-no-repeat p-6 rounded-lg shadow-lg text-white"
      style={{ backgroundImage: "url('/contact-bg.jpg')", minHeight: "300px" }}
    >
      <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
      <div className="flex space-x-4 text-2xl mb-6">
        <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" className="text-sky-500 hover:text-sky-700">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" className="text-pink-500 hover:text-pink-700">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" className="text-blue-700 hover:text-blue-900">
          <FaLinkedin />
        </a>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-1">Working Hours</h3>
        <p>Sunday - Thursday: 9:00 AM to 6:00 PM</p>
        <p>Closed on Fridays and Saturdays</p>
      </div>
    </div>
  </div>
);

export default Contact;
