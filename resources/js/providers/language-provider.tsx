import { cn } from "@/utils/cn";
import React, { PropsWithChildren, useEffect, useRef } from "react";

type LanguageProviderProps = PropsWithChildren<{ locale: string }>;

function LanguageProvider({ children, locale }: LanguageProviderProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.dir = locale === "ar" ? "rtl" : "ltr";
        }
    }, [locale]);

    return (
        <div
            ref={ref}
            dir={locale === "ar" ? "rtl" : "ltr"}
            className={cn(locale)}
        >
            {children}
        </div>
    );
}

export default LanguageProvider;
