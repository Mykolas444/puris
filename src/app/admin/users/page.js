"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import AdminBar from "@/app/components/AdminBar";
import Link from "next/link";
import Spinner from "@/app/components/Spinner";
import Toast from "@/app/components/Toast";
import Cookies from "js-cookie";
import { checkCookiesAndRedirectPages } from "@/app/utils/loginProtection";

const Users = () => {
  useEffect(() => {
    AOS.init();
    checkCookiesAndRedirectPages();
  }, []);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const token = Cookies.get("mcToken");
      try {
        const response = await fetch(`${apiUrl}/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },       
        });
        const data = await response.json();
        if (data.status === "success") {
          setUsers(data.data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [apiUrl]);

  const handleDelete = (ID, nickname) => {
    const confirmed = window.confirm(`Ar tikrai norite ištrinti vartotoją: ${nickname}?`);
    if (confirmed) {
      deleteUser(ID);
    }
  };

  const deleteUser = async (ID) => {
    const token = Cookies.get("mcToken");
    if (!token) {
      setToastMessage("Token not found. Please log in again.");
      setToastType("error");
      return;
    }
  
    try {
      const response = await fetch(`${apiUrl}/users/users/${ID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },       
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user.");
      }
  
      const data = await response.json();
  
      if (data.message === "User deleted successfully!") {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== ID));
        setToastMessage("Vartotojas sėkmingai ištrintas!");
        setToastType("success");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      setToastMessage("Klaida trinant vartotoją.");
      setToastType("error");
    }
  };

  const closeToast = () => {
    setToastMessage("");
    setToastType("");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-32">
      <h1 className="text-[35px] text-neutral-900 font-bold mt-8 mb-8 motion-preset-compress">Vartotojai</h1>
      <div className="bg-gradient-to-b from-white to-yellow-200 w-full flex items-center justify-between px-10">
        <div className="flex flex-col motion-preset-compress bg-gradient-to-b from-white to-yellow-200 p-4 mb-5 shadow-md rounded-lg relative cursor-pointer">
          <div className="flex items-center justify-center">
            <Link href="/admin/addUser" className="text-neutral-900 text-xl font-semibold cursor-pointer">Pridėti vartotoją</Link>
          </div>
        </div>
        <AdminBar />
      </div>
      <div className=" bg-yellow-200 flex justify-center items-center w-full">
        <p className="text-neutral-900 mb-4">Vartotojų kiekis: {users.length}</p>
      </div>
      <div className="w-full overflow-x-auto px-10 bg-gradient-to-b from-yellow-200 to-white">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner /></div>) : (
          <table className="min-w-full table-auto border-collapse border border-neutral-900 text-left rounded-lg shadow-2xl mb-12">
            <thead className="bg-yellow-200">
              <tr>
                <th className="p-2 border border-neutral-900 text-sm font-semibold text-neutral-900 text-center">ID</th>
                <th className="p-2 border border-neutral-900 text-sm font-semibold text-neutral-900 text-center">Vartotojas</th>
                <th className="p-2 border border-neutral-900 text-sm font-semibold text-neutral-900 text-center">Rolė</th>
                <th className="p-2 border border-neutral-900 text-sm font-semibold text-neutral-900 text-center">Ištrinti</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="even:bg-gray-100">
                  <td className="p-2 border border-neutral-900 text-sm text-neutral-900 text-center">{user._id}</td>
                  <td className="p-2 border border-neutral-900 text-sm text-neutral-900 text-center">{user.nickname}</td>
                  <td className="p-2 border border-neutral-900 text-sm text-neutral-900 text-center">{user.role}</td>
                  <td className="p-2 border border-neutral-900 text-sm text-neutral-900 text-center"><button onClick={() => handleDelete(user._id, user.nickname)} className="bg-gradient-to-b from-white to-red-500 px-5 py-2 rounded-md m-5 shadow-[4px_4px_0_black] active:translate-x-1 active:translate-y-1 active:shadow-[0_0_0_black] transition-all duration-200 text-neutral-900">Ištrinti</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {toastMessage && (<Toast message={toastMessage} type={toastType} onClose={closeToast} />)}
    </div>
  );
};

export default Users;
