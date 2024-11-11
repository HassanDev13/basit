import RegisterForm from "@/features/auth/register-form";
import AuthLayout from "@/layouts/auth-layout";
import { Head } from "@inertiajs/react";

export default function Register() {
    return (
        <AuthLayout>
            <Head title="Register" />
            <div className="flex flex-col w-full h-screen sm:max-w-md sm:rounded-lg justify-center items-center space-y-4">

                <RegisterForm />
            </div>
        </AuthLayout>
    );
}
