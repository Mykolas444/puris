"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import AdminBar from "@/app/components/AdminBar";
import Button from "@/app/components/Button";
import Link from "next/link";
import Cookies from "js-cookie";
import { checkCookiesAndRedirectPages } from "@/app/utils/loginProtection";

const ProductsTable = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [products, setProducts] = useState([]); // State to store products
  const [isLoading, setIsLoading] = useState(true); // State to manage loading

  useEffect(() => {
    AOS.init();
    checkCookiesAndRedirectPages();

    // Fetch products from API
    const fetchProducts = async () => {
      const token = Cookies.get("mcToken");
      if (!token) {
        alert("Authorization failed. Please log in again.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/products`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data.data.products); // Set the fetched products
        } else {
          console.error("Failed to fetch products");
          alert("Failed to fetch products.");
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  return (
    <div className="flex flex-col items-center justify-center w-full mt-32">
      <h1 className="text-[35px] text-neutral-900 font-bold mt-8 mb-8 motion-preset-compress">
        Produktai
      </h1>
      <div className="bg-gradient-to-b from-white to-yellow-200 w-full flex items-center justify-between px-10 ">
        <div className="flex flex-col motion-preset-compress bg-gradient-to-b from-white to-yellow-200 p-4 mb-5 shadow-md rounded-lg relative cursor-pointer">
          <Link
            href="/admin/addProduct"
            className="text-neutral-900 text-xl font-semibold cursor-pointer"
          >
            Pridėti produktą
          </Link>
        </div>
        <AdminBar />
      </div>

      <div className="w-full overflow-x-auto px-10 bg-gradient-to-b from-yellow-200 to-white">
        {isLoading ? (
          <p className="text-center text-neutral-900">Loading...</p>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-neutral-900 text-left rounded-lg shadow-2xl mb-12">
            <thead className="bg-yellow-200">
              <tr>
                <th className="p-2 border border-neutral-900 text-sm font-semibold text-neutral-900 text-center">
                  ID
                </th>
                <th className="p-2 border border-neutral-900 text-sm font-semibold text-neutral-900 text-center">
                  Gamintojas
                </th>
                <th className="p-2 border border-neutral-900 text-sm font-semibold text-neutral-900 text-center">
                  Produktas
                </th>
                <th className="p-2 border border-neutral-900 text-sm font-semibold text-neutral-900 text-center">
                  Atnaujinti
                </th>
                <th className="p-2 border border-neutral-900 text-sm font-semibold text-neutral-900 text-center">
                  Ištrinti
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="even:bg-gray-100">
                  <td className="p-2 border border-neutral-900 text-sm text-neutral-900 text-center">
                    {product._id}
                  </td>
                  <td className="p-2 border border-neutral-900 text-sm text-neutral-900 text-center">
                    {product.properties}
                  </td>
                  <td className="p-2 border border-neutral-900 text-sm text-neutral-900 text-center">
                    {product.name}
                  </td>
                  <td className="p-2 border border-neutral-900 text-sm text-neutral-900 text-center">
                    <Button>Atnaujinti</Button>
                  </td>
                  <td className="p-2 border border-neutral-900 text-sm text-neutral-900 text-center">
                    <Button>Ištrinti</Button>
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

export default ProductsTable;
