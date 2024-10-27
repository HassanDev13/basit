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
import { PasswordInput } from "@/components/ui/password-input";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
function RegisterForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Register</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form className="grid gap-4" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />

                        {errors.name && (
                            <p className="text-destructive">{errors.email}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            autoComplete="email"
                            value={data.email}
                            placeholder="m@example.com"
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        {errors.name && (
                            <p className="text-destructive">{errors.email}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput
                            id="password"
                            name="password"
                            autoComplete="new-password"
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
                    <div className="grid gap-2">
                        <Label htmlFor="password">Confirm Password</Label>
                        <PasswordInput
                            id="password_confirmation"
                            name="password_confirmation"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />

                        {errors.password_confirmation && (
                            <p className="text-destructive">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route("login")}
                            className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Already registered?
                        </Link>

                        <Button className="ms-4" disabled={processing}>
                            Register
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default RegisterForm;
