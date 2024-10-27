import VerifyEmailForm from "@/features/auth/verify-email-form";
import AuthLayout from "@/layouts/auth-layout";
import { Head } from "@inertiajs/react";

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthLayout>
            <Head title="Email Verification" />

            {status === "verification-link-sent" && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}
            <div className="w-full mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                <VerifyEmailForm />
            </div>
        </AuthLayout>
    );
}
