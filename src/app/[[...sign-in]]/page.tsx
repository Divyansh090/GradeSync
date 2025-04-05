"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isSignedIn && user) {
      const role = user.publicMetadata.role;
      if (role) {
        router.push(`/${role}`);
      }
    }
  }, [isSignedIn, user, router]);

  const handleSendMagicLink = async () => {
    // Save email in localStorage to reuse across browsers (optional)
    localStorage.setItem("user_email", email);

    // Send magic link via Clerk API
    await fetch("/api/send-magic-link", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    alert("Magic login link sent to your email!");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-950">
      {!isSignedIn ? (
        <div className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-4 w-[350px]">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src="/logo.svg" alt="" width={24} height={24} />
            Grade Sync
          </h1>
          <h2 className="text-gray-400">Sign in to your account</h2>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-md ring-1 ring-gray-300"
          />
          <button
            onClick={handleSendMagicLink}
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
          >
            Send Magic Link
          </button>

          <hr className="my-2" />
          <SignInButton mode="modal">
            <button className="bg-green-500 text-white p-2 rounded-md text-sm">
              Or Sign in with Username
            </button>
          </SignInButton>
        </div>
      ) : (
        <p className="text-white">Redirecting...</p>
      )}
    </div>
  );
};

export default LoginPage;
