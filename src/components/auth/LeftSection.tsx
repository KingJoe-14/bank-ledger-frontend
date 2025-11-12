"use client";

import {
    LockClosedIcon,
    ClockIcon,
    DevicePhoneMobileIcon,
    BanknotesIcon,
} from "@heroicons/react/24/solid";
import {Landmark} from "lucide-react";

type FeatureItemProps = {
    icon: typeof LockClosedIcon;
    text: string;
};

function FeatureItem({ icon: Icon, text }: FeatureItemProps) {
    return (
        <li className="flex flex-col items-center text-center space-y-2">
      <span className="w-12 h-12 flex items-center justify-center bg-white text-blue-700 rounded-full">
        <Icon className="w-6 h-6" />
      </span>
            <span className="text-sm font-medium">{text}</span>
        </li>
    );
}

export default function LeftSection() {
    return (
        <div className="hidden md:flex w-1/2 bg-blue-700 text-white flex-col justify-center items-center px-16 py-16">
            <div className="max-w-md text-center space-y-6">
                {/* Logo + Title */}
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 flex items-center justify-center  rounded-full mb-4">
                        <Landmark className=" text-white" size={150} />                    </div>
                    <h1 className="text-4xl font-bold">KingYaw Bank</h1>
                    <p className="text-sm">Your Trusted Financial Partner</p>
                </div>

                <h2 className="text-2xl font-semibold">Seamless Digital Banking</h2>
                <p className="text-base leading-relaxed">
                    Experience secure, convenient, and innovative banking solutions
                    designed for your financial success.
                </p>

                {/* Features */}
                <ul className="grid grid-cols-3 gap-8 mt-8">
                    <FeatureItem icon={LockClosedIcon} text="Bank-grade security" />
                    <FeatureItem icon={ClockIcon} text="24/7 access" />
                    <FeatureItem icon={DevicePhoneMobileIcon} text="Mobile-friendly" />
                </ul>
            </div>
        </div>
    );
}
