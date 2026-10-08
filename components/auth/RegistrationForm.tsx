"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input, Card, CardContent, CardHeader, CardTitle, FormError } from "@/components/ui";
import { useRouter } from "next/navigation";
import { User, Phone, Mail, Lock } from "lucide-react";

/**
 * Registration Form
 * Collector account registration with validation
 */

const registrationSchema = z.object({
  name: z.string()
    .min(1, "Full name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must not exceed 100 characters"),
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(/^\+?[1-9]\d{9,14}$/, "Please enter a valid phone number with country code (e.g., +1234567890)"),
  email: z.string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Please enter a valid email address",
    }),
  password: z.string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string()
    .min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match. Please try again.",
  path: ["confirmPassword"],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Registration data:", data);
    
    // Navigate to phone verification
    router.push("/verify-phone");
    
    setIsLoading(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Create Account</CardTitle>
        <p className="text-center text-sm text-[var(--muted-foreground)]">
          Join WasteFi and start earning today
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
              <input
                {...register("name")}
                type="text"
                placeholder="Full Name"
                className={`w-full h-12 pl-11 pr-4 rounded-md border ${
                  errors.name 
                    ? "border-[var(--error)] focus:ring-[var(--error)]" 
                    : "border-[var(--border)] focus:ring-[var(--primary)]"
                } bg-[var(--background)] focus:ring-2 focus:border-transparent outline-none`}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
            </div>
            {errors.name && (
              <FormError message={errors.name.message} id="name-error" />
            )}
          </div>

          {/* Phone Number */}
          <div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
              <input
                {...register("phone")}
                type="tel"
                placeholder="Phone Number (+1234567890)"
                className={`w-full h-12 pl-11 pr-4 rounded-md border ${
                  errors.phone 
                    ? "border-[var(--error)] focus:ring-[var(--error)]" 
                    : "border-[var(--border)] focus:ring-[var(--primary)]"
                } bg-[var(--background)] focus:ring-2 focus:border-transparent outline-none`}
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
            </div>
            {errors.phone && (
              <FormError message={errors.phone.message} id="phone-error" />
            )}
          </div>

          {/* Email (Optional) */}
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
              <input
                {...register("email")}
                type="email"
                placeholder="Email (Optional)"
                className={`w-full h-12 pl-11 pr-4 rounded-md border ${
                  errors.email 
                    ? "border-[var(--error)] focus:ring-[var(--error)]" 
                    : "border-[var(--border)] focus:ring-[var(--primary)]"
                } bg-[var(--background)] focus:ring-2 focus:border-transparent outline-none`}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </div>
            {errors.email && (
              <FormError message={errors.email.message} id="email-error" />
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className={`w-full h-12 pl-11 pr-4 rounded-md border ${
                  errors.password 
                    ? "border-[var(--error)] focus:ring-[var(--error)]" 
                    : "border-[var(--border)] focus:ring-[var(--primary)]"
                } bg-[var(--background)] focus:ring-2 focus:border-transparent outline-none`}
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
            </div>
            {errors.password && (
              <FormError message={errors.password.message} id="password-error" />
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
                className={`w-full h-12 pl-11 pr-4 rounded-md border ${
                  errors.confirmPassword 
                    ? "border-[var(--error)] focus:ring-[var(--error)]" 
                    : "border-[var(--border)] focus:ring-[var(--primary)]"
                } bg-[var(--background)] focus:ring-2 focus:border-transparent outline-none`}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
              />
            </div>
            {errors.confirmPassword && (
              <FormError message={errors.confirmPassword.message} id="confirm-password-error" />
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            className="mt-6"
          >
            Create Account
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-[var(--muted-foreground)]">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-[var(--primary)] font-medium hover:underline"
            >
              Sign In
            </button>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
