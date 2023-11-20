import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Header } from "../assets/components/Header";
import Cookies from "js-cookie"; // Import library Cookies

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [uploading, setUploading] = useState(false); // State untuk menampilkan status unggahan
  const auth = getAuth();
  const storage = getStorage();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const displayName = user.displayName;
      const userEmail = user.email;
      const userPhotoURL = user.photoURL;

      if (displayName) {
        setFullName(displayName);
        // Simpan nama lengkap ke dalam Cookies
        Cookies.set("fullName", displayName);
      }
      if (userEmail) {
        setEmail(userEmail);
        // Simpan email ke dalam Cookies
        Cookies.set("email", userEmail);
      }
      if (userPhotoURL) {
        setPhotoURL(userPhotoURL);
        // Simpan URL foto ke dalam Cookies
        Cookies.set("photoURL", userPhotoURL);
      }
    }
  }, [auth]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `profile_images/${file.name}`);
    setUploading(true);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref); // Update ini

      setPhotoURL(downloadURL);

      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, { photoURL: downloadURL });
        // Simpan URL foto ke dalam Cookies saat diperbarui
        Cookies.set("photoURL", downloadURL);
      }

      setUploading(false);
      // Tambahkan pesan sukses atau tindakan lanjutan setelah unggahan berhasil
    } catch (error) {
      console.error("Error uploading image: ", error);
      setUploading(false);
      // Tampilkan pesan kesalahan kepada pengguna jika unggahan gagal
    }
  };

  // Gunakan useEffect untuk memuat data dari Cookies saat komponen dimuat kembali
  useEffect(() => {
    const storedFullName = Cookies.get("fullName");
    const storedEmail = Cookies.get("email");
    const storedPhotoURL = Cookies.get("photoURL");

    if (storedFullName) {
      setFullName(storedFullName);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedPhotoURL) {
      setPhotoURL(storedPhotoURL);
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profil Pengguna</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4 flex items-center">
            <div className="flex-shrink-0 mr-4">
              {photoURL ? (
                <img className="h-12 w-12 rounded-full object-cover" src={photoURL} alt="Foto Profil" />
              ) : (
                <svg className="h-12 w-12 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center">{/* ... SVG icon */}</svg>
              )}
            </div>
            <div>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="profileImage" />
              <label htmlFor="profileImage" className="cursor-pointer text-indigo-600 hover:text-indigo-800">
                Unggah Foto Profil
              </label>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Nama Lengkap:</p>
            <p>{fullName}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Email:</p>
            <p>{email}</p>
          </div>
          {/* Informasi lainnya */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
