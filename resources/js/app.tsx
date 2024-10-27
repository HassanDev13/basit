import "./bootstrap";
import "../css/app.css";

import { createRoot, hydrateRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import LanguageProvider from "./providers/language-provider";
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "./components/ui/toaster";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const locale = props.initialPage.props.locale as string;

        const inertiaApp = (
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <LanguageProvider locale={locale}>
                    <App {...props} />
                    <Toaster />
                </LanguageProvider>
            </ThemeProvider>
        );
        if (import.meta.env.DEV) {
            createRoot(el).render(inertiaApp);
            return;
        }

        hydrateRoot(el, inertiaApp);
    },
    progress: {
        color: "#4B5563",
    },
});
