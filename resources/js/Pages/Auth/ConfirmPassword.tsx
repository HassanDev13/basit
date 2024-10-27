import AuthLayout from "@/layouts/auth-layout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ConfirmPassword() {
    return (
        <AuthLayout>
            <Head title="Confirm Password" />
            <ConfirmPassword />
        </AuthLayout>
    );
}
