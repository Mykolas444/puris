"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import AdminBar from "@/app/components/AdminBar";
import Toast from "@/app/components/Toast";
import Spinner from "@/app/components/Spinner";
import Cookies from "js-cookie";
import { checkCookiesAndRedirectPages } from "@/app/utils/loginProtection";

const Messages = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [messages, setMessages] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();
    checkCookiesAndRedirectPages();
    // Retrieve the token
    const token = Cookies.get("mcToken");
  
    if (!token) {
      console.error("Token not found. Please log in again.");
      setLoading(false); // Set loading to false if token is not found
      return;
    }
  
    // Fetch all messages from the API with token authorization
    fetch(`${apiUrl}/messages`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the Authorization header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setMessages(data.data.messages);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [apiUrl]);
  

// Delete message
const handleDelete = async (ID, email) => {
  const isConfirmed = window.confirm(`Ar tikrai norite ištrinti žinutę iš ${email}?`);
  if (!isConfirmed) {
    return;
  }

  try {
    // Retrieve the token
    const token = Cookies.get("mcToken");
    if (!token) {
      setToast({ message: "Autorizacijos nepavyko. Prašome prisijungti iš naujo.", type: "error" });
      return;
    }

    // Make the DELETE request with token
    const response = await fetch(`${apiUrl}/messages/delete/${ID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      // Update the state and show success toast
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== ID)
      );
      setToast({ message: `Žinutė ištrinta iš ${email}.`, type: "success" });
    } else {
      // Handle error response
      throw new Error("Klaida");
    }
  } catch (error) {
    // Show error toast
    setToast({ message: `Klaida. Žinutė nebuvo ištrinta`, type: "error" });
  }
};
  const handleExportExcel = async () => {
    try {
      const token = Cookies.get("mcToken");
      if (!token) {
        setToast({ message: "Autorizacijos nepavyko. Prašome prisijungti iš naujo.", type: "error" });
        return;
      }

      // Fetch the Excel file from the API
      const response = await fetch(`${apiUrl}/messages/export-messages`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the Excel file.");
      }

      // Convert the response to a Blob
      const blob = await response.blob();

      // Create a URL for the Blob and trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "messages.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setToast({ message: "Failas sėkmingai eksportuotas.", type: "success" });
    } catch (error) {
      console.error(error);
      setToast({ message: "Nepavyko eksportuoti failo.", type: "error" });
    }
  };

  const handleToastClose = () => { setToast({ message: "", type: "" }); };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-32">
      {toast.message && <Toast message={toast.message} type={toast.type} onClose={handleToastClose} />}
      <h1 className="text-[35px] text-neutral-900 font-bold mt-8 mb-8 motion-preset-compress">
        Žinutės
      </h1>
      <div className="bg-gradient-to-b from-white to-yellow-200 w-full flex items-center justify-between px-10">
      <div
          className="flex flex-col motion-preset-compress bg-gradient-to-b from-white to-yellow-200 p-4 mb-5 shadow-md rounded-lg relative cursor-pointer"
          onClick={handleExportExcel}
        >
          <p className="text-neutral-900 text-xl font-semibold cursor-pointer">Eksportuoti excel</p>
        </div>
        <AdminBar />
      </div>
      <div className=" bg-yellow-200 flex justify-center items-center w-full">
        <p className="text-neutral-900 mb-4">Žinučių kiekis: {messages.length}</p>
      </div>
      <div className="w-full overflow-x-auto px-10 bg-gradient-to-b from-yellow-200 to-white">
        {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-neutral-900 text-left rounded-lg shadow-2xl mb-12">
            <thead className="bg-yellow-200">
              <tr>
                <th className="p-2 border border-neutral-900 text-sm font-semibold text-neutral-900 text-center">
                  Įmonė
                </th>
                <th className="p-2 border border-neutral-900 text-sm font-semibold text-neutral-900 text-center">
                  El. paštas
                </th>
                <th className="p-2 border border-neutral-900 text-sm font-semibold text-neutral-900 text-center">
                  Žinutė
                </th>
                <th className="p-2 border border-neutral-900 text-sm font-semibold text-neutral-900 text-center">
                  Ištrinti
                </th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message._id} className="even:bg-gray-100">
                  <td className="p-2 border border-neutral-900 text-sm text-neutral-900 text-center">
                    {message.company}
                  </td>
                  <td className="p-2 border border-neutral-900 text-sm text-neutral-900 text-center">
                    {message.email}
                  </td>
                  <td className="p-2 border border-neutral-900 text-sm text-neutral-900 text-center">
                    {message.message}
                  </td>
                  <td className="p-2 border border-neutral-900 text-sm text-neutral-900 text-center">
                    <button
                      onClick={() => handleDelete(message._id, message.email)}
                      className="bg-gradient-to-b from-white to-red-500 px-5 py-2 rounded-md m-5 shadow-[4px_4px_0_black] active:translate-x-1 active:translate-y-1 active:shadow-[0_0_0_black] transition-all duration-200 text-neutral-900"
                    >
                      Ištrinti
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  ); 
};

export default Messages;
