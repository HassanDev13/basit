//get dir based on local

import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
const RTL_LANGUAGES = [
    "ar",
    "fa",
    "he",
    "ur",
    "ps",
    "dv",
    "ku",
    "sd",
    "ug",
    "yi",
];

export const useDir = () => {
    const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
    const { locale } = usePage<PageProps>().props;
    useEffect(() => {
        setDirection(RTL_LANGUAGES.includes(locale) ? "rtl" : "ltr");
    }, [locale]);

    return direction;
};
