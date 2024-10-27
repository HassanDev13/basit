import ForgotPasswordForm from "@/features/auth/forgot-password-form";
import AuthLayout from "@/layouts/auth-layout";
import { Head } from "@inertiajs/react";

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <AuthLayout>
            <Head title="Forgot Password" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <div className="w-full mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                <ForgotPasswordForm />
            </div>
        </AuthLayout>
    );
}
