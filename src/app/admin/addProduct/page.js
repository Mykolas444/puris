"use client";
import { useState, useEffect } from "react";
import Button from '@/app/components/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Cookies from "js-cookie";
import { checkCookiesAndRedirectPages } from "@/app/utils/loginProtection";
import Spinner from "@/app/components/Spinner";

const ProductsPage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    AOS.init();
    checkCookiesAndRedirectPages();
  }, []);

  // State for form data with nested structure
  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    properties1: {
      propertiesArticle1: "",
      propertiesSummary1: ""
    },
    properties2: {
      propertiesArticle2: "",
      propertiesSummary2: ""
    },
    properties3: {
      propertiesArticle3: "",
      propertiesSummary3: ""
    },
    properties4: {
      propertiesArticle4: "",
      propertiesSummary4: ""
    },
    properties5: {
      propertiesArticle5: "",
      propertiesSummary5: ""
    },
    properties6: {
      propertiesArticle6: "",
      propertiesSummary6: ""
    },
    specifications: {
      weight: "",
      dimensions: "",
      power: "",
      operating_temperature: "",
      relative_humidity: "",
      negative_ions: ""
    }
  });

  // State for images
  const [images, setImages] = useState({
    swiperImage1: null,
    swiperImage2: null,
    swiperImage3: null,
    swiperImage4: null,
    swiperImage5: null,
    swiperImage6: null,
    contentImage1: null,
    contentImage2: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle nested form data changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    const [section, field] = id.includes('.') ? id.split('.') : [id, null];

    if (field) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: value
      }));
    }
  };

  // Handle image inputs
  const handleImageChange = (e) => {
    const { id } = e.target;
    const file = e.target.files[0];
    if (file) {
      setImages(prev => ({
        ...prev,
        [id]: file
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = Cookies.get("mcToken");
    if (!token) {
      alert("Authorization failed. Please log in again.");
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append basic info
      formDataToSend.append("name", formData.name);
      formDataToSend.append("summary", formData.summary);

      // Append properties data
      for (let i = 1; i <= 6; i++) {
        formDataToSend.append(`propertiesArticle${i}`, formData[`properties${i}`][`propertiesArticle${i}`]);
        formDataToSend.append(`propertiesSummary${i}`, formData[`properties${i}`][`propertiesSummary${i}`]);
      }

      // Append specifications data - Modified to match backend expectations
      Object.entries(formData.specifications).forEach(([key, value]) => {
        formDataToSend.append(key, value); // Remove the 'specifications.' prefix
      });

      // Append image files
      Object.entries(images).forEach(([key, file]) => {
        if (file) {
          formDataToSend.append(key, file);
        }
      });

      const response = await fetch(`${apiUrl}/products/addProduct`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Product saved successfully:", result);
        alert("Product created successfully!");
        // Optional: Reset form after successful submission
        setFormData({
          name: "",
          summary: "",
          properties1: { propertiesArticle1: "", propertiesSummary1: "" },
          properties2: { propertiesArticle2: "", propertiesSummary2: "" },
          properties3: { propertiesArticle3: "", propertiesSummary3: "" },
          properties4: { propertiesArticle4: "", propertiesSummary4: "" },
          properties5: { propertiesArticle5: "", propertiesSummary5: "" },
          properties6: { propertiesArticle6: "", propertiesSummary6: "" },
          specifications: {
            weight: "",
            dimensions: "",
            power: "",
            operating_temperature: "",
            relative_humidity: "",
            negative_ions: ""
          }
        });
        setImages({
          swiperImage1: null,
          swiperImage2: null,
          swiperImage3: null,
          swiperImage4: null,
          swiperImage5: null,
          swiperImage6: null,
          contentImage1: null,
          contentImage2: null,
        });
      } else {
        const errorData = await response.json();
        console.error("Error creating product:", errorData);
        alert("Error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-32 px-4">
      <h1 className="text-[35px] text-neutral-900 font-bold mt-8 mb-8 motion-preset-compress">
        Add Product
      </h1>
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-4xl">
        <div
          className="bg-gradient-to-b from-yellow-200 to-white flex flex-col justify-center items-center w-full p-6 rounded-lg shadow-md"
          data-aos="zoom-in-down"
        >
          <h2 className="text-xl font-semibold mb-4 text-neutral-900">
            Add Product
          </h2>
          <form className="w-full" onSubmit={handleSubmit}>
            {/* Swiper Images */}
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div className="mb-4" key={`swiper${num}`}>
                <label htmlFor={`swiperImage${num}`} className="block text-sm font-medium text-neutral-900">
                  Swiper Image {num}
                </label>
                <input
                  type="file"
                  id={`swiperImage${num}`}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-neutral-900 mt-1 p-4 block w-full bg-white"
                />
              </div>
            ))}

            {/* Basic Info */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-neutral-900">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="text-neutral-900 mt-1 p-4 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="summary" className="block text-sm font-medium text-neutral-900">
                Product Summary
              </label>
              <textarea
                id="summary"
                value={formData.summary}
                onChange={handleChange}
                className="text-neutral-900 mt-1 p-4 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            {/* Properties */}
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={`properties${num}`} className="mb-6 border-t pt-4">
                <h3 className="text-lg font-medium mb-3">Properties {num}</h3>
                <div className="mb-4">
                  <label htmlFor={`properties${num}.propertiesArticle${num}`} className="block text-sm font-medium text-neutral-900">
                    Properties Article {num}
                  </label>
                  <textarea
                    id={`properties${num}.propertiesArticle${num}`}
                    value={formData[`properties${num}`][`propertiesArticle${num}`]}
                    onChange={handleChange}
                    className="text-neutral-900 mt-1 p-4 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor={`properties${num}.propertiesSummary${num}`} className="block text-sm font-medium text-neutral-900">
                    Properties Summary {num}
                  </label>
                  <input
                    type="text"
                    id={`properties${num}.propertiesSummary${num}`}
                    value={formData[`properties${num}`][`propertiesSummary${num}`]}
                    onChange={handleChange}
                    className="text-neutral-900 mt-1 p-4 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
            ))}

            {/* Content Images */}
            {[1, 2].map((num) => (
              <div className="mb-4" key={`content${num}`}>
                <label htmlFor={`contentImage${num}`} className="block text-sm font-medium text-neutral-900">
                  Content Image {num}
                </label>
                <input
                  type="file"
                  id={`contentImage${num}`}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-neutral-900 mt-1 p-4 block w-full bg-white"
                />
              </div>
            ))}

            {/* Specifications */}
            <div className="mb-6 border-t pt-4">
              <h3 className="text-lg font-medium mb-3">Specifications</h3>
              {Object.keys(formData.specifications).map((spec) => (
                <div className="mb-4" key={spec}>
                  <label htmlFor={`specifications.${spec}`} className="block text-sm font-medium text-neutral-900">
                    {spec.replace(/_/g, ' ').charAt(0).toUpperCase() + spec.replace(/_/g, ' ').slice(1)}
                  </label>
                  <input
                    type="text"
                    id={`specifications.${spec}`}
                    value={formData.specifications[spec]}
                    onChange={handleChange}
                    className="text-neutral-900 mt-1 p-4 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              ))}
            </div>

            {isLoading ? <Spinner /> : 
              <Button 
                type="submit" 
                className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600" 
                disabled={isLoading}
              >
                Save
              </Button>
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;