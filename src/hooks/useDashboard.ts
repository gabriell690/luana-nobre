/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface DashboardData {
  revenue: number;
  orders: number;
  customers: number;
  products: number;
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData>({
    revenue: 0,
    orders: 0,
    customers: 0,
    products: 0,
  });

  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setLoading(true);

    try {
      const [
        ordersCount,
        customersCount,
        productsCount,
        revenueResult,
      ] = await Promise.all([
        supabase
          .from("orders")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("role", "customer"),

        supabase
          .from("products")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("orders")
          .select("total")
          .eq("status", "paid"),
      ]);

      const revenue =
        revenueResult.data?.reduce(
          (acc, item) => acc + Number(item.total),
          0
        ) ?? 0;

      setData({
        revenue,
        orders: ordersCount.count ?? 0,
        customers: customersCount.count ?? 0,
        products: productsCount.count ?? 0,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    loading,
    data,
    reload: loadDashboard,
  };
}