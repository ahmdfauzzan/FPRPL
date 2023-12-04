import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListMenu } from "../utils/menu";
import { Header } from "../assets/components/Header";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Import signOut dari firebase/auth
import app from "./firebase"; // Asumsikan ini adalah path yang benar ke konfigurasi Firebase Anda

export default function Home() {
  const [menus, setMenus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [user, setUser] = useState(null); // State untuk menyimpan user yang login
  const navigate = useNavigate();
  const auth = getAuth(app);

  // Listener untuk status autentikasi
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Simpan user ke dalam state
      if (!currentUser) {
        navigate("/login"); // Redirect ke halaman login jika tidak ada user yang login
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, [auth, navigate]);

  // Fetch menu dari server
  useEffect(() => {
    ListMenu()
      .then((result) => {
        setMenus(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Filter menu berdasarkan kategori
  const filteredMenus = selectedCategory ? menus.filter((menu) => menu.category.nama === selectedCategory) : menus;

  // Fungsi untuk menambahkan item ke keranjang
  const addToCart = (menu) => {
    if (!user) {
      navigate("/login");
      return;
    }
  
    const cartUrl = `https://finalrpl-50ec8-default-rtdb.asia-southeast1.firebasedatabase.app/keranjangs/${user.uid}.json`;
  
    axios
      .get(cartUrl)
      .then((response) => {
        // Pastikan response.data bukan null dan merupakan objek
        const currentCart = response.data && typeof response.data === 'object' ? response.data : {};
        if (currentCart[menu.id]) {
          // Pastikan item tidak null sebelum mengupdate
          currentCart[menu.id].jumlah = (currentCart[menu.id].jumlah || 0) + 1;
          currentCart[menu.id].total_harga = (currentCart[menu.id].total_harga || 0) + menu.harga;
        } else {
          currentCart[menu.id] = {
            jumlah: 1,
            total_harga: menu.harga,
            product: menu,
          };
        }
  
        return axios.put(cartUrl, currentCart);
      })
      .then(() => {
        navigate("/keranjang");
      })
      .catch((error) => {
        console.error("Failed to update cart", error);
      });
  };
  

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <h2 className="text-center text-3xl font-semibold mb-6 mt-2">Daftar Menu</h2>
      <div className="text-center mb-4">
        <label htmlFor="categoryFilter">Pilih kategori menu: </label>
        <select id="categoryFilter" onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory} className="p-2">
          <option value="">Semua Kategori</option>
          <option value="Makanan">Makanan</option>
          <option value="Minuman">Minuman</option>
          <option value="Cemilan">Cemilan</option>
        </select>
      </div>
      <ul className="flex flex-wrap justify-center gap-6">
        {filteredMenus.map((menu) => (
          <li key={menu.id} className="w-1/3 p-4 bg-white shadow-md rounded-md text-center">
            {menu.nama} - {menu.harga}
            <img className="mx-auto max-w-full h-auto my-4" src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar} alt={menu.nama} />
            <button onClick={() => addToCart(menu)} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Tambah ke Keranjang
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
