"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";
import { useState, useEffect } from "react";

const MessageForm = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const closeToast = () => setToast(null);

  useEffect(() => { AOS.init(); }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      const response = await fetch(apiUrl + "/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Form data submitted successfully:", data);
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
        });
        setToast({ message: 'Žinutė išsiųsta sėkmingai!', type: 'success' });
      } else {
        console.error("Error submitting form:", data.message);
        setToast({ message: 'Klaida siunčiant žinutę.', type: 'error' });
      } 
    } catch (error) {
      console.error("Error submitting form:", error);
      setToast({ message: 'Klaida siunčiant žinutę.', type: 'error' });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setToast(null);
      }, 5000);
    }
  };

  return (
    <div data-aos="zoom-out-down" className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl bg-gradient-to-b from-yellow-200 to-white shadow-4xl">
        <h1 className="text-[30px] font-bold mb-6 text-center text-neutral-900">Užpildykite formą</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block px-4 text-sm font-medium text-neutral-900">Jūsų vardas</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Įveskite savo vardą" className="text-neutral-900 mt-1 p-4 block w-full rounded-md shadow-sm focus:outline-none" required />
          </div>
          <div>
            <label htmlFor="email" className="block px-4 text-sm font-medium text-neutral-900">El. paštas</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Įveskite savo el. paštą" className="text-neutral-900 mt-1 p-4 block w-full rounded-md shadow-sm focus:outline-none" required />
          </div>
          <div>
            <label htmlFor="company" className="block px-4 text-sm font-medium text-neutral-900">Įmonė</label>
            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Įveskite įmonės pavadinimą" className="text-neutral-900 mt-1 p-4 block w-full rounded-md shadow-sm focus:outline-none"/>
          </div>
          <div>
            <label htmlFor="message" className="block px-4 text-sm font-medium text-neutral-900">Žinutė</label>
            <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="Jūsų žinutę..." className="text-neutral-900 mt-1 p-4 block w-full rounded-md shadow-sm focus:outline-none" required ></textarea>
          </div>
          {isLoading ? ( <Spinner /> ) : ( <Button type="submit">Siųsti žinutę</Button> )}
        </form>
        {toast && ( <Toast message={toast.message} type={toast.type} onClose={closeToast} /> )}
    </div>
  );
};

export default MessageForm;
