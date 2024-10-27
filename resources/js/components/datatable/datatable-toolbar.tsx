import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDir } from "@/hooks/use-dir";
import { useSearchAndFilters } from "@/hooks/use-search";
import { Filter } from "@/types";
import { t } from "@/utils/trans";
import { Cross2Icon } from "@radix-ui/react-icons";
import { File, PlusCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DataTableFilter } from "./datatable-filter";
import { cn } from "@/utils/cn";

type DataTableToolbarProps = {
    filters: Filter[];
    canCreate?: boolean;
    handleCreate?: () => void;
    handleExport: (type: "pdf" | "xlsx") => void;
};

const DataTableToolbar = ({
    filters,
    canCreate = true,
    handleCreate,
    handleExport,
}: DataTableToolbarProps) => {
    const dir = useDir();

    const {
        searchTerm,
        selectedFilters,
        handleSearchChange,
        handleFilterChange,
        clearFilters,
    } = useSearchAndFilters({ filters });
    const hasSelectedFilters = Object.keys(selectedFilters).length > 0;

    return (
        <div className="flex items-center gap-2 overflow-x-auto ">
            <div className="flex items-center gap-2">
                <Input
                    type="text"
                    placeholder={`${t("search")} ...`}
                    className="w-[12rem] md:w-[16rem]"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {filters.map((filter) => (
                    <DataTableFilter
                        clearFilters={clearFilters}
                        handleFilterChange={handleFilterChange}
                        options={filter.options}
                        key={filter.name}
                        selectedValues={selectedFilters}
                        title={filter.name}
                    />
                ))}
                {hasSelectedFilters && (
                    <Button
                        aria-label="Reset filters"
                        variant="ghost"
                        className="h-8 px-2 lg:px-3"
                        onClick={() => clearFilters()} // Clear all filters when clicked
                    >
                        Reset
                        <Cross2Icon
                            className="ml-2 size-4"
                            aria-hidden="true"
                        />
                    </Button>
                )}
            </div>

            <div
                className={cn(
                    "flex items-center gap-2 ml-auto",
                    dir === "rtl" && "ml-0 mr-auto"
                )}
            >
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 h-7"
                        >
                            <File className="h-3.5 w-3.5" />
                            <span>{t("export")}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={() => handleExport("pdf")}
                            className="cursor-pointer"
                        >
                            Export as PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleExport("xlsx")}
                            className="cursor-pointer"
                        >
                            Export as XLSX
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {canCreate && (
                    <Button
                        size="sm"
                        className="gap-1 h-7"
                        onClick={handleCreate}
                    >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span>{t("create")}</span>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default DataTableToolbar;
