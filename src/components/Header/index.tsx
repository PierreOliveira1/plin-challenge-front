"use client";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-black py-4 fixed top-0 left-0 w-full">
      <div className="container mx-auto flex flex-col justify-between items-center md:flex-row">
        <Link href="/">
          <span className="text-purple-400 text-2xl font-bold cursor-pointer transition-all duration-300 hover:text-purple-500">
            Plin Challange
          </span>
        </Link>
        <nav className="flex flex-row space-x-4">
          <Link href="/">
            <span
              className="text-white font-semibold hover:text-amber-400 transition-all duration-300 cursor-pointer"
              onClick={toggleMenu}
            >
              Clima
            </span>
          </Link>
          <Link href="/cep">
            <span
              className="text-white font-semibold hover:text-red-400 transition-all duration-300 cursor-pointer"
              onClick={toggleMenu}
            >
              Buscar CEP
            </span>
          </Link>
          <Link href="/contato">
            <span
              className="text-white font-semibold hover:text-blue-400 transition-all duration-300 cursor-pointer"
              onClick={toggleMenu}
            >
              Contato
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
