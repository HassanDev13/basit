import LanguageToggle from "@/components/language-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { t } from "@/utils/trans";
import { Search } from "lucide-react";

function NavbarActions() {
    return (
        <div className="flex items-center gap-3 px-2 py-1 rounded-full bg-card">
            <Button
                variant={"ghost"}
                className="flex px-4 py-2 rounded-full shadow-none gap-x-2 bg-muted text-muted-foreground"
            >
                <Search className="w-4 h-4" />
                <span className="sr-only md:not-sr-only">{t("search")}</span>
            </Button>
            <LanguageToggle />
            <ModeToggle />
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    );
}

export default NavbarActions;
