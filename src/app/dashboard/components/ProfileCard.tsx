"use client";

type ProfileCardProps = {
    name: string;
    email: string;
    accountNumber: string;
    balance: number;
};

export default function ProfileCard({
                                        name,
                                        email,
                                        accountNumber,
                                        balance,
                                    }: ProfileCardProps) {
    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <p className="text-gray-600">Email: {email}</p>
            <p className="text-gray-600">Account #: {accountNumber}</p>
            <p className="text-gray-800 font-bold mt-4">Balance: ${balance}</p>
        </div>
    );
}
