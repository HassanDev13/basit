"use client";

import { User } from "@/types";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDir } from "@/hooks/use-dir";
import { t } from "@/utils/trans";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "first_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t("first_name")} />
        ),
    },
    {
        accessorKey: "last_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t("last_name")} />
        ),
    },
    {
        accessorKey: "gender",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t("gender")} />
        ),
        cell: function FieldCell({ row }) {
            const gender = row.original.gender;

            return <div>{gender}</div>;
        },
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={t("phone")} />
        ),
    },

    {
        id: "actions",
        header: () => {
            return <div className="w-full text-center">{t("more")}</div>;
        },

        cell: function ActionCell({ row }) {
            const id = row.original.id;

            const direction = useDir();
            return (
                <DropdownMenu dir={direction as "rtl" | "ltr"}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full h-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem className="text-center">
                            <Link href={"/"}>{t("edit")}</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
