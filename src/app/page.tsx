// src/app/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession, signIn } from "next-auth/react";
import { WavyBackground } from "./components/UI/WavyBackground";
import { Modal } from "./components/UI/Modal";
import { SignupForm } from "./components/SignupForm";
import RegisterForm from "./components/RegisterForm";

interface Credentials {
  email: string;
  password: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    signOut();
  };

  const handleLogin = async (credentials: Credentials) => {
    await signIn("credentials", {
      ...credentials,
      redirect: false,
    });
  };

  return (
    <>
      <WavyBackground className="max-w-4xl mx-auto pb-10 sm:pb-20 md:pb-30 lg:pb-40">
        <div className="relative isolate px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl sm:max-w-2xl py-16 sm:py-32 lg:py-56">
            <div className="text-center">
              <Image
                src="/logoS.webp"
                alt="PLUMS Logo"
                width={210}
                height={210}
                className="m-auto logo"
                priority={true}
                style={{ width: "350", height: "auto" }}
              />

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:mt-5 sm:text-4xl lg:text-6xl">
                PLUMS
              </h1>
              <p className="mt-4 text-xl font-bold leading-8 text-gray-700 sm:mt-9 sm:text-2xl">
                Personal Learning Management System
              </p>

              {session ? (
                <div className="mt-8 flex flex-col items-center justify-center gap-y-4 sm:flex-row sm:gap-x-6">
                  <Link
                    href="/add-topics"
                    className="rounded-md bg-indigo-500 px-3.5 py-3 text-sm font-semibold text-white shadow-xl hover:bg-indigo-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Topic
                  </Link>
                  <Link
                    href="/Topics"
                    className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-indigo-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    View Topics
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-lg font-semibold leading-6 text-white shadow-xl hover:bg-indigo-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={openModal}
                  className="mt-8 w-full sm:w-auto rounded-md bg-indigo-500 px-3.5 py-2.5 text-lg font-semibold leading-6 text-white shadow-xl hover:bg-indigo-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </WavyBackground>

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <SignupForm />
        <RegisterForm closeModal={closeModal} />
      </Modal>
    </>
  );
}
