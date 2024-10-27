import { SlashIcon } from "@radix-ui/react-icons";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import NavbarActions from "./navbar-actions";
import { Home } from "lucide-react";
import { SheetMenu } from "./sheet-menu";
import { t } from "@/utils/trans";

type NavbarProps = {
    name: string;
};
function Navbar({ name }: NavbarProps) {
    return (
        <nav className="sticky top-0 z-40 flex items-center justify-between px-8 py-3 backdrop-blur-xl">
            <Breadcrumb className="hidden lg:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">
                            <Home className="w-5 h-5" />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/dashboard">
                            {t("admin")}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage>{name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <SheetMenu />
            <NavbarActions />
        </nav>
    );
}

export default Navbar;
