import {Note, NotesSearchResult, Tag} from "../../models";
import {deleteFile, uploadFile} from "../../infrastructure/storage";
import {deleteNote, filterNotes, getLatestNotes, getNote, getTags, saveNote, searchNotes} from "../../infrastructure/database";
import {arrayToDbTags} from "../shared/helpers";
import sharp from "sharp";

const SEARCH_TEXT_MAX_LENGTH: number = 450;

export async function getLatestNotesAsync(): Promise<NotesSearchResult> {
    return await getLatestNotes();
}

export async function getNoteByIdAsync(id: string): Promise<Note | null> {
    return await getNote(id);
}

export async function getAllTagsAsync(): Promise<Tag[]> {
    return await getTags();
}

export async function searchNotesAsync(query: string): Promise<NotesSearchResult> {
    return await searchNotes(query);
}

export async function searchTagsAsync(tags: string[]): Promise<NotesSearchResult> {
    return await filterNotes(tags);
}

export async function saveNoteAsync(note: Note, file: Blob | null | undefined): Promise<string> {
    note.SearchText = generateSearchText(note);
    note.CreatedAt = new Date();

    // Upload file to Azure storage if provided
    if (file && file.size > 0) {
        // Try to get filename from File object, then note.FileName, otherwise use default
        const fileName = (file instanceof File && file.name) || note.FileName || 'file';
        const resized = await resizeImage(file);
        note.StorageUrl = await uploadFile(resized, note.Id, fileName);
        note.FileName = fileName;
        if (file.type) {
            note.FileContentType = file.type;
        }
    } else {
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
        .filter((value, index, self) => self.indexOf(value) === index);

    let searchText = parts.join(' ');

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