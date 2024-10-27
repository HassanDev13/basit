import { Config } from "ziggy-js";

export interface Option {
    label: string;
    value: string;
}
export interface Filter {
    name: string;
    options: Option[];
}
export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    bio: string | null;
    avatar: string | null;
    avatar_url: string;
    email: string;
    phone: string;
    gender: "Male" | "Female";
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    locale: string;
};

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
export interface Product {
    id: number;
    name: string;
    price: number;
    cost: number;
    quantity: number;
}
export type PurchaseStatus= "approved" | "canceled";
export type  SaleStatus= "approved" | "canceled";
export interface Purchase {
    id: number;
    product: Product;
    quantity: number;
    cost: number;
    status: PurchaseStatus;
    purchase_date: string;
}

export interface Sale {
    id: number;
    quantity: number;
    final_price: number;
    sale_date: string;   
    status: SaleStatus;
    product: Product;
}
export interface ExpenseType {
    id: number;
    name: string;
}
export interface Expense {
    id: number;
    amount: number;
    description: string;
    expense_type: ExpenseType;
    expense_date: string;
}