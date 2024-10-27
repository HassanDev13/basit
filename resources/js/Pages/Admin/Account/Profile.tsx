import InformationForm from "@/features/admin/profile/components/information-form";
import ProfileCard from "@/features/admin/profile/components/profile-card";
import SecurityForm from "@/features/admin/profile/components/security-form";
import AdminLayout from "@/layouts/admin-layout";
import React from "react";

function Profile() {
    return (
        <div className="space-y-4">
            <ProfileCard />
            <InformationForm />
            <SecurityForm />
        </div>
    );
}
Profile.layout = (page: React.ReactNode) => (
    <AdminLayout children={page} name="Profile" />
);
export default Profile;
