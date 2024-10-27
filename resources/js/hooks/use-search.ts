import { useState, useEffect } from "react";
import { Filter } from "@/types";
import { router } from "@inertiajs/react";
import { filter } from "lodash";

type UseSearchAndFiltersProps = {
    filters: Filter[];
    defaultSearchTerm?: string;
};

export const useSearchAndFilters = ({
    filters,
    defaultSearchTerm = "",
}: UseSearchAndFiltersProps) => {
    const [searchTerm, setSearchTerm] = useState<string>(defaultSearchTerm);
    const [selectedFilters, setSelectedFilters] = useState<{
        [key: string]: string;
    }>({});

    // Initialize the filters and search term from query params
    useEffect(() => {
        const query = window.location.search;
        const params = new URLSearchParams(query);

        const initialFilters: { [key: string]: string } = {};
        filters.forEach((filter) => {
            if (params.get(filter.name)) {
                initialFilters[filter.name] = params.get(filter.name) || "";
            }
        });

        setSelectedFilters(initialFilters);

        if (params.get("search")) {
            setSearchTerm(params.get("search") || "");
        }
    }, []);

    // Handle search term change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        updateQueryParams(value, selectedFilters);
    };

    // Handle filter change
    const handleFilterChange = (filterName: string, value: string) => {
        const updatedFilters = { ...selectedFilters, [filterName]: value };
        setSelectedFilters(updatedFilters);
        updateQueryParams(searchTerm, updatedFilters);
    };

    // Update query params and make an Inertia visit to the same page
    const updateQueryParams = (
        search: string,
        filters: { [key: string]: string }
    ) => {
        const query = new URLSearchParams();

        if (search) query.set("search", search);
        Object.keys(filters).forEach((key) => {
            if (filters[key]) query.set(key, filters[key]);
        });

        router.replace(window.location.pathname + "?" + query.toString(), {
            preserveState: true, // Preserves state between visits
            preserveScroll: true, // Keeps scroll position
        });
    };
    const clearFilters = (filterName?: string) => {
        let updatedFilters: { [key: string]: string } = {};

        if (filterName) {
            // Remove the specified filter by key
            updatedFilters = Object.fromEntries(
                Object.entries(selectedFilters).filter(
                    ([key]) => key !== filterName
                )
            );
        } else {
            // Clear all filters
            updatedFilters = {};
        }

        setSelectedFilters(updatedFilters);
        updateQueryParams(searchTerm, updatedFilters);
    };

    return {
        searchTerm,
        selectedFilters,
        handleSearchChange,
        handleFilterChange,
        clearFilters,
    };
};
