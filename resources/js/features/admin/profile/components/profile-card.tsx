import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaFooter,
    CredenzaTrigger,
} from "@/components/ui/credenza";
import { Progress } from "@/components/ui/progress";
import { PageProps } from "@/types";
import { formatBytes } from "@/utils/helpers";
import { t } from "@/utils/trans";
import { useForm, usePage } from "@inertiajs/react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Mail, UploadCloud, User2 } from "lucide-react";
import { useCallback } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { toast } from "sonner";

function ProfileCard() {
    const {
        auth: { user },
    } = usePage<PageProps>().props;
    return (
        <Card className="w-full">
            <CardContent className="p-0">
                <div className="flex flex-col justify-between gap-4 m-4 sm:flex-row">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={user.avatar_url} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-black capitalize md:text-2xl">
                                {user.first_name} {user.last_name}
                            </h1>
                            <div className="flex flex-col md:gap-6 md:items-center md:flex-row">
                                <div
                                    className="flex items-center gap-1 text-muted-foreground"
                                    dir="ltr"
                                >
                                    <User2 className="w-4 h-4" />
                                    Admin
                                </div>
                                <div
                                    className="flex items-center gap-1 text-muted-foreground"
                                    dir="ltr"
                                >
                                    <Mail className="w-4 h-4" />
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <AvatarDialog />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function AvatarDialog() {
    const { data, setData, post, progress } = useForm({
        _method: "patch",
        avatar: null as File | null,
    });
    const updateAvatar = () => {
        post(route("admin.profile.update-avatar"));
    };
    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
            setData("avatar", newFiles[0]);
            if (rejectedFiles.length > 0) {
                rejectedFiles.forEach(({ file }) => {
                    toast.error(`File ${file.name} was rejected`);
                });
            }
        },

        [data.avatar, setData]
    );
    function onRemove() {
        setData("avatar", null);
    }
    return (
        <Credenza>
            <CredenzaTrigger asChild>
                <Button>{t("update_avatar")}</Button>
            </CredenzaTrigger>
            <CredenzaContent>
                <CredenzaBody>
                    <Dropzone
                        onDrop={onDrop}
                        accept={{ "image/*": [] }}
                        maxSize={1024 * 1024 * 2}
                        multiple={false}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div
                                className="flex flex-col items-center justify-center gap-2 p-8 cursor-pointer"
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <UploadCloud className="w-10 h-10 md:h-14 md:w-14 text-muted-foreground" />
                                <p className="text-sm text-center md:text-base">
                                    {`${t("drag_and_drop")} ${t("or")} `}{" "}
                                    <span className="underline text-primary">
                                        {t("browse_files")}
                                    </span>
                                </p>
                            </div>
                        )}
                    </Dropzone>
                    {data.avatar ? (
                        <div className="space-y-4 max-h-48">
                            <FileCard
                                file={data.avatar}
                                onRemove={() => onRemove()}
                                progress={progress?.percentage}
                            />
                        </div>
                    ) : null}
                </CredenzaBody>

                <CredenzaFooter>
                    <Button onClick={updateAvatar}>Save</Button>
                    <CredenzaClose asChild>
                        <Button variant="secondary">Close</Button>
                    </CredenzaClose>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    );
}

interface FileCardProps {
    file: File;
    onRemove: () => void;
    progress?: number;
}

function FileCard({ file, progress, onRemove }: FileCardProps) {
    return (
        <div className="relative flex items-center space-x-4">
            <div className="flex flex-1 gap-4">
                {isFileWithPreview(file) ? (
                    <img
                        src={file.preview}
                        alt={file.name}
                        width={48}
                        height={48}
                        className="object-cover rounded-md aspect-square shrink-0"
                    />
                ) : null}
                <div className="flex flex-col w-full gap-2">
                    <div className="space-y-px">
                        <p className="text-sm font-medium line-clamp-1 text-foreground/80">
                            {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {formatBytes(file.size)}
                        </p>
                    </div>
                    {progress ? <Progress value={progress} /> : null}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-7"
                    onClick={onRemove}
                >
                    <Cross2Icon className="size-4 " aria-hidden="true" />
                    <span className="sr-only">Remove file</span>
                </Button>
            </div>
        </div>
    );
}
function isFileWithPreview(file: File): file is File & { preview: string } {
    return "preview" in file && typeof file.preview === "string";
}
export default ProfileCard;
