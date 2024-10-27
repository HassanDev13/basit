import { LoginForm } from "@/features/auth/login-form";
import AuthLayout from "@/layouts/auth-layout";
import { Head } from "@inertiajs/react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    return (
        <AuthLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <div className="flex w-full h-screen sm:max-w-md sm:rounded-lg justify-center items-center">
                <LoginForm canResetPassword={canResetPassword} />
            </div>
        </AuthLayout>
    );
}
