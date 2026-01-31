import {Note, Tag} from "../../models";
import {deleteFile, uploadFile} from "../../infrastructure/storage";
import {deleteNote, filterNotes, getLatestNotes, getNote, getTags, saveNote, searchNotes} from "../../infrastructure/database";
import {spacesToTags} from "../shared/helpers";
import sharp from "sharp";

const SEARCH_TEXT_MAX_LENGTH: number = 450;

export async function getLatestNotesAsync(): Promise<Note[]> {
    return await getLatestNotes();
}

export async function getNoteByIdAsync(id: string): Promise<Note | null> {
    return await getNote(id);
}

export async function getAllTagsAsync(): Promise<Tag[] | []> {
    return await getTags();
}

export async function searchNotesAsync(query: string): Promise<Note[]> {
    return await searchNotes(query);
}

export async function searchTagsAsync(tags: string[]): Promise<Note[]> {
    return await filterNotes(tags);
}

export async function saveNoteAsync(note: Note, file: Blob | null | undefined): Promise<string> {
    note.SearchText = generateSearchText(note);
    note.CreatedAt = new Date();
    note.Tags = spacesToTags(note.Tags ?? '')

    // Upload file to Azure storage if provided
    if (file!.size > 0) {
        // Upload the file blob and save file details to the note
        // Try to get filename from File object, then note.FileName, otherwise use default
        const fileName = (file instanceof File && file.name) || note.FileName || 'file';
        const resized = await resizeImage(file!);
        note.StorageUrl = await uploadFile(resized, note.Id, fileName);
        note.FileName = fileName;
        // Set FileContentType if available from the file blob
        if (file!.type) {
            note.FileContentType = file!.type;
        }
    } else {
        // If file blob is null, check if note already has file details and retain them
        note.StorageUrl = null;
        note.FileName = null;
        const existingNote = await getNote(note.Id);
        if (existingNote?.StorageUrl && existingNote?.FileName) {
            note.StorageUrl = existingNote.StorageUrl;
            note.FileName = existingNote.FileName;
            note.FileContentType = existingNote.FileContentType;
        }
    }

    return await saveNote(note);
}

export async function removeNoteAsync(id: string): Promise<boolean> {
    const existingNote = await getNote(id);
    if (existingNote?.StorageUrl && existingNote?.FileName) {
        await deleteFile(id, existingNote.FileName);
    }
    return deleteNote(id);
}

function generateSearchText(dto: Note): string {
    // Combine Title, Description into a single searchable string
    // the result must be lowercase for case insensitive searching
    // remove any null or duplicate values
    const titleParts = (dto.Title ?? '')
        .split(' ')
        .filter(x => x.trim() !== '')
        .map(x => x.toLowerCase());

    const descriptionParts = (dto.Description ?? '')
        .split(' ')
        .filter(x => x.trim() !== '')
        .map(x => x.toLowerCase());

    const parts = [...titleParts, ...descriptionParts]
        .filter(x => x.trim() !== '')
        .filter((value, index, self) => self.indexOf(value) === index); // distinct

    let searchText = parts.join(' ');

    // Truncate to fit indexed column size limit, breaking at word boundaries
    if (searchText.length > SEARCH_TEXT_MAX_LENGTH) {
        const lastSpace = searchText.lastIndexOf(' ', SEARCH_TEXT_MAX_LENGTH - 1);
        const truncateLength = lastSpace > 0 ? lastSpace : SEARCH_TEXT_MAX_LENGTH;
        searchText = searchText.substring(0, truncateLength);
    }

    return searchText;
}

async function resizeImage(file: Blob): Promise<Buffer> {
    const bytes = Buffer.from(await file.bytes());
    return sharp(bytes)
        .resize({ width: 600, height: 600, fit: "inside"})
        .toBuffer();
}