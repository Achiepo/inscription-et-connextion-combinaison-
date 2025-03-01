"use client";

import { useState } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle, FaInfoCircle, FaFilter } from "react-icons/fa";

interface Paiement {
  id: number;
  name: string;
  email: string;
  amount: string;
  date: string;
  status: "succès" | "en attente" | "échec";
}

const paiementsData: Paiement[] = [
    { id: 1, name: "Sophie Lefevre", email: "sophie.lefevre@example.com", amount: "98 000 FCFA", date: "26/02/2025", status: "succès" },
    { id: 2, name: "David Moreau", email: "david.moreau@example.com", amount: "49 500 FCFA", date: "25/02/2025", status: "en attente" },
    { id: 3, name: "Nina Rousseau", email: "nina.rousseau@example.com", amount: "78 000 FCFA", date: "24/02/2025", status: "échec" },
    { id: 4, name: "Marc Lefevre", email: "marc.lefevre@example.com", amount: "131 950 FCFA", date: "23/02/2025", status: "succès" },
    { id: 5, name: "Eva Dumont", email: "eva.dumont@example.com", amount: "23 800 FCFA", date: "22/02/2025", status: "échec" },
  ];
  
  
const statusOptions = ["tout", "succès", "en attente", "échec"];

export default function Paiements() {
  const [payments, setPayments] = useState<Paiement[]>(paiementsData);
  const [filterStatus, setFilterStatus] = useState<string>("tout");

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
    if (status === "tout") {
      setPayments(paiementsData);
    } else {
      setPayments(paiementsData.filter((paiement) => paiement.status === status));
    }
  };

  const getStatusBadge = (status: "succès" | "en attente" | "échec") => {
    switch (status) {
      case "succès":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            <FaCheckCircle className="mr-1" />
            Réussi
          </span>
        );
      case "en attente":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            <FaClock className="mr-1" />
            En attente
          </span>
        );
      case "échec":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            <FaTimesCircle className="mr-1" />
            Échoué
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">💳 Paiements</h1>
        <div className="flex items-center space-x-2">
          <FaFilter className="text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option === "tout" ? "Tous les statuts" : option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((paiement) => (
              <tr key={paiement.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{paiement.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paiement.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{paiement.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paiement.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getStatusBadge(paiement.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-900 cursor-pointer">
                  <FaInfoCircle className="inline mr-1" />
                  Détails
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
