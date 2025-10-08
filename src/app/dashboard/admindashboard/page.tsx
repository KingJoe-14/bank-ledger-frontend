"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/app/lib/api";
import SummaryCard from "./components/SummaryCard";
import GrowthChart from "./components/GrowthChart";
import DistributionChart from "./components/DistributionChart";
import AlertsCard from "./components/AlertsCard";
import QuickActions from "./components/QuickActions";

export default function AdminDashboardPage() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const dashboardData = await apiRequest("/adminpanel/dashboard/", "GET");
                setData(dashboardData);
            } catch (err) {
                console.error("Failed to fetch dashboard:", err);
            }
        };

        fetchDashboard();
    }, []);

    return (
        <main className="p-6 space-y-6 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                <SummaryCard
                    title="Total Users"
                    value={data ? data.users.total : "--"}
                    subtitle="All registered users"
                />
                <SummaryCard
                    title="Active Users"
                    value={data ? data.users.active : "--"}
                    subtitle="Currently active"
                />
                <SummaryCard
                    title="Total Accounts"
                    value={data ? data.accounts : "--"}
                    subtitle="Accounts in the system"
                />
                <SummaryCard
                    title="Total Transactions"
                    value={data ? data.transactions.total : "--"}
                    subtitle="All recorded transactions"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GrowthChart data={data?.transactions} />
                <DistributionChart data={data?.financial_overview} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AlertsCard />
                <QuickActions />
            </div>
        </main>
    );
}
