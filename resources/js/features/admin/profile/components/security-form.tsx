import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { t } from "@/utils/trans";
import { useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";

function SecurityForm() {
    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">{t("security")}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="flex-1">
                        <Label>{t("old_password")}</Label>
                        <PasswordInput
                            id={"old_password"}
                            name={"old_password"}
                            error={errors.current_password}
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                        />
                    </div>
                    <div className="flex-1">
                        <Label>{t("password")}</Label>
                        <PasswordInput
                            id={"password"}
                            name={"password"}
                            error={errors.password}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </div>
                    <div className="flex-1">
                        <Label>{t("password_confirmation")}</Label>
                        <PasswordInput
                            id={"password_confirmation"}
                            name={"password_confirmation"}
                            error={errors.password_confirmation}
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={updatePassword} disabled={processing}>
                    {t("update")}
                </Button>
            </CardFooter>
        </Card>
    );
}

export default SecurityForm;
