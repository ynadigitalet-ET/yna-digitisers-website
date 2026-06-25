"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { loginAdmin } from "@/app/actions/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await loginAdmin(formData);
    setLoading(false);
    if (result?.success === false) {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">
            <span className="text-brand-blue">YNA</span> Admin
          </h1>
          <p className="mt-2 text-sm text-muted">Sign in to manage your website</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5">
          <Input name="email" label="Email" type="email" required placeholder="admin@example.com" />
          <Input name="password" label="Password" type="password" required placeholder="••••••••" />
          <Button type="submit" loading={loading} className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
