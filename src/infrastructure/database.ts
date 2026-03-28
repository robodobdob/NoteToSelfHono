import * as sql from 'mssql';
import { Note, NotesSearchResult, Tag } from '../models';
import { dbTagsToArray } from '../features/shared/helpers';

const connectionString = process.env.DB_CONNECTION_STRING!;

function mapRow(row: Record<string, unknown>): Note {
    return {
        Id: row.Id as string,
        Title: row.Title as string,
        Description: row.Description as string,
        Tags: dbTagsToArray((row.Tags as string) ?? ''),
        Rating: row.Rating as number,
        IsPrivate: row.IsPrivate === true || row.IsPrivate === 1,
        StorageUrl: (row.StorageUrl as string | null) ?? null,
        FileName: (row.FileName as string | null) ?? null,
        FileContentType: row.FileContentType as string | undefined,
        SearchText: row.SearchText as string | undefined,
        CreatedAt: row.CreatedAt as Date | null | undefined,
    };
}

export async function getLatestNotes(): Promise<NotesSearchResult> {
    try {
        await sql.connect(connectionString);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT TOP 12 *, (SELECT COUNT(*) FROM dbo.Notes) AS TotalCount
            FROM dbo.Notes 
            ORDER BY CreatedAt DESC
        `);
        const notes = result.recordset.map(mapRow);
        const totalNotesCount = result.recordset[0]?.TotalCount ?? 0;
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
        request.input('Id', sql.VarChar, id);
        const result = await request.query(`
            SELECT * 
            FROM dbo.Notes 
            WHERE Id = @Id
        `);
        if (!result.recordset[0]) return null;
        return mapRow(result.recordset[0]);
    } catch (err) {
        console.error("SQL error", err);
        return null;
    }
}

export async function getTags(): Promise<Tag[]> {
    try {
        await sql.connect(connectionString);

        const request = new sql.Request();
        const result = await request.query(`
            SELECT TRIM(value) AS [Name], COUNT(*) AS [Count]
            FROM dbo.Notes
            CROSS APPLY STRING_SPLIT(Tags, '|')
            GROUP BY TRIM(value)
            ORDER BY [Name];
        `);
        return result.recordset
    } catch (err) {
        console.error("SQL error", err)
        return []
    }
}

export async function searchNotes(query: string): Promise<NotesSearchResult> {
    try {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('Query', sql.NVarChar, query)
        const result = await request.query(`
            SELECT * 
            FROM dbo.Notes 
            WHERE SearchText LIKE '%' + @Query + '%'
            ORDER BY [Title] ASC;
        `);
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
        const result = await request.query(`
            SELECT *
            FROM dbo.Notes
            WHERE (
                SELECT COUNT(DISTINCT q.value)
                FROM STRING_SPLIT(@Tags, ',') AS q
                WHERE q.value IN (
                    SELECT value FROM STRING_SPLIT(Tags, '|')
                )
            ) = (
                SELECT COUNT(*) FROM STRING_SPLIT(@Tags, ',')
            )
            ORDER BY [Title] ASC;
        `)
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
        const result = await request.query<{ Id: string }>(`
            MERGE dbo.Notes AS Target
            USING (VALUES (@Id, @Title, @Description, @Tags, @Rating, @IsPrivate, @StorageUrl, @FileName, @FileContentType, @SearchText))
                AS Source (Id, Title, Description, Tags, Rating, IsPrivate, StorageUrl, FileName, FileContentType, SearchText)
            ON Target.Id = Source.Id
            WHEN MATCHED THEN
                UPDATE SET
                Title = Source.Title,
                Description = Source.Description,
                Tags = Source.Tags,
                Rating = Source.Rating,
                IsPrivate = Source.IsPrivate,
                StorageUrl = Source.StorageUrl,
                FileName = Source.FileName,
                FileContentType = Source.FileContentType,
                SearchText = Source.SearchText,
                CreatedAt = GETUTCDATE()
            WHEN NOT MATCHED BY TARGET THEN
                INSERT (Id, Title, Description, Tags, Rating, IsPrivate, StorageUrl, FileName, FileContentType, SearchText, CreatedAt)
                VALUES (NEWID(), Source.Title, Source.Description, Source.Tags, Source.Rating, Source.IsPrivate, Source.StorageUrl, Source.FileName, Source.FileContentType, Source.SearchText, GETUTCDATE())
            OUTPUT inserted.Id;
        `);
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
        await request.query(`
            DELETE 
            FROM dbo.Notes 
            WHERE Id = @Id
        `);
        return true;
    } catch (err) {
        console.error("SQL error", err);
        return false;
    }
}