"use client";

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import MainHeader from "@/app/components/MainHeader";
import MainFooter from "@/app/components/MainFooter";
import { PrismaClient, Attachment } from "@prisma/client";

export default function FilePage() {
  return (
    <>
      <MainHeader />
      <div>
        <h1>Files Page</h1>
      </div>

      <MainFooter />
    </>
  );
}
