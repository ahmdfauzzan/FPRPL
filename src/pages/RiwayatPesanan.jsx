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
            // Filter out any null values
            const validRiwayat = response.data
              ? Object.keys(response.data).reduce((orders, orderId) => {
                  if (response.data[orderId]) {
                    orders[orderId] = response.data[orderId];
                  }
                  return orders;
                }, {})
              : {};
            setRiwayat(validRiwayat);
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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-purple-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-purple-50 min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto py-6">
        <h2 className="text-3xl font-semibold text-purple-700 mb-6 text-center">Riwayat Pesanan</h2>
        <div className="space-y-6">
          {Object.keys(riwayat).length === 0 ? (
            <div className="text-center text-purple-500">Tidak ada riwayat pesanan.</div>
          ) : (
            Object.keys(riwayat).map((orderId) => {
              const order = riwayat[orderId];
              if (!order) return null; // Skip over null or undefined orders
              return (
                <div key={orderId} className="p-6 border border-purple-200 bg-white rounded-lg shadow-lg">
                  <h3 className="font-semibold text-purple-600 mb-4">Pesanan ID: {orderId}</h3>
                  {Object.keys(order).map((itemId) => {
                    const item = order[itemId];
                    if (!item || !item.product) return null; // Skip over null or undefined items
                    return (
                      <div key={itemId} className="flex items-center space-x-4 mb-4 last:mb-0">
                        <img className="w-24 h-24 object-cover rounded" src={`assets/images/${item.product.category.nama.toLowerCase()}/${item.product.gambar}`} alt={item.product.nama} />
                        <div className="flex-1">
                          <div className="font-medium text-purple-800">{item.product.nama}</div>
                          <div className="text-sm text-purple-500">Jumlah: {item.jumlah}</div>
                          <div className="text-sm text-purple-600">Total: {(item.product.harga * item.jumlah).toLocaleString()} IDR</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default RiwayatPesanan;
