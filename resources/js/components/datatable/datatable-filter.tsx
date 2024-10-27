import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Option } from "@/types";
import { t } from "@/utils/trans";
import { useDir } from "@/hooks/use-dir";

interface DataTableFilterProps {
    title?: string;
    options: Option[];
    selectedValues: {
        [key: string]: string;
    };
    handleFilterChange: (filterName: string, value: string) => void;
    clearFilters: (name: string) => void;
}

export function DataTableFilter({
    title,
    options,
    selectedValues,
    handleFilterChange,
    clearFilters,
}: DataTableFilterProps) {
    // Find the selected value for the current filter (by title)
    const selectedValue = selectedValues[title || ""];
    const selectedLabel = options.find(
        (option) => option.value === selectedValue
    )?.label;
    const direction = useDir();
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-dashed"
                >
                    <PlusCircledIcon
                        className={cn(
                            "mr-2 size-4",
                            direction === "rtl" && "mr-auto ml-2"
                        )}
                    />
                    {t(title || "")}
                    {selectedValue && (
                        <>
                            <Separator
                                orientation="vertical"
                                className="h-4 mx-2"
                            />
                            <Badge
                                variant="secondary"
                                className="px-1 font-normal rounded-sm"
                            >
                                {selectedLabel}
                            </Badge>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[12.5rem] p-0" align="start">
                <Command>
                    <CommandInput
                        placeholder={title}
                        className="border-none placeholder:capitalize"
                    />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected =
                                    selectedValue === option.value;

                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() =>
                                            handleFilterChange(
                                                title || "",
                                                option.value
                                            )
                                        }
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <CheckIcon
                                                className="size-4"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <span>{option.label}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                        {selectedValue && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() =>
                                            clearFilters(title || "")
                                        }
                                        className="justify-center text-center"
                                    >
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
