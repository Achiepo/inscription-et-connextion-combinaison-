import React from 'react';
import Link from 'next/link';
import Image from 'next/image';



// Dashboard page pour le site de vente de vêtements en ligne
export default function Dashboard() {
  // Données fictives pour le dashboard
  const salesData = {
    today: 1250,
    yesterday: 980,
    thisWeek: 8450,
    thisMonth: 32600,
    growth: 12.5
  };

  const recentOrders = [
    { id: '#ORD-5531', customer: 'Sophie Martin', date: '15/05/2025', amount: 129.99, status: 'Livré' },
    { id: '#ORD-5532', customer: 'Thomas Dubois', date: '15/05/2025', amount: 89.50, status: 'En cours' },
    { id: '#ORD-5533', customer: 'Emma Leroy', date: '14/05/2025', amount: 210.75, status: 'En attente' },
    { id: '#ORD-5534', customer: 'Lucas Bernard', date: '14/05/2025', amount: 59.99, status: 'Livré' },
  ];

  const topProducts = [
    { name: 'T-shirt Premium', sold: 124, revenue: 3720 },
    { name: 'Jean Slim Fit', sold: 98, revenue: 4900 },
    { name: 'Robe d\'été', sold: 87, revenue: 3480 },
    { name: 'Veste en cuir', sold: 65, revenue: 7800 },
  ];

  return (
    <div> 
        {/* Main Content */}
        <main className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-600">Ventes aujourd'hui</h2>
                <div className="bg-green-100 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold mt-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{salesData.today.toLocaleString()} FCFA</p>
              <div className="flex items-center mt-4">
                <span className="text-green-500 text-sm font-medium flex items-center bg-green-50 px-2 py-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  {salesData.growth}%
                </span>
                <span className="text-gray-500 text-sm ml-2">vs hier</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-500">Ventes cette semaine</h2>
                <div className="bg-blue-100 p-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold mt-2">{salesData.thisWeek.toLocaleString()}€</p>
              <div className="flex items-center mt-4">
                <span className="text-green-500 text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  8.2%
                </span>
                <span className="text-gray-500 text-sm ml-2">vs semaine dernière</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-500">Ventes ce mois</h2>
                <div className="bg-purple-100 p-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold mt-2">{salesData.thisMonth.toLocaleString()}€</p>
              <div className="flex items-center mt-4">
                <span className="text-green-500 text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  11.3%
                </span>
                <span className="text-gray-500 text-sm ml-2">vs mois dernier</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-500">Commandes en attente</h2>
                <div className="bg-yellow-100 p-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold mt-2">24</p>
              <div className="flex items-center mt-4">
                <span className="text-red-500 text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  3.4%
                </span>
                <span className="text-gray-500 text-sm ml-2">vs hier</span>
              </div>
            </div>
          </div>

          {/* Recent Orders & Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Commandes récentes</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount.toFixed(2)} FCFA</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Livré' ? 'bg-green-100 text-green-800' : 
                            order.status === 'En cours' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-200 text-center">
                <Link href="/dashboard/orders" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Voir toutes les commandes
                </Link>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Produits les plus vendus</h2>
              </div>
              <div className="p-6">
                <ul className="divide-y divide-gray-200">
                  {topProducts.map((product, index) => (
                    <li key={index} className="py-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.sold} vendus</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{product.revenue.toLocaleString()} FCFA</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 border-t border-gray-200 text-center">
                <Link href="/dashboard/products" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Voir tous les produits
                </Link>
              </div>
            </div>
          </div>
      </main>
     </div>
  );
}