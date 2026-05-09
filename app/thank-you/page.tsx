"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, Phone } from "lucide-react";
import { useSearchParams } from "next/navigation";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    // Verify payment session with backend
    const verifyPayment = async () => {
      try {
        const response = await fetch("/api/stripe/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        if (response.ok) {
          setVerified(true);
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <CardTitle className="text-3xl text-green-900">Payment Successful!</CardTitle>
            <CardDescription className="text-lg text-green-700 mt-2">
              Thank you for your order
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-4 text-slate-600">Verifying payment...</p>
              </div>
            ) : (
              <>
                {/* Success Message */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-2">What happens next?</h3>
                  <ul className="space-y-2 text-green-800 text-sm">
                    <li className="flex gap-3">
                      <span className="text-green-600 font-bold">1.</span>
                      <span>We'll confirm your booking and send you a confirmation email</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-600 font-bold">2.</span>
                      <span>Our team will reach out to finalize your service date and time</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-600 font-bold">3.</span>
                      <span>You'll receive a reminder before your appointment</span>
                    </li>
                  </ul>
                </div>

                {/* Order Details */}
                {sessionId && (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                    <h3 className="font-semibold text-slate-900 mb-3">Order Details</h3>
                    <div className="space-y-2 text-sm text-slate-600">
                      <p>
                        <span className="font-medium">Session ID:</span>{" "}
                        <code className="bg-white px-2 py-1 rounded text-xs">{sessionId}</code>
                      </p>
                      <p>
                        <span className="font-medium">Date:</span> {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-4">Need Help?</h3>
                  <div className="space-y-3">
                    <a
                      href={`mailto:${process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "bookings@mountainspringsclean.com"}`}
                      className="flex items-center gap-3 text-blue-700 hover:text-blue-900"
                    >
                      <Mail className="w-5 h-5" />
                      <span>{process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "bookings@mountainspringsclean.com"}</span>
                    </a>
                    <a
                      href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE || "(702) 555-CLEAN"}`}
                      className="flex items-center gap-3 text-blue-700 hover:text-blue-900"
                    >
                      <Phone className="w-5 h-5" />
                      <span>{process.env.NEXT_PUBLIC_BUSINESS_PHONE || "(702) 555-CLEAN"}</span>
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Link href="/" className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
