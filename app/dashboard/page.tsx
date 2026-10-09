"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/service/firebase/database";
import { formatPrice } from "@/service/Utils";
import { Order } from "@/interfaces/order";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function OverviewPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.state === 0).length;
  const confirmedOrders = orders.filter((o) => o.state === 1).length;
  const shippedOrders = orders.filter((o) => o.state === 2).length;
  const totalRevenue = orders.reduce(
    (acc, o) => acc + o.command.price * o.quantity,
    0
  );

  // Data for Pie Chart
  const pieData = [
    { name: "En attente", value: pendingOrders },
    { name: "Confirmée", value: confirmedOrders },
    { name: "Envoyée", value: shippedOrders },
    { name: "Retour", value: orders.filter((o) => o.state === 3).length },
  ];

  const COLORS = ["#facc15", "#4ade80", "#60a5fa", "#f87171"];

  // Data for Line Chart (Revenue over time)
  // Group orders by date
  const revenueByDate: Record<string, number> = {};
  orders.forEach((o) => {
    const date = new Date(o.date).toLocaleDateString();
    const revenue = o.command.price * o.quantity;
    if (revenueByDate[date]) {
      revenueByDate[date] += revenue;
    } else {
      revenueByDate[date] = revenue;
    }
  });

  const lineData = Object.keys(revenueByDate)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .slice(-30) // Last 30 days
    .map((date) => ({
      date,
      revenue: revenueByDate[date],
    }));

  return (
    <div className="py-6 px-3 max-w-7xl mx-auto min-w-0 overflow-x-hidden">
      <h1 className="text-3xl mb-8 font-bold text-gray-800">Vue d'ensemble</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col items-center justify-center min-w-0 overflow-hidden">
          <span className="text-xs font-bold uppercase text-gray-500 mb-1 truncate">Total</span>
          <span className="text-2xl font-black text-gray-800 text-center tabular-nums leading-tight">{totalOrders}</span>
        </div>
        <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl shadow-sm flex flex-col items-center justify-center text-yellow-800 min-w-0 overflow-hidden">
          <span className="text-xs font-bold uppercase mb-1 truncate">En Attente</span>
          <span className="text-2xl font-black text-center tabular-nums leading-tight">{pendingOrders}</span>
        </div>
        <div className="p-4 bg-green-50 border border-green-100 rounded-xl shadow-sm flex flex-col items-center justify-center text-green-800 min-w-0 overflow-hidden">
          <span className="text-xs font-bold uppercase mb-1 truncate">Confirmée</span>
          <span className="text-2xl font-black text-center tabular-nums leading-tight">{confirmedOrders}</span>
        </div>
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl shadow-sm flex flex-col items-center justify-center text-blue-800 min-w-0 overflow-hidden">
          <span className="text-xs font-bold uppercase mb-1 truncate">Envoyée</span>
          <span className="text-2xl font-black text-center tabular-nums leading-tight">{shippedOrders}</span>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl shadow-sm flex flex-col items-center justify-center text-emerald-800 col-span-2 md:col-span-1 min-w-0 overflow-hidden">
          <span className="text-xs font-bold uppercase mb-1 truncate">Revenus</span>
          <span className="text-lg xl:text-xl font-black text-center tabular-nums leading-tight break-all">{formatPrice(totalRevenue)} DA</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-w-0">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-w-0 overflow-hidden">
          <h2 className="text-lg font-semibold mb-6 text-gray-700">Revenus sur le temps (30 derniers jours)</h2>
          <div className="h-80 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 11}} interval="preserveStartEnd" minTickGap={32} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} width={72} tickFormatter={(v: number) => v >= 1000 ? `${Math.round(v/100)/10}k` : `${v}`} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  formatter={(value: any) => [`${value} DA`, 'Revenus']}
                />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-w-0 overflow-hidden">
          <h2 className="text-lg font-semibold mb-6 text-gray-700 truncate">Répartition par statut</h2>
          <div className="h-80 w-full min-w-0 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [value, 'Commandes']} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
