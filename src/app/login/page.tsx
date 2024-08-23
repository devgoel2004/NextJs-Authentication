"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const data = await axios.post("/api/users/login", user);
      toast.success("login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Something wrong", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex border border-gray-500 focus:outline-none flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label className="m-2" htmlFor="username">
        Email
      </label>
      <input
        className="text-black p-2 border border-gray-300 rounded-lg-mb-4 focus:outline-none focus:border-gray-600"
        type="email"
        id="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <label className="m-2" htmlFor="username">
        Password
      </label>
      <input
        className="text-black p-2 border border-gray-300 rounded-lg-mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="m-2 p-2 border border-gray-300 rounded-lg-mb-4 focus:outline-none focus:border-gray-600">
        {buttonDisabled ? "Not Login" : "Login"}
      </button>
      <Link href="/signup">SignUp</Link>
    </div>
  );
}
