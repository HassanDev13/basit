import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, DollarSign, ShoppingCart, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { router, usePage } from "@inertiajs/react";
import { Purchase } from "@/types";
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
    const { purchase } = usePage<{
        purchase: Purchase;
    }>().props;

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
        <div className="container mx-auto p-4 space-y-3">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl flex items-center justify-between">
                        تفاصيل الشراء
                        {renderBadge(purchase)}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-reverse space-x-2">
                            <Tag className="w-5 h-5 text-primary" />
                            <span className="font-semibold">رقم:</span>
                            <span>{purchase.id}</span>
                        </div>
                        <div className="flex items-center space-x-reverse space-x-2">
                            <ShoppingCart className="w-5 h-5 text-primary" />
                            <span className="font-semibold">المنتج: </span>
                            <span>{purchase.product.name}</span>
                        </div>
                        <div className="flex items-center space-x-reverse space-x-2">
                            <Package className="w-5 h-5 text-primary" />
                            <span className="font-semibold">الكمية: </span>
                            <span>{purchase.quantity}</span>
                        </div>
                        <div className="flex items-center space-x-reverse space-x-2">
                            <DollarSign className="w-5 h-5 text-primary" />
                            <span className="font-semibold">القيمة: </span>
                            <span>${purchase.cost}</span>
                        </div>
                        <div className="flex items-center space-x-reverse space-x-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            <span className="font-semibold">
                                تاريخ الشراء:{" "}
                            </span>
                            <span>
                                {new Date(
                                    purchase.purchase_date
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

                                <TableHead className="text-right">
                                    الكمية
                                </TableHead>
                                <TableHead className="text-right">
                                    تاريخ المصروف
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {purchase.returns.map((data) => (
                                <TableRow key={data.id}>
                                    <TableCell>{data.id}</TableCell>
                                    <TableCell>{data.amount}</TableCell>
                                    <TableCell>{data.quantity}</TableCell>
                                    <TableCell>{data.return_date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {!(purchase.returns.length > 0) && <NoData />}
                </CardContent>
            </Card>

            <div className="flex justify-between w-full max-w-2xl mx-auto">
                <Button
                    type="button"
                    onClick={() => router.get(route("purchases.index"))}
                >
                    رجوع
                </Button>
            </div>
        </div>
    );
}
