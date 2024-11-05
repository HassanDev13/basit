"use client";

import { useState, useEffect } from "react";
import { Plus, Save, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { router } from '@inertiajs/react'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePage } from "@inertiajs/react";

type Permission = {
    id: string;
    name: string;
};

type Role = {
    id: number | null;
    name: string;
    permissions: string[];
};

export default function EnhancedRolePermissionManager() {
    const { roles: useRoles, permissions: usePermission } = usePage<{
        roles: Role[];
        permissions: Permission[];
    }>().props;

    const [permissions, setPermissions] = useState<Permission[]>(usePermission);
    const [roles, setRoles] = useState<Role[]>(useRoles);
    const [newRoleName, setNewRoleName] = useState("");
    const [selectedRole, setSelectedRole] = useState<Role | null>(roles[0]);
    const [hasChanges, setHasChanges] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectAll, setSelectAll] = useState(false);

    const filteredPermissions = permissions.filter((permission) =>
        searchTerm
            ? permission.name.toLowerCase().includes(searchTerm.toLowerCase())
            : true
    );

    const addRole = () => {
        if (newRoleName) {
            const newRole = {
                id: null,
                name: newRoleName,
                permissions: [],
            };
            setRoles([...roles, newRole]);
            setNewRoleName("");
            setSelectedRole(newRole);
            setHasChanges(true);
        }
    };

    const togglePermission = (permissionId: string) => {
        if (selectedRole) {
            const updatedRoles = roles.map((role) =>
                role.id === selectedRole.id
                    ? {
                          ...role,
                          permissions: role.permissions.includes(permissionId)
                              ? role.permissions.filter(
                                    (id) => id !== permissionId
                                )
                              : [...role.permissions, permissionId],
                      }
                    : role
            );
            setRoles(updatedRoles);
            setSelectedRole(
                updatedRoles.find((r) => r.id === selectedRole.id) || null
            );
            setHasChanges(true);
        }
    };

    const toggleAllPermissions = () => {
        if (selectedRole) {
            const updatedRoles = roles.map((role) =>
                role.id === selectedRole.id
                    ? {
                          ...role,
                          permissions: selectAll
                              ? []
                              : filteredPermissions.map((p) => p.id),
                      }
                    : role
            );
            setRoles(updatedRoles);
            setSelectedRole(
                updatedRoles.find((r) => r.id === selectedRole.id) || null
            );
            setSelectAll(!selectAll);
            setHasChanges(true);
        }
    };

    const saveChanges = () => {
        console.log("تم حفظ الأدوار:", roles);
        setHasChanges(false);
        router.post(route("role.update"), { roles }, { preserveScroll: true });
    };

    useEffect(() => {
        if (selectedRole) {
            setSelectAll(
                filteredPermissions.every((p) =>
                    selectedRole.permissions.includes(p.id)
                )
            );
        }
    }, [selectedRole, filteredPermissions]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                إدارة الأدوار والصلاحيات
            </h1>
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>الأدوار</CardTitle>
                        <CardDescription>إدارة وإنشاء الأدوار</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="new-role">إضافة دور جديد</Label>
                                <div className="flex mt-1 space-x-reverse space-x-3">
                                    <Input
                                        id="new-role"
                                        placeholder="أدخل اسم الدور"
                                        value={newRoleName}
                                        onChange={(e) =>
                                            setNewRoleName(e.target.value)
                                        }
                                    />
                                    <Button onClick={addRole}>
                                        <Plus className=" h-4 w-4" /> إضافة
                                    </Button>
                                </div>
                            </div>
                            <ScrollArea className="h-[300px]">
                                <div className="space-y-2">
                                    {roles.map((role) => (
                                        <Button
                                            key={role.id}
                                            variant={
                                                selectedRole?.id === role.id
                                                    ? "default"
                                                    : "outline"
                                            }
                                            className="w-full justify-start"
                                            onClick={() =>
                                                setSelectedRole(role)
                                            }
                                        >
                                            {role.name}
                                        </Button>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                    </CardContent>
                </Card>
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>
                            {selectedRole
                                ? `الصلاحيات لـ ${selectedRole.name}`
                                : "اختر دورًا"}
                        </CardTitle>
                        <CardDescription>
                            إدارة الصلاحيات للدور المحدد
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {selectedRole && (
                            <div className="space-y-4">
                                <div className="flex space-x-2 space-x-reverse items-center">
                                    <div className="flex-1">
                                        <Label htmlFor="permission-search">
                                            بحث
                                        </Label>
                                        <div className="relative">
                                            <Search className="absolute left-5 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="permission-search"
                                                placeholder="ابحث عن الصلاحيات"
                                                className="pl-8"
                                                value={searchTerm}
                                                onChange={(e) =>
                                                    setSearchTerm(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 space-x-reverse mt-6">
                                        <Checkbox
                                            id="select-all"
                                            checked={selectAll}
                                            onCheckedChange={toggleAllPermissions}
                                        />
                                        <Label htmlFor="select-all">تحديد الكل</Label>
                                    </div>
                                </div>
                                <ScrollArea className="h-[400px]">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {filteredPermissions.map(
                                            (permission) => (
                                                <div
                                                    key={permission.id}
                                                    className="flex items-center space-x-reverse space-x-2"
                                                >
                                                    <Checkbox
                                                        id={permission.id}
                                                        checked={
                                                            selectedRole?.permissions.includes(
                                                                permission.id
                                                            ) || false
                                                        }
                                                        onCheckedChange={() =>
                                                            togglePermission(
                                                                permission.id
                                                            )
                                                        }
                                                    />
                                                    <Label
                                                        htmlFor={permission.id}
                                                        className="text-sm"
                                                    >
                                                        {permission.name}
                                                    </Label>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </ScrollArea>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4 flex justify-end">
                <Button onClick={saveChanges} disabled={!hasChanges}>
                    <Save className="mr-2 h-4 w-4" /> حفظ التغييرات
                </Button>
            </div>
        </div>
    );
}