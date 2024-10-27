import { useEffect, useState } from "react";
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
import { PaginatedResponse, Expense } from "@/types";
import { DataTablePagination } from "@/components/datatable/datatable-pagination";

import { useToast } from "@/hooks/use-toast";
import FilterBar from "../Products/FilterBar";
import { Badge } from "@/components/ui/badge";

export default function Index() {
    const { expenses: initialExpenses } = usePage<{
        expenses: PaginatedResponse<Expense>;
    }>().props;
    const { toast } = useToast();
    const { data, current_page, last_page, per_page } = initialExpenses;

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);

    const handleDeleteConfirm = () => {
        if (expenseToDelete) {
            router.delete(route("expenses.destroy", expenseToDelete.id), {
                onFinish: () => {
                    toast({
                        title: "تم الحذف بنجاح",
                        description: "تم حذف العملية بنجاح.",
                    });
                },
            });
            setDeleteDialogOpen(false);
            setExpenseToDelete(null);
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

                    <h1 className="text-2xl font-bold">المصروفات</h1>
                </div>
                <div className="flex justify-between mb-4 gap-4 items-center">
                    <FilterBar />
                    <Button
                        className="bg-yellow-400 hover:bg-yellow-500 text-black"
                        onClick={() => {
                            router.get(route("expenses.create"));
                        }}
                    >
                        إضافة
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-right">#</TableHead>
                            <TableHead className="text-right">المبلغ</TableHead>
                            <TableHead className="text-right">النوع</TableHead>
                            <TableHead className="text-right">تاريخ المصروف</TableHead>
                            <TableHead className="text-right">الإجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((expense) => (
                            <TableRow key={expense.id}>
                                <TableCell>{expense.id}</TableCell>
                                <TableCell>{expense.amount}</TableCell>
                                <TableCell>{expense.expense_type?.name}</TableCell>
                                <TableCell>{expense.expense_date}</TableCell>
                              
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"            
                                        className="hover:bg-yellow-400"
                                        onClick={() => {
                                            setExpenseToDelete(expense);
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
                                هل أنت متأكد أنك تريد حذف هذه المصروفات؟ لا يمكن التراجع عن هذا الإجراء.
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
