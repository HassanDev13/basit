import DataTable from "@/components/datatable/datatable";
import { DataTablePagination } from "@/components/datatable/datatable-pagination";
import DataTableToolbar from "@/components/datatable/datatable-toolbar";
import AdminTable from "@/features/admin/components/admin-table";
import { FILTERS } from "@/features/admin/users/users-filters";
import { columns } from "@/features/admin/users/components/users-table-columns";
import AdminLayout from "@/layouts/admin-layout";
import { PageProps, PaginatedResponse, User } from "@/types";
import { router } from "@inertiajs/react";
import React, { useCallback } from "react";

type IndexProps = {
    users: PaginatedResponse<User>;
} & PageProps;
function Index({ users }: IndexProps) {
    const handleExport = useCallback((type: "pdf" | "xlsx") => {
        window.open(route("admin.users.export", { format: type }));
    }, []);
    const handleCreate = useCallback(() => {
        router.get(route("admin.users.create"));
    }, []);
    return (
        <div>
            <AdminTable>
                <AdminTable.Header>
                    <DataTableToolbar
                        handleCreate={handleCreate}
                        handleExport={handleExport}
                        filters={FILTERS}
                    />
                </AdminTable.Header>
                <AdminTable.Content>
                    <DataTable columns={columns} data={users.data} />
                </AdminTable.Content>
                <AdminTable.Footer>
                    <DataTablePagination
                        currentPage={users.current_page}
                        lastPage={users.last_page}
                        pageSize={users.per_page}
                    />
                </AdminTable.Footer>
            </AdminTable>
        </div>
    );
}
Index.layout = (page: React.ReactNode) => (
    <AdminLayout children={page} name="Users" />
);
export default Index;
