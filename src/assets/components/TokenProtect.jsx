import React, { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const TokenProtect = ({ children }) => {
  const navigate = useNavigate();
  const alertShownRef = useRef(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token && !alertShownRef.current) {
      alert("anda belum login");
      alertShownRef.current = true;
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default TokenProtect;
