import Cookies from "js-cookie";

const checkTokenValidity = async (token) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/users/check-token`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return response.ok && data.success;
  } catch (error) {
    return false;
  }
};

const clearCookies = () => {
  Cookies.remove("mcToken");
  Cookies.remove("mcUser");
  Cookies.remove("mcID");
};

export const checkCookiesAndRedirectLogin = async () => {
  const token = Cookies.get("mcToken");
  const user = Cookies.get("mcUser");
  const userId = Cookies.get("mcID");
  // Check if all three cookies are present
  if (token && user && userId) {
    // Validate the token
    const isValid = await checkTokenValidity(token);
    if (isValid) {
      // If token is valid, redirect to admin/messages
      window.location.href = "/admin/messages";
    } else {
      // If token is not valid, clear cookies
      clearCookies();
      window.location.href = "/admin/login";
    }
  } else {
    // If any cookie is missing, clear cookies
    clearCookies();
  }
};

export const checkCookiesAndRedirectPages = async () => {
  const token = Cookies.get("mcToken");
  const user = Cookies.get("mcUser");
  const userId = Cookies.get("mcID");
  // If any cookie is missing, clear cookies and redirect to login
  if (!token || !user || !userId) {
    clearCookies();
    window.location.href = "/admin/login";
    return;
  }
  // If all cookies exist, validate the token
  const isValid = await checkTokenValidity(token);
  if (!isValid) { clearCookies();}
};
