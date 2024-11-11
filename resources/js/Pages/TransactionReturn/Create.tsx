import { useEffect, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"; // Import your Popover components
import {
    Command,
    CommandInput,
    CommandList,
    CommandItem,
    CommandEmpty,
    CommandGroup,
} from "@/components/ui/command"; // Adjust imports based on your UI library
import { Check, ChevronsUpDown } from "lucide-react"; // Ensure these icons are imported
import { Purchase, Expense, Sale, ReturnType, Product } from "@/types";
import { cn } from "@/utils/cn";
import { Textarea } from "@/components/ui/textarea";

export default function Create() {
    const {
        type: returnType,
        purchase: initialPurchase,
        sale: initialSale,
        expense: initialExpense,
        product,
        quantity,
        amount,
    } = usePage<{
        type: ReturnType;
        purchase: Purchase;
        sale: Sale;
        expense: Expense;
        product: Product;
        quantity: number;
        amount: number;
    }>().props;

    const { data, setData, errors, post, processing } = useForm<{
        product_id: number;
        max_quantity: number;
        return_type: string;
        quantity: number;
        purchase_id: number;
        sale_id: number;
        expense_id: number;
        amount: number;
        max_amount: number;
        reason: string;
    }>({
        product_id: product?.id,
        max_quantity: quantity,
        return_type: returnType,
        quantity: quantity,
        purchase_id: initialPurchase?.id ,
        sale_id: initialSale?.id ,
        expense_id: initialExpense?.id ,
        amount: amount,
        max_amount: amount,
        reason: "",
    });

    // Handle input changes
    function handleChange(
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) {
        const key = e.target.id;
        const value = e.target.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
    }

    // Handle form submission
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route("returns.store"));
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-sm space-y-6 md:mt-4"
        >
            <h1 className="text-2xl font-bold text-right mb-6"> إرجاع</h1>

            {/* {errors && Object.keys(errors).map((key) => (
                <p key={key} className="text-xs text-red-500">
                    {errors[key]}
                </p>
            ))} */}
            {data.return_type === "purchase" && (
                <>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="quantity" className="text-right">
                            إسم المنتج
                        </Label>
                        <Input
                            disabled={true}
                            type="string"
                            value={initialPurchase.product.name}
                            placeholder={initialPurchase.product.name}
                            error={errors.purchase_id}
                            onChange={handleChange}
                            className="text-right w-full"
                        />
                    </div>
                </>
            )}


            {data.return_type === "sale" && (
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="quantity" className="text-right">
                        إسم المنتج
                    </Label>
                    <Input
                        disabled={true}
                        type="string"
                        value={initialSale.product.name}
                        placeholder={initialSale.product.name}
                        error={errors.purchase_id}
                        onChange={handleChange}
                        className="text-right w-full"
                    />
                </div>
            )}

            {data.return_type === "expense" && (
                <>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="quantity" className="text-right">
                            نوع المصروف
                        </Label>
                        <Input
                            disabled={true}
                            type="string"
                            value={initialExpense.expense_type.name}
                            placeholder={initialExpense.expense_type.name}
                            error={errors.expense_id}
                            onChange={handleChange}
                            className="text-right w-full"
                        />
                    </div>
                </>
            )}
            {returnType !== "expense" && (
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="quantity" className="text-right">
                        الكمية المشتراة
                    </Label>
                    <Input
                        id="quantity"
                        type="number"
                        value={data.quantity}
                        error={errors.quantity}
                        placeholder="الكمية المشتراة"
                        onChange={handleChange}
                        className="text-right w-full"
                    />
                </div>
            )}

            {returnType === "expense" && (
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="quantity" className="text-right">
                        المبلغ المرجع
                    </Label>
                    <Input
                        id="amount"
                        type="number"
                        value={data.amount}
                        error={errors.amount}
                        placeholder="المبلغ المرجع"
                        onChange={handleChange}
                        className="text-right w-full"
                    />
                </div>
            )}
            <div className="flex flex-col space-y-2">
                <Label htmlFor="reason" className="text-right">
                    السبب
                </Label>

                <Textarea
                    placeholder="سبب الإرجاع ؟"
                    value={data.reason}
                    onChange={(e) => setData("reason", e.target.value)}
                    className="text-right w-full resize-y"
                />
                <p className="text-xs text-red-500">{errors.reason}</p>
            </div>

            <div className="flex justify-between">
                <Button
                    type="button"
                    className="bg-white hover:bg-gray-500 text-black px-4 py-2 rounded shadow-sm"
                    onClick={() => {
                        switch (returnType) {
                            case "expense":
                                router.get(route("expenses.index"));
                                break;
                            case "purchase":
                                router.get(route("purchases.index"));
                                break;
                            case "sale":
                                router.get(route("sales.index"));
                                break;
                            default:
                                break;
                        }
                    }}
                >
                    رجوع
                </Button>
                <Button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded shadow-sm"
                    disabled={processing}
                >
                    إنشاء
                </Button>
            </div>
        </form>
    );
}
