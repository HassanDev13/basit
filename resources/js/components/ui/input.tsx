import * as React from "react";

import { cn } from "@/utils/cn";
import { LucideIcon } from "lucide-react";
import { useDir } from "@/hooks/use-dir";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: LucideIcon;
    rtl?: boolean; // Ensure the correct type for the icon
    error?: string; // New prop for error message
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, icon: Icon, rtl, error, ...props }, ref) => {
        const direction = useDir();
        return (
            <div className="w-full">
                <div className="relative flex items-center w-full">
                    {Icon && (
                        <Icon
                            className={cn(
                                "absolute w-4 h-4 pointer-events-none left-3 text-muted-foreground ",
                                direction === "rtl" && "left-auto right-3"
                            )}
                        />
                    )}
                    <input
                        type={type}
                        className={cn(
                            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                            className,
                            Icon
                                ? direction === "rtl"
                                    ? "pr-10"
                                    : "pl-10"
                                : "", // Add extra padding if an icon is present
                            error &&
                                "border-destructive focus-visible:ring-destructive" // Add error styles
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1 text-sm text-destructive">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
