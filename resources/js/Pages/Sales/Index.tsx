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
import { PaginatedResponse, Sale, SaleStatus } from "@/types";
import { DataTablePagination } from "@/components/datatable/datatable-pagination";

import { useToast } from "@/hooks/use-toast";
import FilterBar from "../Products/FilterBar";
import { Badge } from "@/components/ui/badge";

export default function Index() {
    const { sales: initialSales } = usePage<{
        sales: PaginatedResponse<Sale>;
    }>().props;
    const { toast } = useToast();
    const { data, current_page, last_page, per_page } = initialSales;

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [saleToDelete, setSaleToDelete] = useState<Sale | null>(null);

    const handleDeleteConfirm = () => {
        if (saleToDelete) {
            router.delete(route("sales.destroy", saleToDelete.id), {
                onFinish: () => {
                    toast({
                        title: "تم الإلغاء بنجاح",
                        description: "تم إلغاء عملية البيع بنجاح.",
                    });
                },
            });
            setDeleteDialogOpen(false);
            setSaleToDelete(null);
        }
    };

    const renderBadge = (sale: Sale) => {
        switch (sale.status) {
            case "approved":
                return <Badge variant="outline">مكتمل</Badge>;
            case "canceled":
                return <Badge variant="destructive">ملغى</Badge>;
            default:
                return <Badge>حالة غير معروفة</Badge>;
        }
    };

    return (
        <AdminLayout name="">
            <div className="container mx-auto p-4 rounded-lg shadow-sm md:px-20">
                <div className="flex items-center gap-4 mb-4">
                    <Link
                        href={route("welcome")}
                        className="hover:bg-yellow-400"
                    >
                        <SquareChevronLeft className="rotate-180 " />
                    </Link>

                    <h1 className="text-2xl font-bold">المبيعات</h1>
                </div>
                <div className="flex justify-between mb-4 gap-4 items-center">
                    <FilterBar />
                    <Button
                        className="bg-yellow-400 hover:bg-yellow-500 text-black"
                        onClick={() => {
                            router.get(route("sales.create"));
                        }}
                    >
                        إضافة
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-right">#</TableHead>
                            <TableHead className="text-right">
                                اسم المنتج
                            </TableHead>
                            <TableHead className="text-right">المبلغ</TableHead>
                            <TableHead className="text-right">الكمية</TableHead>
                            <TableHead className="text-right">تاريخ البيع</TableHead>
                            <TableHead className="text-right">الحالة</TableHead>
                            <TableHead className="text-right">الإجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((sale) => (
                            <TableRow key={sale.id}>
                                <TableCell>{sale.id}</TableCell>
                                <TableCell>{sale.product.name}</TableCell>

                                <TableCell>{sale.final_price}</TableCell>
                                <TableCell>{sale.quantity}</TableCell>
                                <TableCell>{sale.sale_date}</TableCell>
                                <TableCell>
                                    {renderBadge(sale)}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        disabled={sale.status === "canceled"}
                                        className="hover:bg-yellow-400"
                                        onClick={() => {
                                            setSaleToDelete(sale);
                                            setDeleteDialogOpen(true);
                                        }}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
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
                                هل أنت متأكد أنك تريد حذف هذه المبيعة؟ لا يمكن التراجع عن هذا الإجراء.
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
