// "use client";
//
// import { useEffect, useState } from "react";
//
// type UserProfile = {
//     first_name: string;
//     last_name: string;
//     email: string;
//     phone: string;
//     address: string;
//     dob: string;
// };
//
// function getInitials(first?: string, last?: string) {
//     const f = first?.[0]?.toUpperCase() || "";
//     const l = last?.[0]?.toUpperCase() || "";
//     return (f + l) || "U"; // fallback "U" if no name available
// }
//
// export default function ProfileCard() {
//     const [profile, setProfile] = useState<UserProfile | null>(null);
//
//     useEffect(() => {
//         fetch("http://127.0.0.1:8000/api/users/profile/", {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//         })
//             .then((res) => res.json())
//             .then((data) => setProfile(data))
//             .catch((err) => console.error("Profile fetch error:", err));
//     }, []);
//
//     if (!profile) return <p>Loading...</p>;
//
//     return (
//         <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4">
//             {/* Circle with initials */}
//             <div className="flex items-center space-x-4">
//                 <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
//                     {getInitials(profile.first_name, profile.last_name)}
//                 </div>
//                 <div>
//                     <h1 className="text-xl font-bold">
//                         {profile.first_name} {profile.last_name}
//                     </h1>
//                     <p className="text-gray-500">{profile.email}</p>
//                 </div>
//             </div>
//
//             {/* Extra info */}
//             <div className="mt-4 space-y-2 text-gray-700">
//                 <p>
//                     <span className="font-semibold">📞 Phone:</span> {profile.phone || "N/A"}
//                 </p>
//                 <p>
//                     <span className="font-semibold">🏠 Address:</span> {profile.address || "N/A"}
//                 </p>
//                 <p>
//                     <span className="font-semibold">🎂 DOB:</span> {profile.dob || "N/A"}
//                 </p>
//             </div>
//         </div>
//     );
// }
