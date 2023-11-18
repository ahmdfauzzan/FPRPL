import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebase";
import { Header } from "../assets/components/Header";

export const RiwayatPesanan = () => {
  const [riwayat, setRiwayat] = useState({});
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const riwayatUrl = `https://finalrpl-50ec8-default-rtdb.asia-southeast1.firebasedatabase.app/pesanans/${user.uid}.json`;
        axios
          .get(riwayatUrl)
          .then((response) => {
            setRiwayat(response.data || {});
            setLoading(false);
          })
          .catch((error) => {
            console.error("Gagal mengambil riwayat pesanan", error);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Header />
      <h2 className="text-2xl font-semibold mb-4">Riwayat Pesanan</h2>
      <div>
        {Object.keys(riwayat).map((orderId) => (
          <div key={orderId} className="mb-4 p-4 border border-gray-200 rounded">
            <h3 className="font-semibold">Pesanan ID: {orderId}</h3>
            <ul>
              {Object.keys(riwayat[orderId]).map((itemId) => (
                <li key={itemId}>
                  {riwayat[orderId][itemId].product.nama} - Jumlah: {riwayat[orderId][itemId].jumlah}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiwayatPesanan;
