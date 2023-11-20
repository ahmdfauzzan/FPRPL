import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import library Cookies
import { getAuth, signOut } from "firebase/auth";

const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Keranjang", href: "/keranjang", current: false },
  { name: "Riwayat", href: "/riwayat", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Header = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [userPhotoURL, setUserPhotoURL] = useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb");
  const handleLogout = () => {
    // Hapus token dari cookies
    Cookies.remove("userToken");
    Cookies.remove("userUid");
    Cookies.remove("photoURL");
    Cookies.remove("email");
    Cookies.remove("fullName");
    // Logout pengguna
    signOut(auth)
      .then(() => {
        // Redirect ke halaman login setelah logout
        navigate("/login");
      })
      .catch((error) => {
        console.error("Failed to logout", error);
      });
  };
  const location = useLocation(); // Get the current location from React Router

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // Mengambil URL foto profil pengguna dari properti photoURL setelah berhasil login
      const photoURL = user.photoURL || ""; // Pastikan photoURL tidak null/undefined
      setUserPhotoURL(photoURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb");
    }
  }, [auth]);
  return (
    <>
      <Disclosure as="nav" className="bg-slate-600">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-0">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <Link to="/" className="flex flex-shrink-0 items-center">
                    <img className="h-8 w-auto" src="amikom.png" alt="Your Company" />
                  </Link>
                  <div className="hidden sm:ml-6 sm:w-full sm:justify-center sm:flex lg:w-full lg:justify-center lg:flex">
                    <div className="flex space-x-4 ">
                      {navigation.map((item) => (
                        <Link // Use Link instead of <a>
                          key={item.name}
                          to={item.href} // Use the 'to' prop from React Router
                          className={classNames(
                            location.pathname === item.href // Check if the current location matches the item's href
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src={userPhotoURL} alt="User Profile" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link to="/profile" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a href="#" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button onClick={handleLogout} className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "block rounded-md px-3 py-2 text-base font-medium")}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};
