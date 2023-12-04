import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../assets/components/Header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebase"; // Pastikan ini adalah path yang benar ke file konfigurasi Firebase Anda
import { useNavigate } from "react-router-dom";

export const Keranjang = () => {
  const [keranjang, setKeranjang] = useState({});
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const navigate = useNavigate();

  // Handler untuk update kuantitas item di keranjang
  const handleQuantityChange = (itemId, delta) => {
    const item = keranjang[itemId];
    if (item) {
      const newQuantity = item.jumlah + delta;
      if (newQuantity > 0) {
        const updatedItem = { ...item, jumlah: newQuantity, total_harga: item.product.harga * newQuantity };
        setKeranjang({ ...keranjang, [itemId]: updatedItem });
        axios.put(`https://finalrpl-50ec8-default-rtdb.asia-southeast1.firebasedatabase.app/keranjangs/${auth.currentUser.uid}/${itemId}.json`, updatedItem);
      } else {
        removeItem(itemId);
      }
    }
  };

  // Handler untuk menghapus item dari keranjang
  const removeItem = (itemId) => {
    const updatedKeranjang = { ...keranjang };
    delete updatedKeranjang[itemId];
    setKeranjang(updatedKeranjang);
    axios.delete(`https://finalrpl-50ec8-default-rtdb.asia-southeast1.firebasedatabase.app/keranjangs/${auth.currentUser.uid}/${itemId}.json`);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const cartUrl = `https://finalrpl-50ec8-default-rtdb.asia-southeast1.firebasedatabase.app/keranjangs/${user.uid}.json`;
        axios
          .get(cartUrl)
          .then((response) => {
            // Filter out any null values
            const validItems = response.data
              ? Object.keys(response.data).reduce((items, key) => {
                  if (response.data[key]) {
                    items[key] = response.data[key];
                  }
                  return items;
                }, {})
              : {};
            setKeranjang(validItems);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Gagal mengambil data keranjang", error);
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

  const handleCreateOrder = () => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }

    const orderUrl = `https://finalrpl-50ec8-default-rtdb.asia-southeast1.firebasedatabase.app/pesanans/${auth.currentUser.uid}.json`;

    axios
      .post(orderUrl, keranjang)
      .then(() => {
        setKeranjang({}); // Kosongkan keranjang setelah berhasil membuat pesanan
        navigate("/riwayat"); // Navigasi ke halaman riwayat pesanan
      })
      .catch((error) => {
        console.error("Gagal membuat pesanan", error);
      });
  };

  const isKeranjangEmpty = Object.keys(keranjang).length === 0;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <h2 className="text-3xl font-semibold mb-6 mt-6 text-center">Keranjang</h2>
      {isKeranjangEmpty ? (
        <div className="text-center mt-10">Belum ada produk di keranjang</div>
      ) : (
        <div className="flex flex-col items-center mt-10 space-y-4">
          {Object.keys(keranjang).map((itemId) => {
            const item = keranjang[itemId];
            if (!item || !item.product) return null; // Skip over null or undefined items

            return (
              <div key={itemId} className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="w-full h-64">
                  <img className="w-full h-full object-cover" src={`/assets/images/${item.product.category.nama.toLowerCase()}/${item.product.gambar}`} alt={item.product.nama} />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.product.nama}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                      <button onClick={() => handleQuantityChange(itemId, -1)} className="text-sm font-semibold bg-gray-200 hover:bg-gray-300 rounded-l px-3 py-1">
                        -
                      </button>
                      <span className="text-sm px-4 py-1 border-t border-b border-gray-300">{keranjang[itemId]?.jumlah}</span>
                      <button onClick={() => handleQuantityChange(itemId, 1)} className="text-sm font-semibold bg-gray-200 hover:bg-gray-300 rounded-r px-3 py-1">
                        +
                      </button>
                    </div>
                    <span className="text-sm font-semibold">{(keranjang[itemId]?.jumlah || 0) * (keranjang[itemId]?.product?.harga || 0)} IDR</span>
                    <button onClick={() => removeItem(itemId)} className="text-red-500 hover:text-red-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <button onClick={handleCreateOrder} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Pesan Sekarang
          </button>
        </div>
      )}
    </div>
  );
};

export default Keranjang;
