export type Transaction = {
    id: number;
    transaction_type: string;
    amount: number;
    description: string | null;
    account_number: string;
    timestamp: string;
};

export type Account = {
    account_number: string;
    balance: number;
    account_type: string;
};

export type DashboardResponse = {
    total_balance: number;
    accounts: Account[];
    recent_transactions: Transaction[];
};

export async function fetchDashboardData(token: string): Promise<DashboardResponse> {
    try {
        const res = await fetch("http://127.0.0.1:8000/api/transactions/dashboard/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
        }

        return res.json();
    } catch (err) {
        console.error("Error fetching dashboard data:", err);
        throw err;
    }
}

export async function fetchAllTransactions(token: string): Promise<Transaction[]> {
    try {
        const res = await fetch("http://127.0.0.1:8000/api/transactions/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();

        // ✅ Extract results from paginated response
        return data.results ?? [];
    } catch (err) {
        console.error("Error fetching all transactions:", err);
        throw err;
    }
}
