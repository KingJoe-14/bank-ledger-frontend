"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Landmark, TrendingUp, Headphones
} from "lucide-react";


export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
                    <div className="flex items-center space-x-2">
                        <div className="p-2 bg-blue-600 rounded-md">
                            <Landmark className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-800">KingYaw</span>
                    </div>

                    <div className="flex space-x-3">
                        <a href="/auth/login">
                            <Button
                                variant="outline"
                                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                            >
                                Log In
                            </Button>
                        </a>

                        <a href="/auth/register">
                            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg">
                                Open Account
                            </Button>
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-8">
                    {/* Text */}
                    <div className="max-w-lg space-y-6">
                        <h1 className="text-5xl font-extrabold text-gray-800">
                            Banking Made <span className="text-blue-600">Simple</span>
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Experience the future of banking with KingYaw. Secure, fast, and
                            designed for your financial success.
                        </p>
                        <div className="flex space-x-3">
                            <a href="/auth/login">
                                <Button
                                    variant="outline"
                                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                                >
                                    Log In
                                </Button>
                            </a>

                            <a href="/auth/register">
                                <Button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg">
                                    Open Account
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="mb-12 lg:mb-0 lg:ml-12 relative w-full max-w-xl">
                        <Image
                            src="/Banking.jpg"
                            alt="Banking App Preview"
                            width={600}
                            height={400}
                            className="rounded-2xl shadow-lg"
                        />
                    </div>
                </div>
            </section>


            {/* Why Choose KingYaw */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-8 text-center">
                    {/* Title */}
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-4 inline-block ">
                        Why Choose KingYaw?
                    </h2>

                    {/* Sub text */}
                    <p className="text-gray-600 max-w-xl mx-auto mb-12 text-base">
                        We provide comprehensive banking solutions designed to meet all your
                        financial needs with cutting-edge technology and personalized service.
                    </p>

                    {/* Features */}
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {/* Digital Banking */}
                        <div className="p-6 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition">
                            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-md mb-4">
                                <Landmark className="w-6 h-6" />
                            </div>
                            <div className="max-w-sm">
                                <h3 className="font-semibold text-lg mb-2">Digital Banking</h3>
                                <p className="text-gray-600 text-sm">
                                    Access your accounts 24/7 with our award-winning mobile app and
                                    online banking platform.
                                </p>
                            </div>
                        </div>

                        {/* Investment Tools */}
                        <div className="p-6 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition">
                            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-md mb-4">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div className="max-w-sm">
                                <h3 className="font-semibold text-lg mb-2">Investment Tools</h3>
                                <p className="text-gray-600 text-sm">
                                    Grow your wealth with our comprehensive investment platform and
                                    expert financial advice.
                                </p>
                            </div>
                        </div>

                        {/* 24/7 Support */}
                        <div className="p-6 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition">
                            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-md mb-4">
                                <Headphones className="w-6 h-6" />
                            </div>
                            <div className="max-w-sm">
                                <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
                                <p className="text-gray-600 text-sm">
                                    Get help whenever you need it with our round-the-clock customer
                                    support team.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Our Services Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
                        Our Services
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto mb-12 text-base">
                        Explore a wide range of banking solutions designed to help you manage,
                        grow, and secure your finances with confidence.
                    </p>
                </div>

                {/* Services Content */}
                <div className="max-w-7xl mx-auto mt-12 flex flex-col lg:flex-row items-center gap-12 px-8">
                    {/* Text Content */}
                    <div className="flex-1 space-y-6">
                        <h3 className="text-2xl font-bold text-gray-800">
                            Savings Account
                        </h3>
                        <p className="text-gray-600 max-w-md">
                            Enjoy flexible savings plans with competitive interest rates,
                            designed to help you achieve your financial goals faster and smarter.
                        </p>
                        <h3 className="text-2xl font-bold text-gray-800">
                            Current Account
                        </h3>
                        <p className="text-gray-600 max-w-md">
                            Get seamless day-to-day transactions with our easy-to-use
                            current account tailored for individuals and businesses alike.
                        </p>
                    </div>

                    {/* Image */}
                    <div className="flex-1">
                        <Image
                            src="/BankingServices.png"
                            alt="Banking Services"
                            width={600}
                            height={400}
                            className="rounded-2xl shadow-lg"
                        />
                    </div>
                </div>
            </section>


            {/* Call to Action */}
            <section className="py-20 bg-blue-600 text-center text-white">
                <h2 className="text-4xl font-bold text-white-800 mb-4">Ready to Get Started?</h2>
                <p className="text-white-600 mx-auto mb-12 text-base">
                    Join thousands of satisfied customers who trust KingYaw for their
                    banking needs. Open your account today and experience the difference.
                </p>
                <div className="flex justify-center space-x-4">
                    <a href="/auth/register">
                        <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-lg">
                            Open Account
                        </Button>
                    </a>
                    <a href="/auth/login">
                        <Button
                            className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-lg"
                        >
                            Log In
                        </Button>
                    </a>
                </div>

            </section>



                <div className="bg-blue-600 text-center text-sm text-white">
                    © 2025 KingYaw Bank. All rights reserved.
                </div>

        </div>
    );
}
