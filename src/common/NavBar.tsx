import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { BrowserRouter, Link, NavLink, Route, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { Avatar, Dropdown, Navbar , Card, DropdownItem} from "flowbite-react";
import React, { createContext, useContext } from 'react';
import { useAuth } from "src/context/UserContext";
import { useLogout } from "app/useLogout";
import { useCurrency, CurrencyProvider } from "src/context/CurrencyContext"

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Dashboard', href: 'dashboard', current: false },
  { name: 'About', href: 'about', current: false },
  { name: 'Pong Game', href: 'ponggame', current: false },
  { name: 'Login', href: 'login', current: false },
  { name: 'Games', href: 'games', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const NavBar = (props:any) => {
  let navigate = useNavigate();
  //const { isLoggedIn, setIsLoggedIn, name, setName, email, setEmail } = props;
  const { isLoggedIn, name , setIsLoggedIn, setName, email, setEmail} = useAuth();
  const { currency } = useCurrency();
  const handleLogout = useLogout();
  const { profilePictureUrl } = useAuth();

  return (
    <Disclosure as="nav" className="bg-violet-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-fuschia-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavLink
                  to={`/`}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium"
                >
                  Home
                </NavLink>
                <NavLink
                  to={`dashboard`}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to={`about`}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium"
                >
                  About
                </NavLink>
                <NavLink
                  to={`ponggame`}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium"
                >
                  Pong Game
                </NavLink>
                <NavLink
                  to={`games`}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium"
                >
                  Games
                </NavLink>
                {!isLoggedIn && (
                  <NavLink
                    to={`login`}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium"
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </div>
            {
              // old way of navigating... may be helpful for games
              /* 
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            */
            }
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown if user is logged in*/}
            <div className="flex md:order-2">
              {isLoggedIn && (
                <div className="flex items-center space-x-4">
                  {/* Currency value */}
                  <span className="text-yellow-400 font-semibold">
                    Credits: {currency}
                  </span>
                  <Menu as="div" className="relative">
                    <MenuButton className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon aria-hidden="true" className="size-6" />
                    </MenuButton>

                    <MenuItems className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 focus:outline-hidden">
                      <MenuItem>
                        <div className="px-4 py-2 text-sm text-gray-700">
                          No new notifications
                        </div>
                      </MenuItem>

                      <div className="border-t border-gray-200 mt-2 pt-2 px-2">
                        <MenuItem>
                          <Link
                            to="/profile/alerts"
                            className="block w-full text-center px-4 py-2 text-sm text-white bg-violet-600 hover:bg-violet-700 rounded-md"
                          >
                            View All
                          </Link>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt="Profile"
                          src={
                            profilePictureUrl
                              ? `http://127.0.0.1:8000${profilePictureUrl}`
                              : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?..." // default
                          }
                          className="size-12 rounded-full object-cover" 
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      <MenuItem>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                        >
                          Your Profile
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to="/profile/account"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                        >
                          Settings
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          onClick={handleLogout}
                          to="/"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                        >
                          Log Out
                        </Link>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default NavBar;
