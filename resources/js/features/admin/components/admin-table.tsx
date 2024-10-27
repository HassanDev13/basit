import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { ReactNode } from "react";

type AdminTableProps = {
    children: ReactNode;
};

const AdminTable = ({ children }: AdminTableProps) => {
    return <Card className="min-w-full">{children}</Card>;
};

AdminTable.Header = ({ children }: { children: ReactNode }) => (
    <CardHeader className="border-b">{children}</CardHeader>
);

AdminTable.Content = ({ children }: { children: ReactNode }) => (
    <CardContent className="py-2 overflow-x-auto h-fit">{children}</CardContent>
);

AdminTable.Footer = ({ children }: { children: ReactNode }) => (
    <CardFooter className="justify-end pt-4 border-t">{children}</CardFooter>
);

export default AdminTable;
