import { DefaultAzureCredential } from '@azure/identity';
import { BlobServiceClient } from '@azure/storage-blob';

const storageUrl = process.env.AZURE_STORAGE_URL!;

const blobServiceClient = new BlobServiceClient(storageUrl, new DefaultAzureCredential());

const containerClient = blobServiceClient.getContainerClient('notes');

export async function uploadFile(fileContent: Blob, noteId: string, fileName: string): Promise<string> {
    await containerClient.createIfNotExists();
    const blobPath: string = `${noteId}/${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobPath);
    
    // Convert Bun BlobOrStringOrBuffer to Buffer if needed for Azure SDK compatibility
    let dataToUpload = Buffer.from(await fileContent.arrayBuffer());
    
    await blockBlobClient.uploadData(dataToUpload, {
        blobHTTPHeaders: { blobContentType: 'application/octet-stream' },
    });
    return blockBlobClient.url;
}

export async function deleteFile(noteId: string, fileName: string): Promise<void> {
    const blobPath: string = `${noteId}/${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobPath);
    await blockBlobClient.deleteIfExists();
}