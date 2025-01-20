"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Cookies from "js-cookie";
import Button from "@/app/components/Button";
import Toast from "@/app/components/Toast";
import Spinner from "@/app/components/Spinner";
import { checkCookiesAndRedirectLogin } from "@/app/utils/loginProtection";

const Login = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [loginData, setLoginData] = useState({
    nickname: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    AOS.init();
    checkCookiesAndRedirectLogin()
   
  }, []);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: loginData.nickname,
          password: loginData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setToast({
          message: data.message || "Login failed",
          type: "error",
        });
        return;
      }

      // Store token and user data in cookies
      Cookies.set("mcToken", data.data.token, {
        expires: 1,
        sameSite: "strict",
      });

      Cookies.set("mcUser", JSON.stringify(data.data.user.nickname), {
        expires: 1,
        sameSite: "strict",
      });

      Cookies.set("mcID", JSON.stringify(data.data.user.id), {
        expires: 1,
        sameSite: "strict",
      });

      setToast({
        message: "Login successful!",
        type: "success",
      });

      window.location.href = "/admin/messages";
    } catch (err) {
      setToast({
        message: "Server error, please try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-32">
      <h1 className="text-[35px] text-neutral-900 font-bold mt-8 mb-8 motion-preset-compress">Prisijungti</h1>
      <section className="flex flex-wrap justify-center items-center w-full gap-14 p-4 bg-gradient-to-b from-white to-yellow-200">
        <div className="flex justify-center items-center">
          <img src="/logo1.png" alt="Ible Logo" className="w-[10rem]" />
        </div>
        <div className="flex justify-center items-center">
          <img src="/mclogo1.svg" alt="Mobile Center" className="w-[10rem]" />
        </div>
      </section>
      <section className="bg-gradient-to-b from-yellow-200 to-white flex justify-center items-center w-full">
        <div data-aos="zoom-out-down" className="bg-white mt-8 shadow-lg rounded-lg p-8 w-screen max-w-sm bg-gradient-to-b from-white to-yellow-200 shadow-4xl">
          <h1 className="text-[30px] font-bold mb-6 text-center text-gray-800">Prisijungimas</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="nickname" className="block px-4 text-sm font-medium text-neutral-900">Naudotojo vardas</label>
              <input type="text" id="nickname" name="nickname" value={loginData.nickname} onChange={handleLoginChange} placeholder="Įveskite savo naudotojo vardą" className="text-gray-800 mt-1 p-4 block w-full rounded-md shadow-sm focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="password" className="block px-4 text-sm font-medium text-neutral-900">Slaptažodis</label>
              <input type="password" id="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Įveskite slaptažodį" className="text-gray-800 mt-1 p-4 block w-full rounded-md shadow-sm focus:outline-none" required />
            </div>
            {isLoading ? (<Spinner />) : (<Button type="submit">Prisijungti</Button>)}
          </form>
        </div>
      </section>
      {toast && (<Toast message={toast.message} type={toast.type} onClose={() => setToast(null)}/>)}
    </div>
  );
};

export default Login;
