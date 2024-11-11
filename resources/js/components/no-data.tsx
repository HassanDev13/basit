import { useTheme } from "@/providers/theme-provider";
import { Database } from "lucide-react";
import { SVGAttributes } from "react";

export default function NoData(props: SVGAttributes<SVGElement>) {
    return (
        <div className="w-full my-40 md:my-40 flex flex-col space-y-4 justify-center items-center">
            <Database  width={ 48 } height={ 48 } />
            <p>لا توجد بيانات</p>
        </div>
    );
}
