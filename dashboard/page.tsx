"use client"; // Nécessaire pour Next.js App Router

import { useState } from 'react';
import {
  IconHome,
  IconLogout,
  IconSwitchHorizontal,
  IconShoppingCart,
  IconBox,
  IconUsers,
  IconMessageCircle,
  IconChartBar,
  IconSettings,
  IconUserCircle,
  IconCreditCard,
  IconMenu2
} from '@tabler/icons-react';
import { PiPlantFill } from "react-icons/pi";

// Importation des composants
import Home from './Home/page';
import ProfilVendeur from './ProfilVendeur/page';
import Produits from './Produits/page';
import Commandes from './Commandes/page';
import Clients from './Clients/page';
import Statistiques from './Statistiques/page';
import Messages from './Messages/page';
import Parametre from './Parametre/page';
import Paiements from './Paiements/page';

// Tableau des liens avec des références aux composants
const data = [
  { component: Home, label: 'Tableau de bord', icon: IconHome },
  { component: ProfilVendeur, label: 'Profil Utilisateur', icon: IconUserCircle },
  { component: Produits, label: 'Gestion des Produits', icon: IconBox },
  { component: Commandes, label: 'Commandes', icon: IconShoppingCart },
  { component: Clients, label: 'Gestion des Clients', icon: IconUsers },
  { component: Statistiques, label: 'Statistique', icon: IconChartBar },
  { component: Messages, label: 'Messages & Notifications', icon: IconMessageCircle },
  { component: Parametre, label: 'Paramètres', icon: IconSettings },
  { component: Paiements, label: 'Paiements', icon: IconCreditCard }
];

function NavbarSimpleRefined() {
  const [active, setActive] = useState('Tableau de bord');
  const [activeComponent, setActiveComponent] = useState(<Home />); // ✅ Stocke directement un élément JSX
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const links = data.map((item) => (
    <a
      key={item.label}
      href="#"
      className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 ${item.label === active ? 'bg-gradient-to-r from-indigo-700 to-indigo-800 text-white' : 'text-gray-200'}`}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        setActiveComponent(<item.component />);
        setIsMobileMenuOpen(false); // Close mobile menu after selection
      }}
    >
      <item.icon className="text-2xl" stroke={1.5} />
      <span className="font-medium">{item.label}</span>
    </a>
  ));
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 to-purple-800 text-white">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 rounded-lg"
      >
        <IconMenu2 className="h-6 w-6 text-white" />
      </button>

      {/* Navigation Sidebar */}
      <nav className={`
        w-72 bg-gradient-to-t from-blue-900 to-purple-700 py-6 px-5 flex flex-col justify-between 
        border-r-4 border-gray-600 shadow-2xl fixed top-0 left-0 bottom-0 z-40 transition-transform duration-300
        md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          <div className="flex justify-start items-center mb-5 mx-auto ml-8">
            <h4 className="font-extrabold text-3xl tracking-tight text-yellow-300 mr-2">LUXE</h4>
            <PiPlantFill className="text-3xl text-white transform rotate-45" />
          </div>

          <div className="space-y-2">
            {links}
          </div>
        </div>

        <div className="mt-2 space-y-2">
          <hr className="border-t border-white" />
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-500 transition duration-200 ease-in-out rounded-lg"
            onClick={(event) => event.preventDefault()}
          >
            <IconSwitchHorizontal className="text-xl" stroke={1.5} />
            <span className="font-medium">Changer de compte</span>
          </a>

          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-500 transition duration-200 ease-in-out rounded-lg"
            onClick={(event) => event.preventDefault()}
          >
            <IconLogout className="text-xl" stroke={1.5} />
            <span className="font-medium">Déconnexion</span>
          </a>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <section className="flex-1 px-4 py-4 overflow-y-auto bg-gray-50 rounded-xl shadow-xl md:ml-72 transition-all duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto pt-16 md:pt-4">
          {activeComponent}
        </div>
      </section>
    </div>
  );
}

export default NavbarSimpleRefined;
