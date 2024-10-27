import AdminLayout from "@/layouts/admin-layout";
import { t } from "@/utils/trans";
import React from "react";

function Dashboard({ translations }: any) {
    console.log(t("no"));
    return <div>Dashboard</div>;
}

Dashboard.layout = (page: React.ReactNode) => (
    <AdminLayout children={page} name="Dashboard" />
);
export default Dashboard;
