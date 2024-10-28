import { Link, Head, router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut } from "lucide-react";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  
    type Report = {
        title: string;
        value: string;
    };

    const { reports , currentMonth , currentYear , currentDate } = usePage<{
        reports: Report[]; 
        currentMonth : number;
        currentYear : number;
        currentDate : number;
    }>().props;

    const operations = [
        { name: "المنتجات", link: route("products.index") },
        { name: "المشتريات", link: route("purchases.index") },
        { name: "المصاريف", link: route("expenses.index") },
        { name: "المبيعات", link: route("sales.index") },
    ];
    
    return (
        <>
            <Head title="Welcome" />
            <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-10">
                        <h1 className="text-2xl md:text-3xl font-bold text-right ">
                            التقارير لهذا الشهر  
                        </h1>
                        <Button
                            type="button"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                            onClick={() => {
                                router.post(route("logout"));
                            }}
                        >
                            <LogOut className="rotate-180"/>
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                        {reports.map((report, index) => (
                            <Card
                                key={index}
                                className="p-4 bg-blue-100 text-right border border-blue-200 shadow-sm hover:shadow-md"
                            >
                                <h2 className="text-sm font-semibold mb-2 text-blue-700">
                                    {report.title}
                                </h2>
                                <p className="text-lg font-bold text-blue-800">
                                    {report.value}
                                </p>
                            </Card>
                        ))}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-right mb-6">
                        العمليات
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {operations.map((operation, index) => (
                            <Link key={index} href={operation.link}>
                                <Card className="p-6 bg-yellow-100 text-center border border-yellow-300 shadow-sm hover:bg-yellow-200">
                                    <h3 className="text-lg md:text-xl font-semibold text-yellow-800">
                                        {operation.name}
                                    </h3>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
