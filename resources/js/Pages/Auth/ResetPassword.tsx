import ResetPasswordForm from "@/features/auth/reset-password-form";
import AuthLayout from "@/layouts/auth-layout";
import { Head } from "@inertiajs/react";

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    return (
        <AuthLayout>
            <Head title="Reset Password" />
            <div className="w-full mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                <ResetPasswordForm email={email} token={token} />
            </div>
        </AuthLayout>
    );
}
