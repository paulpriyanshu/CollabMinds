import { fetchFileData } from '../../../apps/editor-app/app/api/download/download';

export const downloadFileWithProgress = async (filename: string, onProgress: (progress: number) => void) => {
    try {
        const { base64, contentType } = await fetchFileData(filename, onProgress);

        if (!contentType) {
            throw new Error('Content-Type is missing');
        }

        const binary = atob(base64);
        const len = binary.length;
        const buffer = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
            buffer[i] = binary.charCodeAt(i);
        }

        const blob = new Blob([buffer], { type: contentType });
        const url = window.URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Download failed:', error);
    }
};
