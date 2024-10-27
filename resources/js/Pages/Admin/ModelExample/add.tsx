import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "recharts";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    
    return (
        <>
            <Head title="Welcome" />
            <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold text-right mb-6">إضافة شراء</h1>
                <form className="space-y-6">
                    <div className="flex flex-col space-y-2">
                        <Label className="text-right">المنتج</Label>
                        <div className="flex">
                            <Button type="button" size="icon" variant="outline" className="rounded-l-none">
                                <Plus className="h-4 w-4" />
                            </Button>
                            <Input id="product" className="rounded-r-none text-right" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col space-y-2">
                            <Label className="text-right">الاسم</Label>
                            <Input id="name" className="text-right" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label className="text-right">السعر</Label>
                            <Input id="price" type="number" className="text-right" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label className="text-right">الكمية</Label>
                            <Input id="quantity" type="number" className="text-right" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col space-y-2">
                            <Label className="text-right">الكمية المشتراة</Label>
                            <Input id="purchasedQuantity" type="number" className="text-right" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label className="text-right">التكلفة</Label>
                            <Input id="cost" type="number" className="text-right" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label className="text-right">تاريخ الشراء</Label>
                            <Input id="purchaseDate" type="date" className="text-right" />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black">
                            إضافة
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
