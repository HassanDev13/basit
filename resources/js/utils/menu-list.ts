import {
    Building,
    Languages,
    LayoutGrid,
    LucideIcon,
    Settings,
    Settings2,
    UserCheck2,
    UserCircle2,
    Users2,
} from "lucide-react";
import { t } from "./trans";

type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/admin/dashboard",
                    label: t("dashboard"),
                    active: pathname.includes("/dashboard"),
                    icon: LayoutGrid,
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: t("resources"),
            menus: [
                {
                    href: "/admin/users",
                    label: t("users"),
                    active: pathname.includes("/users"),
                    icon: Users2,
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: t("preferences"),
            menus: [
                {
                    href: "",
                    label: t("account"),
                    active: pathname.includes("/account"),
                    icon: UserCircle2,
                    submenus: [
                        {
                            href: "/admin/account/profile",
                            label: t("profile"),
                            active: pathname.includes("/profile"),
                        },
                        {
                            href: "/admin/account/website",
                            label: t("website_settings"),
                            active: pathname.includes("/company"),
                        },
                    ],
                },
                {
                    href: "",
                    label: t("settings"),
                    active: pathname.includes("/settings"),
                    icon: Settings2,
                    submenus: [
                        {
                            href: "admin/settings/translations",
                            label: t("translations"),
                            active: pathname.includes("/translations"),
                        },
                        {
                            href: "admin/settings/company",
                            label: t("role_permissions"),
                            active: pathname.includes("/company"),
                        },
                    ],
                },
            ],
        },
    ];
}
