import GenderSelect from "@/components/gender-select";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageProps } from "@/types";
import { t } from "@/utils/trans";
import { useForm, usePage } from "@inertiajs/react";

function InformationForm() {
    const {
        auth: { user },
    } = usePage<PageProps>().props;
    const { data, setData, patch, processing, errors } = useForm({
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        bio: user.bio || "",
    });
    console.log(user);
    const handleUpdate = () => {
        patch(route("admin.profile.update"), {
            preserveScroll: true,
        });
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">{t("profile")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col w-full gap-3">
                    <div className="flex flex-col w-full gap-4 lg:flex-row">
                        <div className="flex-1">
                            <Label>
                                {t("username")}{" "}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                type="text"
                                placeholder="John Doe"
                                id={"username"}
                                name={"username"}
                                value={data.username}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                                error={errors.username}
                            />
                        </div>
                        <div className="flex-1">
                            <Label>
                                {t("email")}{" "}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                type="text"
                                placeholder="email@example.com"
                                id={"email"}
                                name={"email"}
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                error={errors.email}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-3">
                    <div className="flex flex-col w-full gap-4 lg:flex-row">
                        <div className="flex-1">
                            <Label>
                                {t("first_name")}{" "}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                type="text"
                                placeholder="John"
                                id={"first_name"}
                                name={"first_name"}
                                value={data.first_name}
                                onChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex-1">
                            <Label>
                                {t("last_name")}{" "}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                type="text"
                                placeholder="Doe"
                                id={"last_name"}
                                name={"last_name"}
                                value={data.last_name}
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-4 lg:flex-row">
                        <div className="flex-1">
                            <Label>
                                {t("phone")}{" "}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                type="number"
                                placeholder="0xxxxxxxxx"
                                id={"phone"}
                                name={"phone"}
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                error={errors.phone}
                            />
                        </div>
                        <div className="flex-1">
                            <Label>
                                {t("gender")}{" "}
                                <span className="text-destructive">*</span>
                            </Label>
                            <GenderSelect
                                name={"gender"}
                                value={data.gender}
                                onValueChange={(gender) =>
                                    setData(
                                        "gender",
                                        gender as typeof data.gender
                                    )
                                }
                                error={errors.gender}
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <Label>{t("bio")}</Label>
                        <Textarea
                            placeholder={t("write_about_yourself")}
                            id={"bio"}
                            name={"bio"}
                            value={data.bio}
                            onChange={(e) => setData("bio", e.target.value)}
                            error={errors.bio}
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleUpdate} disabled={processing}>
                    {t("update")}
                </Button>
            </CardFooter>
        </Card>
    );
}

export default InformationForm;
