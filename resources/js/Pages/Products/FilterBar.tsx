import { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import { usePrevious } from "react-use";
import pickBy from "lodash/pickBy";
import { ChevronDown, Undo2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function FilterBar() {
    const { filters } = usePage<{
        filters: { role?: string; search?: string; trashed?: string };
    }>().props;

    const [opened, setOpened] = useState(false);

    const [values, setValues] = useState({
        role: filters.role || "", // role is used only on users page
        search: filters.search || "",
        trashed: filters.trashed || "",
    });

    const prevValues = usePrevious(values);

    function reset() {
        setValues({
            role: "",
            search: "",
            trashed: "",
        });
    }

    useEffect(() => {
        // https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
        if (prevValues) {
            const query = Object.keys(pickBy(values)).length
                ? pickBy(values)
                : {};

            router.get(route(route().current() as string), query, {
                replace: true,
                preserveState: true,
            });
        }
    }, [values]);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const name = e.target.name;
        const value = e.target.value;

        setValues((values) => ({
            ...values,
            [name]: value,
        }));

        if (opened) setOpened(false);
    }

    return (
        <div className="flex items-center w-full max-w-md gap-3">
            <div className="relative flex bg-white rounded shadow">
                <div
                    style={{ top: "100%" }}
                    className={`absolute ${opened ? "" : "hidden"}`}
                >
                    <div
                        onClick={() => setOpened(false)}
                        className="fixed inset-0 z-20 bg-black opacity-25"
                    />
                    <div className="relative z-30 w-64 px-4 py-6 mt-2 bg-white rounded shadow-lg space-y-4">
                        filter
                    </div>
                </div>
                {/* <button
                    onClick={() => setOpened(true)}
                    className="px-4 border-r rounded-l md:px-6 hover:bg-gray-100 focus:outline-none focus:border-white focus:ring-2 focus:ring-indigo-400 focus:z-10"
                >
                    <div className="flex items-center">
                        <span className="hidden text-gray-700 md:inline">
                            Filter
                        </span>
                        <ChevronDown
                            size={14}
                            strokeWidth={3}
                            className="md:ml-2"
                        />
                    </div>
                </button> */}
                <Input
                    name="search"
                    placeholder="بحث .."
                    autoComplete="off"
                    value={values.search}
                    onChange={handleChange}
                    className="border-0 rounded-l-none focus:ring-2"
                />
            </div>
            <button
                onClick={reset}
                className="ml-3 text-sm text-gray-600 hover:text-gray-700 focus:text-indigo-700 focus:outline-none hover:bg-yellow-400"
                type="button"
            >
                <Undo2/>
            </button>
        </div>
    );
}
