import { json } from '@sveltejs/kit';

export async function _exportPageAsHTML() {
    const nav = document.querySelector("nav");
    const originalDisplay = nav?.style.display;
    if (nav) nav.style.display = "none";

    await new Promise((resolve) => setTimeout(resolve, 50));
    const htmlContent = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'export.html';
    link.click();

    URL.revokeObjectURL(url);

    if (nav) nav.style.display = originalDisplay || "";
}