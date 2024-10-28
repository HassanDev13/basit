import { useEffect, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Check, ChevronsUpDown } from "lucide-react";
import { Product } from "@/types";
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

export default function CreateSale() {
    const [addProduct, setAddProduct] = useState(false);
    const { products: initialProducts } = usePage<{ products: Product[] }>().props;
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        setData((prevdata) => ({
            ...prevdata,
            addNewProduct: addProduct,
        }));
    }, [addProduct]);

    const { data, setData, errors, post, processing, setError } = useForm({
        name: "",
        product_id: "",
        product : null as Product | null,
        addNewProduct: addProduct,
        quantity: "",
        final_price: "",
        sale_date: new Date().toISOString().split("T")[0],
        status: "approved",
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
        post(route("sales.store"));
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-sm space-y-6 md:mt-4"
        >
            <h1 className="text-2xl font-bold text-right mb-6">إضافة بيع</h1>

            <div className="flex flex-col space-y-2">
                <Label htmlFor="product" className="text-right">
                    المنتج
                </Label>
                <div className="flex gap-2">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                disabled={addProduct}
                                aria-expanded={open}
                                className="w-full justify-between"
                            >
                                {data.product_id
                                    ? initialProducts.find(
                                          (product) =>
                                              product.id.toString() === data.product_id.toString()
                                      )?.name
                                    : "إختر منتج"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search product..." />
                                <CommandList>
                                    <CommandEmpty>No product found.</CommandEmpty>
                                    <CommandGroup>
                                        {initialProducts.map((product) => (
                                            <CommandItem
                                                key={product.id}
                                                value={`${product.name}-${product.id}`}
                                                onSelect={(value) => {
                                                    const selectedId = value.split("-").pop();
                                                    const currentValue = initialProducts.find(
                                                        (product) =>
                                                            product.id.toString() === selectedId
                                                    );

                                                    setData({
                                                        ...data,
                                                        product_id: currentValue?.id.toString() || "",
                                                        final_price : currentValue?.price.toString() || "",
                                                        quantity : currentValue?.quantity.toString() || "",
                                                    });
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        data.product_id ===
                                                            product.id.toString()
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {product.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                   
                </div>
                <p className="text-xs text-red-500">{errors.product_id}</p>
            </div>

           

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="quantity" className="text-right">
                        الكمية المباعة
                    </Label>
                    <Input
                        id="quantity"
                        type="number"
                        value={data.quantity}
                        error={errors.quantity}
                        max={data.quantity}
                        placeholder="الكمية"
                        onChange={handleChange}
                        className="text-right w-full"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="final_price" className="text-right">
                        السعر النهائي
                    </Label>
                    <Input
                        id="final_price"
                        type="number"
                        value={data.final_price}
                        error={errors.final_price}
                        placeholder="السعر النهائي"
                        onChange={handleChange}
                        className="text-right w-full"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="sale_date" className="text-right">
                        تاريخ البيع
                    </Label>
                    <Input
                        dir="ltr"
                        id="sale_date"
                        type="date"
                        value={data.sale_date}
                        error={errors.sale_date}
                        onChange={handleChange}
                        className="direction-reverse text-left"
                    />
                </div>
            </div>

            <div className="flex justify-between">
                <Button
                    type="button"
                    className="bg-white hover:bg-gray-500 text-black px-4 py-2 rounded shadow-sm"
                    onClick={() => router.get(route("sales.index"))}
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
