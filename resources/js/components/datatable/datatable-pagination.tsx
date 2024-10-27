import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Link, router, usePage } from "@inertiajs/react";
import { useDir } from "@/hooks/use-dir";
import { t } from "@/utils/trans";

interface DataTablePaginationProps<TData> {
    pageSizeOptions?: number[];
    pageSize: number;
    currentPage: number;
    lastPage: number;
}

export function DataTablePagination<TData>({
    pageSizeOptions = [10, 20, 30, 40, 50],
    pageSize,
    currentPage,
    lastPage,
}: DataTablePaginationProps<TData>) {
    const direction = useDir();
    const { url } = usePage();
    const FirstPageIcon =
        direction === "rtl" ? DoubleArrowRightIcon : DoubleArrowLeftIcon;
    const LastPageIcon =
        direction === "rtl" ? DoubleArrowLeftIcon : DoubleArrowRightIcon;
    const PrevPageIcon =
        direction === "rtl" ? ChevronRightIcon : ChevronLeftIcon;
    const NextPageIcon =
        direction === "rtl" ? ChevronLeftIcon : ChevronRightIcon;

    const handlePageChange = (page: number) => {
        // Inertia visit to update the page content with filters
        router.get(
            url,
            { page },
            {
                replace: true, // Prevent adding history stack entries
                preserveState: true,
            }
        );
    };

    const handleLimitChange = (limit: number) => {
        // Inertia visit to update the page content with filters
        router.get(
            url,
            { limit },
            {
                replace: true, // Prevent adding history stack entries
                preserveState: true,
            }
        );
    };

    return (
        <div className="flex flex-col-reverse items-center justify-between w-full gap-4 p-1 overflow-auto sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2">
                <p className="text-sm font-medium whitespace-nowrap">
                    {t("row_per_page")}
                </p>
                <Select
                    value={`${pageSize}`}
                    onValueChange={(v) => handleLimitChange(parseInt(v))}
                >
                    <SelectTrigger className="h-8 w-[4.5rem]">
                        <SelectValue placeholder={pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {pageSizeOptions.map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                <div className="flex items-center justify-center text-sm font-medium">
                    {t("page")} {currentPage} {t("of")} {lastPage}
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        aria-label="Go to first page"
                        size={"sm"}
                        variant={"outline"}
                        onClick={() => handlePageChange(1)}
                    >
                        <FirstPageIcon className="size-3" aria-hidden="true" />
                    </Button>
                    <Button
                        aria-label="Go to first page"
                        size={"sm"}
                        variant={"outline"}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage - 1 == 0}
                    >
                        <PrevPageIcon className="size-3" aria-hidden="true" />
                    </Button>
                    <Button
                        aria-label="Go to first page"
                        size={"sm"}
                        variant={"outline"}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage + 1 > lastPage}
                    >
                        <NextPageIcon className="size-3" aria-hidden="true" />
                    </Button>
                    <Button
                        aria-label="Go to first page"
                        size={"sm"}
                        variant={"outline"}
                        onClick={() => handlePageChange(lastPage)}
                    >
                        <LastPageIcon className="size-3" aria-hidden="true" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
