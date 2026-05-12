//import { DefaultAzureCredential, AzureCliCredential } from '@azure/identity';
import { BlobServiceClient } from '@azure/storage-blob';

const connectionString = process.env.CUSTOMCONNSTR_StorageConnection!;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient('notes');

export async function uploadFile(fileContent: Buffer, noteId: string, fileName: string): Promise<string> {
    await containerClient.createIfNotExists();
    const blobPath: string = `${noteId}/${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobPath);

    await blockBlobClient.uploadData(fileContent, {
        blobHTTPHeaders: { blobContentType: 'application/octet-stream' },
    });
    return blockBlobClient.url;
}

export async function deleteFile(noteId: string, fileName: string): Promise<void> {
    const blobPath: string = `${noteId}/${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobPath);
    await blockBlobClient.deleteIfExists();
}