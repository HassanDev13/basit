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
import {
    ArrowUpLeft,
    Backpack,
    Edit,
    Eye,
    SquareChevronLeft,
    Trash,
} from "lucide-react";
import Guest from "@/layouts/auth-layout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/layouts/admin-layout";
import { PaginatedResponse, Purchase } from "@/types";
import { DataTablePagination } from "@/components/datatable/datatable-pagination";

import { useToast } from "@/hooks/use-toast";
import FilterBar from "../Products/FilterBar";
import { Badge } from "@/components/ui/badge";
import NoData from "@/components/no-data";

export default function Index() {
    const { purchases: initialpurchases } = usePage<{
        purchases: PaginatedResponse<Purchase>;
    }>().props;
    const { toast } = useToast();
    const { data, current_page, last_page, per_page } = initialpurchases;

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [purchaseToDelete, setpurchaseToDelete] = useState<Purchase | null>(
        null
    );

    const handleDeleteConfirm = () => {
        if (purchaseToDelete) {
            router.delete(route("purchases.destroy", purchaseToDelete.id), {
                onFinish: () => {
                    toast({
                        title: "تم الإلغاء بنجاح",
                        description: "تم الإلغاء بنجاح.",
                    });
                },
            });
            setDeleteDialogOpen(false);
            setpurchaseToDelete(null);
        }
    };

    const renderBadge = (purchase: Purchase) => {
        switch (purchase.status) {
            case "Completed":
                return <Badge variant="outline">مكتمل</Badge>;
            case "PartReturned":
                return <Badge variant="default">إرجاع جزئي</Badge>;
            case "Returned":
                return <Badge variant="destructive">مرجع</Badge>;
            default:
                return <Badge>حالة غير معروفة</Badge>;
        }
    };

    return (
        <AdminLayout name="">
            <Head title="المشتريات" />

            <div className="container mx-auto  p-4 rounded-lg shadow-sm md:px-20">
                <div className="flex items-center gap-4 mb-4">
                    <Link
                        href={route("welcome")}
                        className="hover:bg-yellow-400"
                    >
                        <SquareChevronLeft className="rotate-180 " />
                    </Link>

                    <h1 className="text-2xl font-bold">المشتريات</h1>
                </div>
                <div className="flex justify-between mb-4 gap-4 items-center">
                    <FilterBar />
                    <Button
                        className="bg-yellow-400 hover:bg-yellow-500 text-black"
                        onClick={() => {
                            router.get(route("purchases.create"));
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
                            <TableHead className="text-right hidden md:table-cell">
                                التكلفة
                            </TableHead>
                            <TableHead className="text-right hidden md:table-cell">
                                الكمية
                            </TableHead>
                            <TableHead className="text-right hidden md:table-cell">
                                تاريخ الشراء
                            </TableHead>
                            <TableHead className="text-right">الحالة</TableHead>
                            <TableHead className="text-right">
                                الإجراءات
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((purchase) => (
                            <TableRow key={purchase.id}>
                                <TableCell>{purchase.id}</TableCell>
                                <TableCell>{purchase.product.name}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {purchase.cost}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {purchase.quantity}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{purchase.purchase_date}</TableCell>
                                <TableCell>{renderBadge(purchase)}</TableCell>
                                <TableCell className="flex">
                                    {/* <Button
                                        variant="ghost"
                                        size="icon"
                                        disabled={
                                            purchase.status === "canceled"
                                        }
                                        className="hover:bg-yellow-400"
                                        onClick={() => {
                                            setpurchaseToDelete(purchase);
                                            setDeleteDialogOpen(true);
                                        }}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button> */}
                                    <Link
                                        href={route("returns.create", {
                                            id: purchase.id,
                                            type: "purchase",
                                        })}
                                    >
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-yellow-400"
                                        >
                                            <ArrowUpLeft className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link
                                        href={route("purchases.show", {
                                            id: purchase.id
                                        })}
                                    >
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-yellow-400"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {!(data.length > 0) && <NoData />}
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
