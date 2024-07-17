"use client";

import React from "react";
import { WavyBackground } from "../components/UI/WavyBackground";
import { CredentialsForm } from "../components/CredentialsForm";
import {
  CredentialsSignInButton,
  GithubSignInButton,
  GoogleSignInButton,
} from "@/app/components/authButtons";

export default function Signup() {
  return (
    <>
      <WavyBackground className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Log in
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                start your 14-day free trial
              </a>
            </p>
          </div>
          <CredentialsForm />
          <div className="mt-6 grid grid-cols-1 gap-3">
            <CredentialsSignInButton />
            <GoogleSignInButton />
            <GithubSignInButton />
          </div>
        </div>
      </WavyBackground>
    </>
  );
}
