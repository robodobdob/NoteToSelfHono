import {Note, Tag} from "../models";
import {uploadFile} from "../infrastructure/Storage";
import {deleteNote, filterNotes, getLatestNotes, getNote, getTags, saveNote, searchNotes} from "../infrastructure/Database";

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

export async function saveNoteAsync(note: Note, file?: Blob): Promise<string> {
    // Upload file to Azure storage if provided
    if (file) {
        note.StorageUrl = await uploadFile(file, note.Id, note.FileName!);
    }

    return await saveNote(note);
}

export async function deleteNoteAsync(id: string): Promise<boolean> {
    return deleteNote(id);
}