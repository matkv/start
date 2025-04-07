import { json } from '@sveltejs/kit';

export function _exportPageAsHTML() {
    const htmlContent = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'export.html';
    link.click();

    URL.revokeObjectURL(url);
}