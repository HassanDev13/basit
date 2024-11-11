import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export function LoginForm({ canResetPassword }: { canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "test@basit.com",
        password: "password",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
                <CardDescription>
                    أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form className="grid gap-4" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label>البريد الإلكتروني</Label>
                        <Input
                            placeholder="m@example.com"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        {errors.email && (
                            <p className="text-destructive">{errors.email}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">كلمة المرور</Label>
                            {/* {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    هل نسيت كلمة المرور؟
                                </Link>
                            )} */}
                        </div>
                        <Input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        {errors.password && (
                            <p className="text-destructive">
                                {errors.password}
                            </p>
                        )}
                    </div>
                 
                    <Button
                        type="submit"
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                    >
                        تسجيل الدخول
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
