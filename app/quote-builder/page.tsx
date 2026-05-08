"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Loader2, Home, Zap } from "lucide-react";
import { defaultPricing } from "@/config/pricing.config";

type ServiceType = "standard" | "deep" | "moveout";
type HomeSize = "1bed" | "2bed" | "3bed" | "4bed" | "5bed";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: ServiceType;
  homeSize: HomeSize;
  selectedAddons: Record<string, boolean>;
  scheduleDate: string;
  scheduleTime: string;
}

export default function QuoteBuilderPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "standard",
    homeSize: "2bed",
    selectedAddons: {},
    scheduleDate: "",
    scheduleTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate pricing
  const pricing = useMemo(() => {
    let total = defaultPricing.serviceTypes[formData.serviceType];

    // Add home size surcharge (3bed and above)
    if (formData.homeSize !== "1bed" && formData.homeSize !== "2bed") {
      const surcharge = defaultPricing.homeSizeSurcharge[formData.homeSize];
      if (surcharge) {
        total += surcharge;
      }
    }

    // Add selected addons
    Object.entries(formData.selectedAddons).forEach(([addon, selected]) => {
      if (
        selected &&
        addon in defaultPricing.addons
      ) {
        total += defaultPricing.addons[addon as keyof typeof defaultPricing.addons];
      }
    });

    // Apply minimum
    return Math.max(total, defaultPricing.jobMinimum);
  }, [formData.serviceType, formData.homeSize, formData.selectedAddons]);

  const handleInputChange = (field: keyof Omit<FormData, "selectedAddons">, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddonChange = (addon: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      selectedAddons: { ...prev.selectedAddons, [addon]: checked },
    }));
  };

  const validateForm = useCallback((): boolean => {
    setError(null);

    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Valid email is required");
      return false;
    }

    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }

    if (!formData.address.trim()) {
      setError("Address is required");
      return false;
    }

    return true;
  }, [formData]);

  const handleSendQuote = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          },
          selections: {
            serviceType: formData.serviceType,
            homeSize: formData.homeSize,
            addons: formData.selectedAddons,
          },
          totals: { total: pricing },
        }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error || "Failed to create quote");
      }

      // Quote created successfully
      alert(`Quote created for $${pricing.toFixed(2)}`);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        serviceType: "standard",
        homeSize: "2bed",
        selectedAddons: {},
        scheduleDate: "",
        scheduleTime: "",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create quote";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/checkout-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          },
          selections: {
            serviceType: formData.serviceType,
            homeSize: formData.homeSize,
            addons: formData.selectedAddons,
          },
          serviceDate: formData.scheduleDate,
          serviceTime: formData.scheduleTime,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error || "Failed to create checkout session");
      }

      const data = (await response.json()) as { url?: string; sessionId?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to proceed to checkout";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Quote Builder</h1>
          <p className="text-lg text-slate-600">Build your custom cleaning quote</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="John Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (702) 555-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Service Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="123 Main St, Las Vegas, NV 89101"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Service Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Service Type</CardTitle>
                <CardDescription>Choose the cleaning service you need</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={formData.serviceType} onValueChange={(v) => handleInputChange("serviceType", v)}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-slate-50">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Standard Cleaning</div>
                      <div className="text-sm text-slate-600">Regular maintenance cleaning</div>
                    </Label>
                    <span className="font-semibold text-green-600">
                      ${defaultPricing.serviceTypes.standard}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-slate-50">
                    <RadioGroupItem value="deep" id="deep" />
                    <Label htmlFor="deep" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Deep Cleaning</div>
                      <div className="text-sm text-slate-600">Thorough deep clean</div>
                    </Label>
                    <span className="font-semibold text-green-600">
                      ${defaultPricing.serviceTypes.deep}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-slate-50">
                    <RadioGroupItem value="moveout" id="moveout" />
                    <Label htmlFor="moveout" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Move Out Cleaning</div>
                      <div className="text-sm text-slate-600">Preparation for moving</div>
                    </Label>
                    <span className="font-semibold text-green-600">
                      ${defaultPricing.serviceTypes.moveout}
                    </span>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Home Size */}
            <Card>
              <CardHeader>
                <CardTitle>Home Size</CardTitle>
                <CardDescription>Select your home size</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={formData.homeSize} onValueChange={(v) => handleInputChange("homeSize", v)}>
                  <div className="grid grid-cols-2 gap-3">
                    {["1bed", "2bed", "3bed", "4bed", "5bed"].map((size) => {
                      const surcharge =
                        size !== "1bed" && size !== "2bed"
                          ? defaultPricing.homeSizeSurcharge[size as HomeSize] || 0
                          : 0;
                      return (
                        <div key={size} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-slate-50">
                          <RadioGroupItem value={size} id={size} />
                          <Label htmlFor={size} className="flex-1 cursor-pointer">
                            <div className="font-semibold">{size.toUpperCase()}</div>
                            {surcharge > 0 && (
                              <div className="text-xs text-slate-600">+${surcharge}</div>
                            )}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Add-ons */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Add-Ons
                </CardTitle>
                <CardDescription>Select any additional services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(defaultPricing.addons).map(([addon, price]) => (
                  <div key={addon} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50">
                    <Checkbox
                      id={addon}
                      checked={formData.selectedAddons[addon] || false}
                      onCheckedChange={(checked) => handleAddonChange(addon, checked as boolean)}
                    />
                    <Label htmlFor={addon} className="flex-1 cursor-pointer">
                      <div className="font-semibold capitalize">{addon.replace(/_/g, " ")}</div>
                    </Label>
                    <span className="font-semibold text-green-600">+${price}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Schedule (Optional) */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule (Optional)</CardTitle>
                <CardDescription>Choose your preferred service date and time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.scheduleDate}
                      onChange={(e) => handleInputChange("scheduleDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.scheduleTime}
                      onChange={(e) => handleInputChange("scheduleTime", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-1">
            {/* Price Summary */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Quote Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Service Type */}
                <div>
                  <div className="text-sm text-slate-600">Service Type</div>
                  <div className="font-semibold capitalize">
                    {formData.serviceType.replace("_", " ")}
                  </div>
                  <div className="text-right font-semibold text-green-600">
                    ${defaultPricing.serviceTypes[formData.serviceType]}
                  </div>
                </div>

                <Separator />

                {/* Home Size Surcharge */}
                {formData.homeSize !== "1bed" && formData.homeSize !== "2bed" && (
                  <>
                    <div>
                      <div className="text-sm text-slate-600">
                        Home Size ({formData.homeSize.toUpperCase()}) Surcharge
                      </div>
                      <div className="text-right font-semibold text-green-600">
                        +${defaultPricing.homeSizeSurcharge[formData.homeSize]}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Add-ons */}
                {Object.entries(formData.selectedAddons)
                  .filter(([, selected]) => selected)
                  .map(([addon]) => (
                    <div key={addon}>
                      <div className="text-sm text-slate-600 capitalize">
                        {addon.replace(/_/g, " ")}
                      </div>
                      <div className="text-right font-semibold text-green-600">
                        +${defaultPricing.addons[addon as keyof typeof defaultPricing.addons]}
                      </div>
                    </div>
                  ))}

                <Separator />

                {/* Total */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-600 mb-2">Total Amount</div>
                  <div className="text-3xl font-bold text-green-600">${pricing.toFixed(2)}</div>
                  <div className="text-xs text-slate-500 mt-2">
                    Minimum: ${defaultPricing.jobMinimum}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-800">{error}</div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2 pt-4">
                  <Button
                    onClick={handleCheckout}
                    disabled={loading || !formData.name}
                    className="w-full h-11 bg-green-600 hover:bg-green-700"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay Now - $${pricing.toFixed(2)}`
                    )}
                  </Button>
                  <Button
                    onClick={handleSendQuote}
                    disabled={loading || !formData.name}
                    variant="outline"
                    className="w-full h-11"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Get Quote"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
