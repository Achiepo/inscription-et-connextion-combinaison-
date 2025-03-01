"use client";

import { Grid, Card, Title, Text } from "@mantine/core";
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

// 📊 Données simulées (à remplacer par API)
const salesData = [
  { mois: "Jan", ventes: 4000 },
  { mois: "Fév", ventes: 6000 },
  { mois: "Mar", ventes: 12000 },
  { mois: "Avr", ventes: 9500 },
  { mois: "Mai", ventes: 15000 },
  { mois: "Juin", ventes: 21000 },
  { mois: "Juil", ventes: 23000 },
  { mois: "Aout", ventes: 20000 },
  { mois: "Sep", ventes: 22000 },
  { mois: "Oct", ventes: 25000 },
  { mois: "Nov", ventes: 28000 },
  { mois: "Déc", ventes: 30000 },
];

const clientsData = [
  { mois: "Jan", clients: 250 },
  { mois: "Fév", clients: 550 },
  { mois: "Mar", clients: 400 },
  { mois: "Avr", clients: 450 },
  { mois: "Mai", clients: 600 },
  { mois: "Juin", clients: 900 },
  { mois: "Juil", clients: 800 },
  { mois: "Aout", clients: 950 },
  { mois: "Sep", clients: 1200 },
  { mois: "Oct", clients: 1500 },
  { mois: "Nov", clients: 1800 },
  { mois: "Déc", clients: 2000 },
];

const categoryData = [
  { name: "vetement hommes", value: 450 },
  { name: "vetement femmes", value: 600 },
  { name: "vetement enfants", value: 344 },
];

const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1"];

export default function DashboardAnalytics() {
  const [totalVentes, setTotalVentes] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [totalCommandes, setTotalCommandes] = useState(0);

  useEffect(() => {
    setTotalVentes(salesData.reduce((acc, item) => acc + item.ventes, 0));
    setTotalClients(clientsData.reduce((acc, item) => acc + item.clients, 0));
    setTotalCommandes(150); // Exemple statique, à remplacer par API
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* SECTION STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card shadow="sm" padding="lg" className="bg-white rounded-lg">
          <Title order={4} className="text-xl font-semibold text-gray-700">
            Total Ventes
          </Title>
          <Text size="xl" className="text-blue-600 font-bold">
            {totalVentes} Fcfa
          </Text>
        </Card>
        <Card shadow="sm" padding="lg" className="bg-white rounded-lg">
          <Title order={4} className="text-xl font-semibold text-gray-700">
            Total Clients
          </Title>
          <Text size="xl" className="text-green-600 font-bold">
            {totalClients}
          </Text>
        </Card>
        <Card shadow="sm" padding="lg" className="bg-white rounded-lg">
          <Title order={4} className="text-xl font-semibold text-gray-700">
            Total Commandes
          </Title>
          <Text size="xl" className="text-orange-600 font-bold">
            {totalCommandes}
          </Text>
        </Card>
      </div>

      {/* 📌 SECTION GRAPHIQUES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 🔹 CHIFFRE D'AFFAIRES */}
        <Card shadow="md" padding="lg" className="bg-white rounded-lg">
          <Title order={4} className="text-xl font-semibold text-gray-700 mb-4">
            Chiffre d'Affaires Mensuel
          </Title>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventes" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* 🔹 CLIENTS */}
        <Card shadow="md" padding="lg" className="bg-white rounded-lg">
          <Title order={4} className="text-xl font-semibold text-gray-700 mb-4">
            Nombre de Clients
          </Title>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={clientsData}>
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="clients" stroke="#2196F3" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* 🔹 RÉPARTITION DES VENTES */}
        <Card shadow="md" padding="lg" className="bg-white rounded-lg col-span-1 md:col-span-2">
          <Title order={4} className="text-xl font-semibold text-gray-700 mb-4">
            Répartition des Ventes par Catégorie
          </Title>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}