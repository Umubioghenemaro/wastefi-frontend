"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui";
import {
  ProfileHeader,
  ProfileStats,
  EditProfileModal,
  AccountActions,
  QRCodeCard,
} from "@/components/profile";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { useToast } from "@/lib/hooks/useToast";
import { useRouter } from "next/navigation";
import type { User } from "@/types/api";

/**
 * Profile Page
 * Display and manage user profile
 */

export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const addToast = useUIStore((state) => state.addToast);
  const toast = useToast();

  // Mock user data - Replace with real data from auth store
  const mockUser: User = {
    id: "user-123",
    phone: "+1234567890",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "collector",
    createdAt: "2024-01-15T00:00:00Z",
    lastActive: new Date().toISOString(),
  };

  // Mock stats
  const mockStats = {
    totalCollections: 47,
    totalEarnings: 342.50,
    totalWeight: 156.8,
    rank: "Gold Collector",
  };

  const handleSaveProfile = async (data: { name: string; email?: string; phone: string }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Saving profile:", data);
    toast.success("Profile updated successfully", "Profile Updated");
    addToast("Profile updated successfully", "success");
  };

  const handleAvatarChange = () => {
    toast.info("Avatar upload coming soon", "Coming Soon");
    addToast("Avatar upload coming soon", "info");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully", "Logged Out");
    addToast("Logged out successfully", "success");
    router.push("/login");
  };

  return (
    <Container size="md">
      <Section>
        <PageHeader title="Profile" description="Manage your account" />
      </Section>

      <Section spacing="sm">
        {/* Profile Header */}
        <Card>
          <ProfileHeader
            user={mockUser}
            onEdit={() => setIsEditModalOpen(true)}
            onAvatarChange={handleAvatarChange}
          />
        </Card>

        {/* Stats */}
        <ProfileStats stats={mockStats} />

        {/* QR Code for Check-in */}
        <QRCodeCard userId={mockUser.id} userName={mockUser.name} />

        {/* Account Actions */}
        <AccountActions onLogout={handleLogout} />
      </Section>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal
          user={mockUser}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </Container>
  );
}
