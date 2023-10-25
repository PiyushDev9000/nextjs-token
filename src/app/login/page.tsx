"use client"

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  useEffect(() => {
    if (session) {
      router.push("/profile");
    }
  }, [session]);
  

  const localtoken =  session?.user?.accesstoken
  localStorage.setItem('Auth-token',localtoken)
  const token = session?.user?.accesstoken;
// localStorage.setItem('Auth-token', token);
Cookies.set('auth_token', token, { expires: 1 }); 

  console.log(token)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
    });

    console.log("Login success", result);

    if (result?.error) {
      // Handle error here, for example by setting an error state
      console.error(result.error);
    }

    setLoading(false);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <form onSubmit={handleSubmit}>
      <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
    <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
