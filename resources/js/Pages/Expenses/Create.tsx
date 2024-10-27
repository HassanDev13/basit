import { useEffect, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Check, ChevronsUpDown } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ExpenseType } from "@/types"; // Import your ExpenseType type

export default function CreateExpense() {
    const [addExpenseType, setAddExpenseType] = useState(false);
    const { expenseTypes: initialExpenseTypes } = usePage<{ expenseTypes: ExpenseType[] }>().props;
    const [open, setOpen] = useState(false);

    const { data, setData, errors, post, processing } = useForm({
        expense_type_id: "",
        amount: "",
        expense_date: new Date().toISOString().split("T")[0],
        new_expense_type: "",
        add_type : false,
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const key = e.target.id;
        const value = e.target.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route("expenses.store")); // Adjust the route as necessary
    }
    useEffect(() => {
        setData((prevdata) => ({
            ...prevdata,
            add_type: addExpenseType,
        }));
    }, [addExpenseType]);
    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-sm space-y-6 md:mt-4"
        >
            <h1 className="text-2xl font-bold text-right mb-6">إضافة مصروف</h1>

            <div className="flex flex-col space-y-2">
                <Label htmlFor="expense_type_id" className="text-right">
                    نوع المصروف
                </Label>
                <div className="flex gap-2">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                disabled={addExpenseType}
                                aria-expanded={open}
                                className="w-full justify-between"
                            >
                                {data.expense_type_id
                                    ? initialExpenseTypes.find(
                                          (type) => type.id.toString() === data.expense_type_id.toString()
                                      )?.name
                                    : "إختر نوع مصروف"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search expense type..." />
                                <CommandList>
                                    <CommandEmpty>No expense type found.</CommandEmpty>
                                    <CommandGroup>
                                        {initialExpenseTypes.map((type) => (
                                            <CommandItem
                                                key={type.id}
                                                value={`${type.name}-${type.id}`}
                                                onSelect={(value) => {
                                                    const selectedId = value.split("-").pop();
                                                    const currentValue = initialExpenseTypes.find(
                                                        (type) =>
                                                            type.id.toString() === selectedId
                                                    );

                                                    setData({
                                                        ...data,
                                                        expense_type_id: currentValue?.id.toString() || "",
                                                    });
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        data.expense_type_id === type.id.toString() ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {type.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    {addExpenseType ? (
                        <Button
                            type="button"
                            onClick={() => {
                                setAddExpenseType(false);
                                setData({ ...data, expense_type_id: "" });
                            }}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            onClick={() => {
                                setAddExpenseType(true);
                                setData({ ...data, expense_type_id: ""

                                 });
                            }}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                <p className="text-xs text-red-500">{errors.expense_type_id}</p>
            </div>
            {
                addExpenseType && (
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="new_expense_type" className="text-right">
                            إضافة نوع مصروف
                        </Label>
                        <Input
                            id="new_expense_type"
                            value={data.new_expense_type}
                            error={errors.new_expense_type}
                            type="text"
                            onChange={handleChange}
                            placeholder="نوع المصروف"
                            className="text-right w-full"
                        />
                    </div>
                )
            }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="amount" className="text-right">
                        المبلغ
                    </Label>
                    <Input
                        id="amount"
                        type="number"
                        value={data.amount}
                        error={errors.amount}
                        placeholder="المبلغ"
                        onChange={handleChange}
                        className="text-right w-full"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="expense_date" className="text-right">
                        تاريخ المصروف
                    </Label>
                    <Input
                        dir="ltr"
                        id="expense_date"
                        type="date"
                        value={data.expense_date}
                        error={errors.expense_date}
                        onChange={handleChange}
                        className="direction-reverse text-left"
                    />
                </div>
            </div>

            <div className="flex justify-between">
                <Button
                    type="button"
                    className="bg-white hover:bg-gray-500 text-black px-4 py-2 rounded shadow-sm"
                    onClick={() => router.get(route("expenses.index"))} // Adjust the route as necessary
                >
                    رجوع
                </Button>
                <Button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded"
                >
                    إضافة
                </Button>
            </div>
        </form>
    );
}
