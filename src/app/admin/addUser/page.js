"use client";
import { useState, useEffect } from "react";
import Button from "@/app/components/Button";
import AOS from "aos";
import "aos/dist/aos.css";
import Toast from "@/app/components/Toast"; 
import AdminBar from "@/app/components/AdminBar";
import Spinner from "@/app/components/Spinner";
import Cookies from "js-cookie";
import { checkCookiesAndRedirectPages } from "@/app/utils/loginProtection";

const AddUser = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        AOS.init();
        checkCookiesAndRedirectPages();
      }, []);

    const [formData, setFormData] = useState({
        nickname: "",
        password: "",
        passwordConfirm: "",
        role: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
    
      const token = Cookies.get("mcToken");
      if (!token) {
        setToast({ message: "Autorizacija nepavyko. Prašome prisijungti iš naujo.", type: "error" });
        setIsLoading(false);
        return;
      }
    
      try {
        const response = await fetch(`${apiUrl}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          setToast({ message: "Vartotojas sėkmingai pridėtas!", type: "success" });
          setFormData({ nickname: "", password: "", passwordConfirm: "", role: "user" });
        } else {
          setToast({ message: data.message || "Klaida įrašant vartotoją.", type: "error" });
        }
      } catch (error) {
        setToast({ message: "Įvyko serverio klaida. Bandykite dar kartą.", type: "error" });
      } finally {
        setIsLoading(false);
        window.location.href = "/admin/users";
      }
    };
    

  return (
    <div className="flex flex-col items-center justify-center mt-32 px-4">
      <h1 className="text-[35px] text-neutral-900 font-bold mt-8 mb-8 motion-preset-compress">
        Pridėti vartotoją
      </h1>
      <div className="w-full flex justify-center md:justify-end px-10 z-10 motion-preset-compress">
        <AdminBar />
      </div>
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-4xl">
        <div className="bg-gradient-to-b from-yellow-200 to-white flex flex-col justify-center items-center w-full p-6 rounded-lg shadow-md" data-aos="zoom-in-down">
          <h2 className="text-xl font-semibold mb-4 text-neutral-900">Pridėti vartotoją</h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nickname" className="block text-sm font-medium text-neutral-900">Vartotojo vardas</label>
              <input id="nickname" name="nickname" className="text-neutral-900 mt-1 p-4 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" value={formData.nickname} onChange={handleChange} required/>
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-neutral-900">Vartotojo rolė</label>
              <select id="role" name="role" className="text-neutral-900 mt-1 p-4 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" value={formData.role} onChange={handleChange}>
                <option value="user">Vartotojas</option>
                <option value="admin">Administratorius</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-neutral-900">Slaptažodis</label>
              <input id="password" name="password" type="password" className="text-neutral-900 mt-1 p-4 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" value={formData.password} onChange={handleChange} required/>
            </div>
            <div className="mb-4">
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-neutral-900">Pakartoti slaptažodį</label>
              <input id="passwordConfirm" name="passwordConfirm" type="password" className="text-neutral-900 mt-1 p-4 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" value={formData.passwordConfirm} onChange={handleChange} required/>
            </div>
            {isLoading ? <Spinner />  : <Button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600" disabled={isLoading}>Išsaugoti</Button>}
          </form>
        </div>
      </div>
      {toast && (<Toast message={toast.message} type={toast.type} onClose={() => setToast(null)}/>)}
    </div>
  );
};

export default AddUser;
