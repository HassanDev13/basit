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

            <div className="flex flex-col w-full h-screen sm:max-w-md sm:rounded-lg justify-center items-center space-y-4">
                <h1 className="text-3xl font-bold">مرحبا بكم في برنامج بسيط</h1>
                <p className="mt-2 text-sm text-gray-600">
                    نظام بسيط لحساب الأرباح والخسائر لمحلكم
                </p>
                <LoginForm canResetPassword={canResetPassword} />
                <p className="mt-2 text-sm text-gray-600">
                    ليس لديك حساب؟{" "}
                    <a
                        href="/register"
                        className="text-blue-600 hover:underline"
                    >
                        سجل الآن
                    </a>
                </p>
              
            </div>
        </AuthLayout>
    );
}
