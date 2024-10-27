import { useEffect, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Check, ChevronsUpDown } from "lucide-react";
import { Product, Purchase } from "@/types";
import { MultiSelect } from "@/features/admin/components/multi-select";
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
export default function CreateOrEdit() {
    const [addProduct, setAddProduct] = useState(false);
    const {
        products: initialProducts,
        isEdit,
        purchase ,
    } = usePage<{
        products: Product[];
        isEdit: boolean;
        purchase: Purchase | null;
    }>().props;
    const [open, setOpen] = useState(false);

    const { data, setData, errors, post, put, processing } = useForm({
        name: purchase?.product?.name || "",
        product_id: purchase?.product?.id || "",
        addNewProduct: addProduct,
        quantity: purchase?.quantity || "",
        cost: purchase?.cost || "",
        price: purchase?.product?.price || "",
        purchase_date:
            purchase?.purchase_date || new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            addNewProduct: addProduct,
        }));
    }, [addProduct]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    }

    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isEdit) {
            put(route("purchases.update", purchase?.id)); // Update route
        } else {
            post(route("purchases.store")); // Create route
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-sm space-y-6"
        >
            <h1 className="text-2xl font-bold text-right mb-6">
                {isEdit ? "تعديل الشراء" : "إضافة شراء"}
            </h1>
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
                                disabled={addProduct || isEdit}
                                aria-expanded={open}
                                className="w-full justify-between"
                            >
                                {data.product_id
                                    ? initialProducts.find(
                                          (product) =>
                                              product.id.toString() ===
                                              data.product_id.toString()
                                      )?.name
                                    : "إختر منتج"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search framework..." />
                                <CommandList>
                                    <CommandEmpty>
                                        No framework found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {initialProducts.map((product) => (
                                            <CommandItem
                                                key={product.id}
                                                value={`${product.name}-${product.id}`} 
                                                defaultValue={purchase?.product?.id}
                                                onSelect={(value) => {
                                                    // Extract the product ID from the selected value
                                                    const selectedId = value
                                                        .split("-")
                                                        .pop();

                                                    // Find the product by its unique ID
                                                    const currentValue =
                                                        initialProducts.find(
                                                            (product) =>
                                                                product.id.toString() ===
                                                                selectedId
                                                        )?.id;

                                                    // Update the state
                                                    setData({
                                                        ...data,
                                                        cost: product.cost.toString(),
                                                        price: product.price.toString(),
                                                        product_id:
                                                            currentValue?.toString() ||
                                                            "",
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
                                                {product.name} - {product.id}{" "}
                                                {/* Display both name and ID */}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    {addProduct ? (
                        <Button
                            type="button"
                            disabled={isEdit}
                            onClick={() => {
                                setAddProduct(false);
                                setData({
                                    ...data,
                                    product_id: "",
                                });
                            }}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            disabled={isEdit}
                            onClick={() => {
                                setAddProduct(true);
                                setData({
                                    ...data,
                                    product_id: "",
                                });
                            }}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                <p className="text-xs text-red-500">
                    {errors.product_id ?? errors.product_id}
                </p>
            </div>
            {addProduct && (
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="name" className="text-right">
                            الاسم
                        </Label>
                        <Input
                            id="name"
                            value={data.name}
                            error={errors.name}
                            placeholder="الاسم"
                            onChange={handleChange}
                            className="text-right w-full"
                        />
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="cost" className="text-right">
                        التكلفة
                    </Label>
                    <Input
                        id="cost"
                        type="number"
                        value={data.cost}
                        error={errors.cost}
                        disabled={!!data.product_id && !isEdit}
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
                        value={data.price}
                        error={errors.price}
                        disabled={!!data.product_id && !isEdit}
                        placeholder="السعر"
                        onChange={handleChange}
                        className="text-right w-full"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="purchase_date" className="text-right">
                        تاريخ الشراء
                    </Label>
                    <Input
                        dir="ltr"
                        id="purchase_date"
                        type="date"
                        error={errors.purchase_date}
                        value={data.purchase_date}
                        placeholder="تاريخ الشراء"
                        onChange={handleChange}
                        className="direction-reverse text-left "
                    />
                </div>
            </div>

            <div className="flex justify-between">
                <Button
                    type="button"
                    onClick={() => router.get(route("purchases.index"))}
                >
                    رجوع
                </Button>
                <Button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded"
                >
                    {isEdit ? "تحديث" : "إضافة"}
                </Button>
            </div>
        </form>
    );
}
