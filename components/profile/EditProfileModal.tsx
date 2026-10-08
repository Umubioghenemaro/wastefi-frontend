"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Loader2 } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle, FormError } from "@/components/ui";
import type { User } from "@/types/api";

/**
 * Edit Profile Modal
 * Form for editing user profile information
 */

const profileSchema = z.object({
  name: z.string()
    .min(1, "Full name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must not exceed 100 characters"),
  email: z.string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Please enter a valid email address",
    }),
  phone: z.string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[+\d\s()-]+$/, "Please enter a valid phone number"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onSave: (data: ProfileFormData) => Promise<void>;
}

export function EditProfileModal({ user, onClose, onSave }: EditProfileModalProps) {
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email || "",
      phone: user.phone,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    try {
      await onSave(data);
      onClose();
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-0 md:p-4">
      <Card className="w-full md:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl md:rounded-2xl">
        <CardHeader className="border-b border-[var(--border)]">
          <div className="flex items-center justify-between">
            <CardTitle>Edit Profile</CardTitle>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
              disabled={isSaving}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name <span className="text-[var(--error)]">*</span>
              </label>
              <input
                {...register("name")}
                type="text"
                className={`w-full h-12 px-4 rounded-md border ${
                  errors.name 
                    ? "border-[var(--error)] focus:ring-[var(--error)]" 
                    : "border-[var(--border)] focus:ring-[var(--primary)]"
                } bg-[var(--background)] focus:ring-2 focus:border-transparent outline-none`}
                placeholder="Enter your full name"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <FormError message={errors.name.message} id="name-error" />
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                {...register("email")}
                type="email"
                className={`w-full h-12 px-4 rounded-md border ${
                  errors.email 
                    ? "border-[var(--error)] focus:ring-[var(--error)]" 
                    : "border-[var(--border)] focus:ring-[var(--primary)]"
                } bg-[var(--background)] focus:ring-2 focus:border-transparent outline-none`}
                placeholder="Enter your email (optional)"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <FormError message={errors.email.message} id="email-error" />
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number <span className="text-[var(--error)]">*</span>
              </label>
              <input
                {...register("phone")}
                type="tel"
                className={`w-full h-12 px-4 rounded-md border ${
                  errors.phone 
                    ? "border-[var(--error)] focus:ring-[var(--error)]" 
                    : "border-[var(--border)] focus:ring-[var(--primary)]"
                } bg-[var(--background)] focus:ring-2 focus:border-transparent outline-none`}
                placeholder="Enter your phone number"
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <FormError message={errors.phone.message} id="phone-error" />
              )}
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                Used for account verification
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                fullWidth
                onClick={onClose}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
