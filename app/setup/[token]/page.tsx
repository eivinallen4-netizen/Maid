"use client";

import { useParams } from "next/navigation";
import SetupForm from "../SetupForm";

export default function SetupPage() {
  const params = useParams();
  const token = typeof params.token === "string" ? decodeURIComponent(params.token) : null;

  return (
    <div className="app-page-shell flex items-center justify-center px-4 py-10">
      <SetupForm token={token} />
    </div>
  );
}
