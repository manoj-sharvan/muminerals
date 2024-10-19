/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../provider/ThemeProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div>
      <header>
        <nav
          className={`${
            theme === "light" ? "bg-white border-gray-200" : "bg-gray-800"
          } px-4 lg:px-6 py-6`}
        >
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a
              href=""
              onClick={() => navigate("/")}
              className="flex items-center"
            >
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                onClick={() => navigate("/")}
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-lg sm:text-xl font-semibold whitespace-nowrap dark:text-white">
                Muthurasu Minerals
              </span>
            </a>
            <div className="flex items-center lg:order-2">
              <img
                id="avatarButton"
                type="button"
                data-dropdown-toggle="dropdownId"
                onClick={handleDropdownToggle}
                className="w-10 h-10 rounded-full cursor-pointer max-lg:hidden block"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="User dropdown"
              />

              {isDropdownOpen && (
                <div
                  id="dropdownId"
                  className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-12 right-20 mt-4"
                  ref={dropdownRef}
                >
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>Bonnie Green</div>
                    <div className="font-medium truncate">
                      name@flowbite.com
                    </div>
                  </div>
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownId"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                          navigate("/settings");
                          setIsDropdownOpen(false);
                        }}
                      >
                        Settings
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={() => navigate("/signout")}
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              )}

              <button
                onClick={handleMenuToggle}
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded={isMenuOpen ? "true" : "false"}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
            <div
              className={`${
                isMenuOpen ? "block" : "hidden"
              } justify-between items-center w-full lg:flex lg:w-auto`}
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row  lg:mt-0  lg:gap-24 max-md:gap-16 max-sm:gap-2">
                <li>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    onClick={() => {
                      navigate("/invoice");
                      setIsMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Invoice
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    onClick={() => {
                      navigate("/products");
                      setIsMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    onClick={() => {
                      navigate("/buyer");
                      setIsMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Buyer
                  </a>
                </li>
                {false && (
                  <button
                    onClick={toggleTheme}
                    className="text-gray-500 dark:text-gray-400"
                  >
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                  </button>
                )}

                <li className="max-lg:block hidden">
                  <div className="flex gap-1 items-center ml-3 ">
                    <img
                      id="avatarButton"
                      type="button"
                      onClick={handleDropdownToggle}
                      className="w-10 h-10 rounded-full cursor-pointer"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="User dropdown"
                    />
                    <div className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                      <div>Bonnie Green</div>
                      <div className="font-medium truncate">
                        name@flowbite.com
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
