export const fetchFileData = async (filename: string, onProgress: (progress: number) => void) => {
  const fileUrl = `https://prac2.priyanshu-paul003.workers.dev/${filename}`;

  try {
    const response = await fetch(fileUrl);
    const contentLength = response.headers.get('Content-Length');

    if (!response.ok) {
      throw new Error('File not found');
    }

    if (!contentLength) {
      throw new Error('Content-Length header is missing');
    }

    const total = parseInt(contentLength, 10);
    let loaded = 0;

    const reader = response.body?.getReader();
    const chunks: Uint8Array[] = [];

    if (!reader) {
      throw new Error('Failed to get reader');
    }

    while (true) {
      const result = await reader.read();
      if (result.done) break;
      if (result.value) {
        chunks.push(result.value);
        loaded += result.value.length;
        onProgress((loaded / total) * 100);
      }
    }

    const buffer = new Uint8Array(loaded);
    let offset = 0;
    for (const chunk of chunks) {
      buffer.set(chunk, offset);
      offset += chunk.length;
    }

    const base64 = Buffer.from(buffer).toString('base64');
    const contentType = response.headers.get('Content-Type');

    return { base64, contentType, contentLength };
  } catch (error) {
    console.error('Error fetching file:', error);
    throw error;
  }
};
