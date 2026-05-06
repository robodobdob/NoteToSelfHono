import * as sql from 'mssql';
import { Note, NotesSearchResult, Tag } from '../models';
import { dbTagsToArray } from '../features/shared/helpers';

const connectionString = process.env.ConnectionStrings__AZURE_SQL_CONNECTION_STRING!;

function mapRow(row: any): Note {
    return {
        ...row,
        Tags: dbTagsToArray(row.Tags ?? ''),
        IsPrivate: row.IsPrivate === true || row.IsPrivate === 1,
    };
}

export async function getLatestNotes(): Promise<NotesSearchResult> {
    try {
        await sql.connect(connectionString);
        const notesResult = await new sql.Request().execute('dbo.GetLatestNotes');
        const countResult = await new sql.Request().query<{ TotalCount: number }>('SELECT COUNT(*) AS TotalCount FROM dbo.Notes');
        const notes = notesResult.recordset.map(mapRow);
        const totalNotesCount = countResult.recordset[0]?.TotalCount ?? 0;
        return { Notes: notes, TotalNotesCount: totalNotesCount };
    } catch (err) {
        console.error("SQL error", err);
        return { Notes: [], TotalNotesCount: 0 };
    }
}

export async function getNote(id: string): Promise<Note | null> {
    try {
        await sql.connect(connectionString);

        const request = new sql.Request();
        request.input('Id', sql.UniqueIdentifier, id);
        const result = await request.execute('dbo.GetNote');
        if (!result.recordset[0]) return null;
        return mapRow(result.recordset[0]);
    } catch (err) {
        console.error("SQL error", err);
        return null;
    }
}

export async function getTags(): Promise<Tag[] | []> {
    try {
        await sql.connect(connectionString);

        const result = await new sql.Request().execute('dbo.GetTags');
        return result.recordset;
    } catch (err) {
        console.error("SQL error", err)
        return []
    }
}

export async function searchNotes(query: string): Promise<NotesSearchResult> {
    try {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('SearchQuery', sql.NVarChar, `%${query}%`)
        const result = await request.execute('dbo.SearchNotes');
        const notes = result.recordset.map(mapRow);
        return { Notes: notes, TotalNotesCount: notes.length };
    } catch (err) {
        console.error("SQL error", err);
        return { Notes: [], TotalNotesCount: 0 };
    }
}

export async function filterNotes(query: string[]): Promise<NotesSearchResult> {
    try {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('Tags', sql.NVarChar, query.join(','))
        const result = await request.execute('dbo.FilterNotes');
        const notes = result.recordset.map(mapRow);
        return { Notes: notes, TotalNotesCount: notes.length };
    } catch (err) {
        console.error("SQL error", err);
        return { Notes: [], TotalNotesCount: 0 };
    }
}

export async function saveNote(note: Note): Promise<string> {
    try {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input("Id", sql.UniqueIdentifier, note.Id);
        request.input("Title", sql.NVarChar(200), note.Title);
        request.input("Description", sql.NVarChar(sql.MAX), note.Description);
        request.input("Tags", sql.NVarChar(200), note.Tags.join('|'));
        request.input("Rating", sql.Int, note.Rating);
        request.input("IsPrivate", sql.Bit, note.IsPrivate ? 1 : 0);
        request.input("StorageUrl", sql.NVarChar(200), note.StorageUrl ?? null);
        request.input("FileName", sql.NVarChar(200), note.FileName ?? null);
        request.input("FileContentType", sql.NVarChar(50), note.FileContentType ?? null);
        request.input("SearchText", sql.NVarChar(1000), note.SearchText ?? null);
        const result = await request.execute<{ Id: string }>('dbo.SaveNote');
        return result.recordset[0].Id;
    } catch (err) {
        console.error("SQL error", err);
        return "";
    }
}

export async function deleteNote(id: string): Promise<boolean> {
    try {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('Id', sql.UniqueIdentifier, id)
        await request.execute('dbo.DeleteNote');
        return true;
    } catch (err) {
        console.error("SQL error", err);
        return false;
    }
}