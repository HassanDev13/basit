import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Backpack, Edit, SquareChevronLeft, Trash } from "lucide-react";
import Guest from "@/layouts/auth-layout";
import { Link, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/layouts/admin-layout";
import { PaginatedResponse, Product } from "@/types";
import { DataTablePagination } from "@/components/datatable/datatable-pagination";
import FilterBar from "./FilterBar";
import { useToast } from "@/hooks/use-toast";

export default function Index() {
    const { products: initialProducts } = usePage<{
        products: PaginatedResponse<Product>;
    }>().props;
    const { toast } = useToast();
    const { data, current_page, last_page, per_page } = initialProducts;

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(
        null
    );

    const handleDeleteConfirm = () => {
        if (productToDelete) {
            router.delete(route("products.destroy", productToDelete.id), {
                onFinish: () => {
                    toast({
                        title: "تم الحذف بنجاح",
                        description: "تم حذف المنتج بنجاح.",
                    });
                },
            });
            setDeleteDialogOpen(false);
            setProductToDelete(null);
        }
    };

    return (
        <AdminLayout name="">
            <div className="container mx-auto  p-4 rounded-lg shadow-sm md:px-20">
                <div className="flex items-center gap-4 mb-4">
                    <Link
                        href={route("welcome")}
                        className="hover:bg-yellow-400"
                    >
                        <SquareChevronLeft className="rotate-180 " />
                    </Link>

                    <h1 className="text-2xl font-bold">المنتجات</h1>
                </div>
                <div className="flex justify-between mb-4 gap-3 items-center">
                    <FilterBar />
                    <Button
                        className="bg-yellow-400 hover:bg-yellow-500 text-black"
                        onClick={() => {
                            router.get(route("products.create"));
                        }}
                    >
                        إضافة
                    </Button>
                </div>
                <Table className="mb-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-right">#</TableHead>
                            <TableHead className="text-right">
                                اسم المنتج
                            </TableHead>
                            <TableHead className="text-right">السعر</TableHead>
                            <TableHead className="text-right hidden md:table-cell">
                                التكلفة
                            </TableHead>
                            <TableHead className="text-right hidden md:table-cell">
                                الكمية المتاحة
                            </TableHead>
                            <TableHead className="text-right">
                                الإجراءات
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {product.cost}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {product.quantity}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="mr-2 hover:bg-yellow-400"
                                            onClick={() => {
                                                router.get(
                                                    route("products.edit", {
                                                        id: product.id,
                                                    })
                                                );
                                            }}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-yellow-400"
                                            onClick={() => {
                                                setProductToDelete(product);
                                                setDeleteDialogOpen(true);
                                            }}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    <div className="my-28">
                                        لا توجد بيانات
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <DataTablePagination
                    currentPage={current_page}
                    lastPage={last_page}
                    pageSize={per_page}
                />
                <Dialog
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>تأكيد الحذف</DialogTitle>
                            <DialogDescription>
                                هل أنت متأكد أنك تريد حذف هذا المنتج؟ لا يمكن
                                التراجع عن هذا الإجراء.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setDeleteDialogOpen(false)}
                            >
                                إلغاء
                            </Button>

                            <Button
                                variant="destructive"
                                onClick={handleDeleteConfirm}
                            >
                                حذف
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
