import { Filter } from "@/types";

export const FILTERS: Filter[] = [
    {
        name: "gender",
        options: [
            {
                label: "All",
                value: "all",
            },
            {
                label: "Male",
                value: "male",
            },
            {
                label: "Female",
                value: "female",
            },
        ],
    },
    {
        name: "role",
        options: [
            {
                label: "All",
                value: "all",
            },
            {
                label: "Admin",
                value: "administrator",
            },
            {
                label: "Super Admin",
                value: "superadministrator",
            },
        ],
    },
];
