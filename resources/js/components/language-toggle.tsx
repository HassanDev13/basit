import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageProps } from "@/types";
import { cn } from "@/utils/cn";
import { usePage } from "@inertiajs/react";
import { Dot, Languages } from "lucide-react";
import { Button } from "./ui/button";

function LanguageToggle() {
    const { locale } = usePage<PageProps>().props;
    return (
        <DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground"
                    >
                        <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        className={cn(
                            "justify-between",
                            locale === "ar" && "text-green-600"
                        )}
                    >
                        <a href={"/language/ar"} className="flex gap-x-2">
                            <img
                                src="https://flagcdn.com/w320/sa.png"
                                alt="country flag"
                                className="object-cover w-5 h-5 rounded-full"
                            />
                            العربية
                        </a>
                        {locale === "ar" && <Dot />}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className={cn(
                            "justify-between",
                            locale === "en" && "text-green-600"
                        )}
                    >
                        <a href={"/language/en"} className="flex gap-x-2">
                            <img
                                src="https://flagcdn.com/w320/gb.png"
                                alt="country flag"
                                className="object-cover w-5 h-5 rounded-full"
                            />
                            English
                        </a>
                        {locale === "en" && <Dot />}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </DropdownMenu>
    );
}

export default LanguageToggle;
