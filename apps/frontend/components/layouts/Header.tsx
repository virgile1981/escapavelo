"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, Phone, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isRootPage = usePathname() === '/';


  return (
    <div className="relative text-white w-full top-0 z-50 bg-center">
      <div className={`w-full px-4 py-3 grid grid-cols-[1fr_auto] gap-4 z-1 ${!isRootPage && 'bg-green-900'} ${isRootPage && 'absolute'}`}>

        {/* Desktop logo */}
        <div className="flex items-center justify-between px-8">
          <Link href="/" className="hidden md:flex items-center space-x-2">
            <img src="/assets/logo.png" className="h-14 w-14" alt="Logo" />
            <span className="text-xl font-bold">Escapavélo</span>
          </Link>
        </div>

        {/* Desktop icons */}
        <div className="hidden md:inline-flex space-x-1 items-center">
          <a
            href="https://www.instagram.com/escapavelo"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-1 hover:shadow-lg transition-all transform hover:scale-110"
          >
            <Instagram className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
          </a>
          <a
            href="https://www.facebook.com/carnetdespossibles/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-1 hover:shadow-lg transition-all transform hover:scale-110"
          >
            <Facebook className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
          </a>
          <a
            href="tel:+33782232016"
            className="flex items-center px-2 py-1 text-white font-medium hover:underline border border-white rounded-full mx-auto"
          >
            <Phone className="w-4 h-4 mr-2" />
            +33 7 82 23 20 16
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-white/80 focus:outline-none"
          >
            <div className="flex gap-2 items-center">
              MENU
              {!isOpen ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
            </div>
          </button>
        </div>


        {/* Desktop navigation */}
        {isRootPage && (
          <div className="flex justify-center items-center flex-col col-span-2 pt-20">
            <div className="flex flex-col">
              <div className="flex justify-center">
                <h1 className="text-5xl md:text-7xl mb-6 text-white tracking-wide drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                  Escapavélo
                </h1>
              </div>
              <div>
                <h2 className="invisible md:visible text-1xl md:text-3xl mb-6 font-bold text-white tracking-wide drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                  Le voyage à vélo en toute sérénité
                </h2>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/destination" className="text-white font-medium hover:text-white/80">
                Destinations
              </Link>
              <Link href="/blog" className="text-white font-medium hover:text-white/80">
                Blog
              </Link>
            </nav>
          </div>)}
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed left-0 right-0 bottom-0 top-20 bg-green-900 z-50 overflow-y-auto min-h-screen w-screen"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-800"
            >
              Accueil
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-800"
            >
              Blog
            </Link>
          </div>
        </div>
      )}

      {/* Background image */}
      {isRootPage && (
        <div className="relative h-[110vh] overflow-hidden">
          <div className="absolute inset-0 -top-[7rem]">
            <img
              src="/assets/full-quercy-cartoon.webp"
              alt="vue du quercy à vélo"
              className="w-full h-full object-cover object-[25%_50%]"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.4)_0%,rgba(20,83,45,0.1)_80%,rgba(237,230,219,1.0)_100%)]"></div>
        </div>
      )
      }
    </div>
  );
}
