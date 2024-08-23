"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Profile() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const logoutUser = async () => {
    try {
      const data = await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      alert("logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error("Something wrong");
    }
  };
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setUserId(res.data.data._id);
    console.log(res.data);
  };
  useEffect(() => {
    getUserDetails();
    router.push(`/profile/${userId}`);
  }, [userId]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2>
        {userId === "" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${userId}`}>{userId}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logoutUser}
        className="bg-blue-500 hover:bg-blue-200 text-white font-bold  py-2 px-4 rounded">
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="bg-green-700 mt-2 hover:bg-green-200 text-white font-bold  py-2 px-4 rounded">
        Get User Details
      </button>
    </div>
  );
}
