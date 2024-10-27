
import React, { PropsWithChildren } from "react";
type AdminLayoutProps = {
    name: string;
} & PropsWithChildren;
function AdminLayout({ children, name }: AdminLayoutProps) {
    return (
        <div className="flex w-full min-h-screen ">
             {children}
           
        </div>
    );
}

export default AdminLayout;
