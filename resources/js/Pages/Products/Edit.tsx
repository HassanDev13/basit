import { useEffect, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/layouts/admin-layout";
import { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function Edit() {
    const { product } = usePage<{ product: Product }>().props;
    const { toast } = useToast();
    const { data, setData, errors, put, processing, setError } = useForm({
        name: product.name || "",
        price: product.price || "",
        cost: product.cost || "",
        quantity: product.quantity || "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        put(route("products.update", product.id), {
            onFinish: () => {
                toast({
                    title: "تم التحديث بنجاح",
                    description: "تم تحديث البيانات بنجاح.",
                });
            },
        }); // Update endpoint to match your route
    }

    return (
        <form
        onSubmit={handleSubmit}
        className="mx-auto p-6 bg-gray-50 rounded-lg shadow-sm space-y-6 md:mt-4"
    >
        <h1 className="text-2xl font-bold text-right mb-6">
            تعديل المنتج
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col space-y-2">
                <Label htmlFor="name" className="text-right">
                    الاسم
                </Label>
                <Input
                    id="name"
                    error={errors.name}
                    value={data.name}
                    placeholder="الاسم"
                    onChange={handleChange}
                    className="text-right w-full"
                />
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="cost" className="text-right">
                    التكلفة
                </Label>
                <Input
                    id="cost"
                    type="number"
                    error={errors.cost}
                    value={data.cost}
                    placeholder="التكلفة"
                    onChange={handleChange}
                    className="text-right w-full"
                />
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="price" className="text-right">
                    السعر
                </Label>
                <Input
                    id="price"
                    type="number"
                    error={errors.price}
                    value={data.price}
                    placeholder="السعر"
                    onChange={handleChange}
                    className="text-right w-full"
                />
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="quantity" className="text-right">
                    الكمية
                </Label>
                <Input
                    id="quantity"
                    type="number"
                    error={errors.quantity}
                    value={data.quantity}
                    placeholder="الكمية"
                    onChange={handleChange}
                    className="text-right w-full"
                />
            </div>
        </div>

        <div className="flex justify-between">
            <Button
                type="button"
                className="bg-white hover:bg-gray-500 text-black px-4 py-2 rounded shadow-sm"
                onClick={() => router.get(route("products.index"))}
            >
                رجوع
            </Button>
            <Button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded"
            >
                تعديل
            </Button>
        </div>
    </form>
    );
}
