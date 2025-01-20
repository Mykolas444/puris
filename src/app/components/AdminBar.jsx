"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AdminBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("Vartotojo vardas");
  const router = useRouter();

  useEffect(() => {
    const mcUser = Cookies.get("mcUser");
    if (mcUser) {
      try {
        const decodedUser = decodeURIComponent(mcUser); 
        const cleanedUser = decodedUser.replace(/^"|"$/g, "");
        setUsername(cleanedUser);
      } catch (error) {
        console.error("Error processing cookie:", error);
      }
    }
  }, []);

  const toggleDropdown = () => {setDropdownOpen(!isDropdownOpen);};
  const handleLinkClick = () => {setDropdownOpen(false);};

  const handleLogout = () => {
    // Clear cookies
    Cookies.remove("mcUser");
    Cookies.remove("mcToken");
    Cookies.remove("mcID");
    // Redirect to login page
    router.push("/admin/login");
  };

  return (
    <div className="flex flex-col motion-preset-compress bg-gradient-to-b from-white to-yellow-200 p-4 mb-5 shadow-md rounded-lg relative cursor-pointer" onClick={toggleDropdown}>
      <div className="flex items-center justify-center">
        <h1 className="text-neutral-900 text-xl font-semibold cursor-pointer">{username}</h1>
        <img src={isDropdownOpen ? "/arrowUp.svg" : "/arrowDown.svg"} alt="Toggle Dropdown" className="ml-2 w-4 h-4" />
      </div>
      {isDropdownOpen && (
        <ul className="mt-2 top-14 left-0 w-full absolute bg-white shadow-lg z-10 rounded-lg bg-gradient-to-b from-yellow-200 to-white">
          <li onClick={handleLinkClick}><Link href="/admin/productsTable" passHref><h1 className="w-full text-center py-2 text-neutral-900">Produktai</h1></Link></li>
          <li onClick={handleLinkClick}><Link href="/admin/messages" passHref><h1 className="w-full text-center py-2 text-neutral-900">Žinutės</h1></Link></li>
          <li onClick={handleLinkClick}><Link href="/admin/users" passHref><h1 className="w-full text-center py-2 text-neutral-900">Vartotojai</h1></Link></li>
          <li onClick={handleLogout}><h1 className="w-full text-center py-2 text-neutral-900 cursor-pointer">Atsijungti</h1></li>
        </ul>
      )}
    </div>
  );
};

export default AdminBar;
