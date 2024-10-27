import { useTheme } from "@/providers/theme-provider";
import { SVGAttributes } from "react";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    const { theme } = useTheme();

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.2"
            viewBox="0 0 46 45"
            width="46"
            height="45"
            {...props}
            className={theme === "dark" ? "fill-white" : "fill-black"}
        >
            <title>Group 10 (1)-svg</title>

            <path
                id="Layer"
                className="s0"
                d="m58.5 12.7h6.6v2h-6.6v7.3h-2.4v-16.8h10.2v2.2h-7.8z"
            />
            <path id="Layer" className="s0" d="m70.9 5.2v16.7h-2.4v-16.7z" />
            <path
                id="Layer"
                className="s0"
                d="m81.4 22.1h-0.9l-7.6-16.9h2.6l5.4 12.6 5.5-12.6h2.6z"
            />
            <path
                id="Layer"
                className="s0"
                d="m93.4 12.3h6.6v2.1h-6.6v5.3h7.8v2.2h-10.2v-16.7h10.2v2.3h-7.8z"
            />
            <path
                id="Layer"
                fill-rule="evenodd"
                className="s0"
                d="m112.9 19.4l-1.2 2.5h-2.6l7.7-16.9h1l7.6 16.9h-2.6l-1.1-2.5zm4.4-10.1l-3.6 8.2h7.2z"
            />
            <path
                id="Layer"
                className="s0"
                d="m141.3 22.1h-0.6l-10.9-12.1v12h-2.4v-17h0.6l10.9 12.1v-11.9h2.4z"
            />
            <path
                id="Layer"
                className="s0"
                d="m152.7 5c2 0 4.6 1 6 2.3l-1.3 1.9c-1.2-1.2-3.1-2-4.7-2-1.7 0-3.3 0.7-4.5 1.9-1.2 1.2-1.9 2.8-1.9 4.5 0 3.4 2.8 6.3 6.6 6.3 4.3 0 5.5-3.5 5.4-5.1h-5.7v-1.8h8.2q0.1 0.6 0.1 1.3c0 4.6-3.7 7.9-8.1 7.9-5 0-8.9-3.9-8.9-8.6 0-4.7 3.9-8.6 8.8-8.6z"
            />
            <path
                id="Layer"
                className="s0"
                d="m173.9 21.9h-10.3v-16.7h2.3v14.5h8z"
            />
            <path
                id="Layer"
                className="s0"
                d="m178.6 12.3h6.6v2.1h-6.6v5.3h7.7v2.2h-10.1v-16.7h10.1v2.3h-7.7z"
            />
            <path
                id="Layer"
                className="s0"
                d="m188.3 19l1.5-1.4c0.7 1.3 2.5 2.3 4.2 2.3 1.9 0 3.6-1 3.6-2.6 0-1.7-2.2-2.5-4.3-3.2-2.1-0.8-4.3-2-4.3-4.5 0-2.6 2.4-4.6 5.4-4.6 2.6 0 4.3 1.5 4.9 3l-1.5 1.3c-0.6-1.3-2-2.1-3.4-2.1-1.7 0-3.1 1.1-3.1 2.4 0 1.5 1.8 2.1 3.9 2.9 2.5 0.9 4.8 2.1 4.8 4.8 0 2.9-2.9 4.8-6 4.8-2.7 0-5-1.4-5.7-3.1z"
            />
            <path
                id="Layer"
                className="s0"
                d="m56.4 30h0.6v1.3c0.2-0.5 0.5-0.9 0.9-1.1 0.4-0.3 0.9-0.4 1.4-0.4 1.1 0 2 0.5 2.3 1.9 0.5-1.3 1.4-1.9 2.5-1.9 1.5 0 2.5 1 2.5 3.8v3.8h-0.6v-3.8c0-2.4-0.8-3.2-2-3.2-1.2 0-2.2 0.7-2.2 2.9v4.1h-0.6v-4.1c0-2.2-0.8-2.9-2-2.9-1.4 0-2.2 0.9-2.2 3.2v3.8h-0.6z"
            />
            <path
                id="Layer"
                fill-rule="evenodd"
                className="s0"
                d="m72.9 29.8q0.9 0 1.7 0.4 0.8 0.4 1.2 1.2l0.1-1.4h0.5v7.4h-0.5l-0.1-1.3c-0.5 1-1.7 1.5-2.9 1.5-1.9 0-3.7-1.5-3.7-3.9 0-2.4 1.8-3.9 3.7-3.9zm0.1 7.2c1.4 0 2.8-0.6 2.8-3.3 0-2.5-1.4-3.3-2.8-3.3q-0.6 0-1.2 0.2-0.6 0.3-1.1 0.8-0.4 0.4-0.7 1.1-0.2 0.6-0.2 1.2 0 0.7 0.2 1.3 0.3 0.6 0.7 1.1 0.5 0.4 1.1 0.7 0.6 0.2 1.2 0.2z"
            />
            <path
                id="Layer"
                className="s0"
                d="m79.6 30h0.5v1.8c0.7-1.6 2-2.1 3.2-2.1l-0.1 0.6q0 0-0.1 0c-1.6 0.1-3 1.2-3 3.7v3.4h-0.5z"
            />
            <path
                id="Layer"
                className="s0"
                d="m85.8 27.2h0.6v6.8l3.6-4h0.7l-3.1 3.5 3.7 3.9h-0.8l-3.2-3.5-0.9 1v2.5h-0.6z"
            />
            <path
                id="Layer"
                fill-rule="evenodd"
                className="s0"
                d="m96.1 29.8c1.9 0 3.4 1.5 3.4 3.6q0 0.3-0.1 0.6h-6.4c0.2 1.8 1.6 3.1 3.2 3.1 0.9 0 1.9-0.5 2.4-1l0.4 0.4c-0.6 0.7-1.7 1.1-2.8 1.1-2.1 0-3.7-1.6-3.7-3.9 0-2.2 1.6-3.9 3.6-3.9zm2.9 3.7c0-1.7-1.1-3.1-2.9-3.1-1.6 0-3 1.3-3.1 3.1z"
            />
            <path
                id="Layer"
                className="s0"
                d="m102.4 35.2v-4.6h-1v-0.6h0.3c0.5 0 0.7-0.2 0.7-0.8v-0.5h0.5v1.3h2.5v0.6h-2.5v4.6c0 1.1 0.6 1.8 1.5 1.8q0.5 0 1-0.2v0.6q-0.5 0.2-1.1 0.2c-1.2 0-1.9-0.9-1.9-2.4z"
            />
            <path
                id="Layer"
                className="s0"
                d="m107.8 28.1q0-0.1 0-0.2 0.1-0.1 0.1-0.1 0.1-0.1 0.2-0.1 0.1-0.1 0.2-0.1 0.2 0.1 0.3 0.2 0.1 0.1 0.1 0.3 0 0.2-0.1 0.3-0.1 0.2-0.3 0.2-0.1 0-0.2-0.1-0.1 0-0.2-0.1 0 0-0.1-0.1 0-0.1 0-0.2zm0.8 1.9v7.4h-0.6v-7.4z"
            />
            <path
                id="Layer"
                className="s0"
                d="m111.9 30h0.5l0.1 1.3c0.4-1 1.4-1.5 2.5-1.5 1.6 0 2.8 1 2.8 3.6v4h-0.6v-4c0-2.2-0.9-3-2.3-3-1.4 0-2.4 0.8-2.4 3v4h-0.6z"
            />
            <path
                id="Layer"
                fill-rule="evenodd"
                className="s0"
                d="m124.1 29.8q0.9 0 1.7 0.4 0.7 0.4 1.2 1.2v-1.4h0.6v6.8c0 2-1.5 3.6-3.7 3.6-1.3 0-2.5-0.5-3.1-1.4l0.4-0.3c0.6 0.7 1.6 1.1 2.7 1.1 2 0 3.1-1.2 3.1-3.7-0.6 1-1.7 1.5-2.9 1.5-1.9 0-3.7-1.5-3.7-3.9 0-2.4 1.8-3.9 3.7-3.9zm0.1 7.2c1.3 0 2.8-0.9 2.8-3.3 0-2.3-0.9-3.3-2.8-3.3q-0.7 0-1.3 0.2-0.6 0.3-1 0.8-0.5 0.4-0.7 1.1-0.2 0.6-0.2 1.2 0 0.7 0.2 1.3 0.2 0.6 0.7 1.1 0.4 0.4 1 0.7 0.6 0.2 1.3 0.2z"
            />
            <path
                id="Layer"
                className="s0"
                d="m135.1 36.1l0.3-0.4q0.4 0.7 1 1 0.6 0.4 1.4 0.4c0.9 0 2-0.6 2-1.6 0-0.9-1.3-1.4-2.4-1.8-0.6-0.2-2-0.7-2-2 0-1 1-1.9 2.4-1.9 1 0 2 0.6 2.3 1.4l-0.4 0.3c-0.4-0.8-1.3-1.1-2-1.1-1 0-1.7 0.6-1.7 1.3 0 0.9 1.1 1.3 2.1 1.7 0.8 0.3 2.2 0.8 2.2 2.1 0 1.3-1.2 2.1-2.6 2.1-1.2 0-2.2-0.6-2.6-1.5z"
            />
            <path
                id="Layer"
                fill-rule="evenodd"
                className="s0"
                d="m142.4 33.7c0-1 0.4-2 1.2-2.8 0.7-0.7 1.7-1.1 2.7-1.1 1.1 0 2.1 0.4 2.8 1.1 0.7 0.8 1.1 1.8 1.1 2.8 0 1.1-0.4 2-1.1 2.8-0.7 0.7-1.7 1.1-2.8 1.1-1 0-2-0.4-2.7-1.1-0.8-0.8-1.2-1.7-1.2-2.8zm7.3 0c0-0.9-0.4-1.7-1-2.3-0.6-0.7-1.5-1-2.4-1-0.8 0-1.7 0.3-2.3 1-0.6 0.6-1 1.4-1 2.3 0 0.9 0.4 1.7 1 2.4 0.6 0.6 1.5 0.9 2.3 0.9 0.9 0 1.8-0.3 2.4-0.9 0.6-0.7 1-1.5 1-2.4z"
            />
            <path id="Layer" className="s0" d="m153.4 27.2v10.2h-0.5v-10.2z" />
            <path
                id="Layer"
                className="s0"
                d="m156.6 34.4v-4.4h0.5v4.4c0 1.7 1.2 2.6 2.3 2.6 1.2 0 2.3-0.9 2.3-2.6v-4.4h0.6v4.4c0 2-1.4 3.1-2.9 3.1-1.4 0-2.8-1.1-2.8-3.1z"
            />
            <path
                id="Layer"
                className="s0"
                d="m165.7 35.2v-4.6h-1v-0.6h0.3c0.5 0 0.7-0.2 0.7-0.8v-0.5h0.6v1.3h2.4v0.6h-2.4v4.6c0 1.1 0.5 1.8 1.4 1.8q0.5 0 1-0.2v0.6q-0.5 0.2-1.1 0.2c-1.2 0-1.9-0.9-1.9-2.4z"
            />
            <path
                id="Layer"
                className="s0"
                d="m171.1 28.1q0-0.1 0.1-0.2 0-0.1 0.1-0.1 0-0.1 0.1-0.1 0.1-0.1 0.2-0.1 0.1 0 0.2 0.1 0.1 0 0.1 0.1 0.1 0 0.1 0.1 0.1 0.1 0.1 0.2 0 0.2-0.2 0.3-0.1 0.2-0.3 0.2-0.1 0-0.2-0.1-0.1 0-0.1-0.1-0.1 0-0.1-0.1-0.1-0.1-0.1-0.2zm0.8 1.9v7.4h-0.6v-7.4z"
            />
            <path
                id="Layer"
                fill-rule="evenodd"
                className="s0"
                d="m174.7 33.7c0-1 0.4-2 1.1-2.8 0.7-0.7 1.7-1.1 2.8-1.1 1 0 2 0.4 2.7 1.1 0.8 0.8 1.2 1.8 1.2 2.8 0 1.1-0.4 2-1.2 2.8-0.7 0.7-1.7 1.1-2.7 1.1-1.1 0-2.1-0.4-2.8-1.1-0.7-0.8-1.1-1.7-1.1-2.8zm7.2 0c0-0.9-0.3-1.7-1-2.3-0.6-0.7-1.4-1-2.3-1-0.9 0-1.8 0.3-2.4 1-0.6 0.6-1 1.4-1 2.3 0 0.9 0.4 1.7 1 2.4 0.6 0.6 1.5 0.9 2.4 0.9 0.9 0 1.7-0.3 2.3-0.9 0.7-0.7 1-1.5 1-2.4z"
            />
            <path
                id="Layer"
                className="s0"
                d="m185.1 30h0.5l0.1 1.3c0.5-1 1.4-1.5 2.6-1.5 1.5 0 2.7 1 2.7 3.6v4h-0.6v-4c0-2.2-0.9-3-2.3-3-1.4 0-2.4 0.8-2.4 3v4h-0.6z"
            />
            <path
                id="Layer"
                className="s0"
                d="m193.6 36.1l0.4-0.4q0.3 0.7 0.9 1 0.7 0.4 1.4 0.4c1 0 2-0.6 2-1.6 0-0.9-1.3-1.4-2.3-1.8-0.7-0.2-2-0.7-2-2 0-1 0.9-1.9 2.3-1.9 1.1 0 2 0.6 2.3 1.4l-0.4 0.3c-0.4-0.8-1.2-1.1-1.9-1.1-1.1 0-1.7 0.6-1.7 1.3 0 0.9 1 1.3 2 1.7 0.8 0.3 2.3 0.8 2.3 2.1 0 1.3-1.3 2.1-2.6 2.1-1.2 0-2.3-0.6-2.7-1.5z"
            />
            <path
                id="Layer"
                className="s1"
                d="m38.8 21v23.6h-15.5v-23.3h-23.3v-15.5h23.7v15.2z"
            />
            <path
                id="Layer"
                className="s2"
                d="m28.3 16.3v-15.5h7.5v8h8.1v7.5z"
            />
        </svg>
    );
}
