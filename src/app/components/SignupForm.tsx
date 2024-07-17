// src/components/SignupForm.tsx
"use client";

import React from "react";
import { CredentialsForm } from "./CredentialsForm";
import {
  CredentialsSignInButton,
  GithubSignInButton,
  GoogleSignInButton,
} from "./authButtons";

export const SignupForm: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Log in
      </h1>
      <div className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        <CredentialsForm />
      </div>
      <p className="mt-9 text-2xl font-bold leading-8 text-gray-700">
        <CredentialsSignInButton />
        <GoogleSignInButton />
        <GithubSignInButton />
      </p>
    </div>
  );
};
