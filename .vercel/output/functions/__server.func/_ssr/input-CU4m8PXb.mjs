import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as cn } from "./avatar-B8NRGib8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-CU4m8PXb.js
var import_jsx_runtime = require_jsx_runtime();
var field = "w-full rounded-[14px] bg-canvas-deep/70 px-4 py-3 text-ink shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-brand)_28%,transparent)] placeholder:text-ink-soft/70 focus:outline-none focus:shadow-[0_0_0_2px_var(--color-brand)]";
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn(field, "h-12", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn(field, "min-h-32 resize-y", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("mb-1.5 block text-sm font-medium text-ink", className),
		...props
	});
}
//#endregion
export { Label as n, Textarea as r, Input as t };
