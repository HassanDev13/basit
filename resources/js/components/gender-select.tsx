import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useDir } from "@/hooks/use-dir";
import { cn } from "@/lib/utils";
import { t } from "@/utils/trans";

type GenderSelectProps = {
    error?: string;
    triggerProps?: React.ComponentPropsWithoutRef<typeof SelectTrigger>;
} & React.ComponentPropsWithoutRef<typeof Select>;
function GenderSelect({ error, triggerProps, ...props }: GenderSelectProps) {
    const dir = useDir();
    return (
        <div>
            <Select {...props} dir={dir}>
                <SelectTrigger className={cn(triggerProps?.className)}>
                    <SelectValue placeholder={t("gender")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="Male">{t("male")}</SelectItem>
                        <SelectItem value="Female">{t("female")}</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {error && (
                <p className="mt-2 text-sm text-destructive">{error}</p> // Display the error message if provided
            )}
        </div>
    );
}

export default GenderSelect;
