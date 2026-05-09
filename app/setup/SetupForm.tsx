"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type SetupFormProps = {
  token: string | null;
};

type UserInfo = {
  id: string;
  name: string;
  role: string;
  invite_expires_at: string;
};

export default function SetupForm({ token }: SetupFormProps) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    birthday: "",
    phone: "",
    pin: "",
    pinConfirm: "",
  });

  useEffect(() => {
    if (!token) {
      setError("No invite token provided.");
      setLoading(false);
      return;
    }

    async function validateToken() {
      try {
        const response = await fetch(`/api/users/onboard?token=${encodeURIComponent(token ?? "")}`);
        if (!response.ok) {
          const data = (await response.json()) as { error?: string };
          throw new Error(data.error || "Invalid or expired invite.");
        }
        const data = (await response.json()) as { user: UserInfo };
        setUserInfo(data.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to validate invite.");
      } finally {
        setLoading(false);
      }
    }

    validateToken();
  }, [token]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!formData.email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!formData.birthday.trim()) {
      setError("Birthday is required.");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Phone is required.");
      return;
    }
    if (!formData.pin.trim()) {
      setError("PIN is required.");
      return;
    }
    if (formData.pin !== formData.pinConfirm) {
      setError("PINs do not match.");
      return;
    }
    if (!/^\d{4,6}$/.test(formData.pin)) {
      setError("PIN must be 4-6 digits.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/users/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email: formData.email.trim().toLowerCase(),
          birthday: formData.birthday.trim(),
          phone: formData.phone.trim(),
          pin: formData.pin,
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || "Unable to complete setup.");
      }

      router.refresh();
      router.push("/rep");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to complete setup.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-md overflow-hidden border border-white/70 bg-white/90 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.45)] backdrop-blur">
        <div className="app-brand-strip" />
        <CardHeader className="space-y-3 pb-5">
          <div className="app-kicker w-fit px-3 py-1 text-[11px]">
            Complete Profile
          </div>
          <CardTitle className="text-2xl">Setting up...</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Validating your invitation...</p>
        </CardContent>
      </Card>
    );
  }

  if (error && !userInfo) {
    return (
      <Card className="w-full max-w-md overflow-hidden border border-white/70 bg-white/90 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.45)] backdrop-blur">
        <div className="app-brand-strip" />
        <CardHeader className="space-y-3 pb-5">
          <div className="app-kicker w-fit px-3 py-1 text-[11px]">
            Invitation Error
          </div>
          <CardTitle className="text-2xl">Invalid invite</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!userInfo) {
    return (
      <Card className="w-full max-w-md overflow-hidden border border-white/70 bg-white/90 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.45)] backdrop-blur">
        <div className="app-brand-strip" />
        <CardHeader className="space-y-3 pb-5">
          <div className="app-kicker w-fit px-3 py-1 text-[11px]">
            Complete Profile
          </div>
          <CardTitle className="text-2xl">Invitation error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Your invitation could not be found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md overflow-hidden border border-white/70 bg-white/90 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.45)] backdrop-blur">
      <div className="app-brand-strip" />
      <CardHeader className="space-y-3 pb-5">
        <div className="app-kicker w-fit px-3 py-1 text-[11px]">
          Complete Profile
        </div>
        <CardTitle className="text-2xl">Welcome, {userInfo.name}</CardTitle>
        <CardDescription className="text-sm leading-6 text-muted-foreground">
          Set up your account to access Mountain Springs Cleaning tools.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="setup-email">Email</Label>
            <Input
              id="setup-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="setup-birthday">Birthday</Label>
            <Input
              id="setup-birthday"
              type="date"
              value={formData.birthday}
              onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="setup-phone">Phone</Label>
            <Input
              id="setup-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(702) 555-0000"
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="setup-pin">PIN (4-6 digits)</Label>
            <Input
              id="setup-pin"
              type="password"
              inputMode="numeric"
              value={formData.pin}
              onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
              placeholder="••••"
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="setup-pin-confirm">Confirm PIN</Label>
            <Input
              id="setup-pin-confirm"
              type="password"
              inputMode="numeric"
              value={formData.pinConfirm}
              onChange={(e) => setFormData({ ...formData, pinConfirm: e.target.value })}
              placeholder="••••"
              className="h-11"
              required
            />
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <Button type="submit" className="h-11 w-full" disabled={submitting}>
            {submitting ? "Completing setup..." : "Complete Setup"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
