import RegisterForm from "@/features/auth/register-form";
import AuthLayout from "@/layouts/auth-layout";
import { Head } from "@inertiajs/react";

export default function Register() {
    return (
        <AuthLayout>
            <Head title="Register" />
            <div className="w-full mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                <RegisterForm />
            </div>
        </AuthLayout>
    );
}
