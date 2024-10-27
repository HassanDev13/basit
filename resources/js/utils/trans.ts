import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

type PropsWithTranslations = {
    translations: Record<string, string>;
} & PageProps;
export function t(key: string, replace: Record<string, string> = {}): string {
    const { translations } = usePage<PropsWithTranslations>().props;
    let translation = translations[key] ? translations[key] : key;

    Object.keys(replace).forEach(function (replaceKey) {
        translation = translation.replace(
            ":" + replaceKey,
            replace[replaceKey]
        );
    });

    return translation;
}
