import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, DollarSign, ShoppingCart, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { router, usePage } from "@inertiajs/react";
import { Expense } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import NoData from "@/components/no-data";

export default function Show() {
    const { expense } = usePage<{
        expense: Expense;
    }>().props;
   
    const renderBadge = (expense: Expense) => {
        switch (expense.status) {
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
        <div className="container mx-auto p-4 space-y-3">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl flex items-center justify-between">
                        تفاصيل المصروف
                        {renderBadge(expense)}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-reverse space-x-2">
                            <Tag className="w-5 h-5 text-primary" />
                            <span className="font-semibold">رقم:</span>
                            <span>{expense.id}</span>
                        </div>
                        <div className="flex items-center space-x-reverse space-x-2">
                            <ShoppingCart className="w-5 h-5 text-primary" />
                            <span className="font-semibold">النوع: </span>
                            <span>{expense.expense_type.name}</span>
                        </div>
                       
                        <div className="flex items-center space-x-reverse space-x-2">
                            <DollarSign className="w-5 h-5 text-primary" />
                            <span className="font-semibold">القيمة: </span>
                            <span>${expense.amount}</span>
                        </div>
                        <div className="flex items-center space-x-reverse space-x-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            <span className="font-semibold">
                                تاريخ العملية:{" "}
                            </span>
                            <span>
                                {new Date(
                                    expense.expense_date
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </CardContent>

                <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl flex items-center justify-between">
                        المرجعات
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table className="mb-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-right">#</TableHead>
                                <TableHead className="text-right">
                                    المبلغ
                                </TableHead>

                                <TableHead className="text-right hidden">
                                    الكمية
                                </TableHead>
                                <TableHead className="text-right">
                                    تاريخ المصروف
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {expense.returns.map((data) => (
                                <TableRow key={data.id}>
                                    <TableCell>{data.id}</TableCell>
                                    <TableCell>{data.amount}</TableCell>
                                    <TableCell className="hidden">{data.quantity}</TableCell>
                                    <TableCell>{data.return_date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {!(expense.returns.length > 0) && <NoData />}
                </CardContent>
            </Card>

            <div className="flex justify-between w-full max-w-2xl mx-auto">
                <Button
                    type="button"
                    onClick={() => router.get(route("expenses.index"))}
                >
                    رجوع
                </Button>
            </div>
        </div>
    );
}
