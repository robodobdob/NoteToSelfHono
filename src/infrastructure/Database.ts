import * as sql from 'mssql';
import { Note, Tag } from '../models';
import { spacesToTags } from '../features/shared/helpers';

const config: sql.config = {
    server: process.env.DB_SERVER!,
    database: process.env.DB_NAME!,
    connectionTimeout: 30000,
    options: {
        encrypt: true,
        trustServerCertificate: false,
        database: process.env.DB_NAME!
    },
    authentication: {
        type: "azure-active-directory-default",
        options: {},
    },
};

export async function getLatestNotes(): Promise<Note[]> {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT TOP 10 * FROM dbo.Notes ORDER BY CreatedAt DESC
        `);
        return result.recordset;
    } catch (err) {
        console.error("SQL error", err);
        return [];
    }
}

export async function getNote(id: string): Promise<Note | null> {
    try {
        await sql.connect(config);

        const request = new sql.Request();
        request.input('Id', sql.VarChar, id);
        const result = await request.query(`
            SELECT * FROM dbo.Notes WHERE Id = @Id
        `);
        return result.recordset[0];
    } catch (err) {
        console.error("SQL error", err);
        return null;
    }
}

export async function getTags(): Promise<Tag[] | []> {
    try {
        await sql.connect(config);

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

export async function searchNotes(query: string): Promise<Note[]> {
    try {
        await sql.connect(config)
        const request = new sql.Request()
        request.input('Query', sql.NVarChar, query)
        const result = await request.query(`
            SELECT * FROM dbo.Notes WHERE SearchText LIKE '%' + @Query + '%' ORDER BY CreatedAt DESC
        `);
        return result.recordset;
    } catch (err) {
        console.error("SQL error", err);
        return [];
    }
}

export async function filterNotes(query: string[]): Promise<Note[]> {
    try {
        await sql.connect(config)
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
            );
        `)
        return result.recordset;
    } catch (err) {
        console.error("SQL error", err);
        return []
    }
}

export async function saveNote(note: Note): Promise<string> {
    try {
        await sql.connect(config)
        const request = new sql.Request()
        request.input("Id", sql.UniqueIdentifier, note.Id);
        request.input("Title", sql.NVarChar(200), note.Title);
        request.input("Description", sql.NVarChar(sql.MAX), note.Description);
        request.input("Tags", sql.NVarChar(200), spacesToTags(note.Tags));
        request.input("Rating", sql.Int, note.Rating);
        request.input("StorageUrl", sql.NVarChar(500), note.StorageUrl ?? null);
        request.input("FileName", sql.NVarChar(200), note.FileName ?? null);
        const result = await request.query<{ Id: string }>(`
            IF EXISTS (SELECT 1 FROM dbo.Notes WHERE Id = @Id)
            BEGIN
                UPDATE Notes
                SET Title = @Title,
                    Description = @Description,
                    Tags = @Tags,
                    Rating = @Rating,
                    StorageUrl = @StorageUrl,
                    FileName = @FileName,
                    CreatedAt = GETDATE()
                OUTPUT inserted.Id
                WHERE Id = @Id;
            END
            ELSE
            BEGIN
                INSERT INTO Notes (Id, Title, Description, Tags, Rating, StorageUrl, FileName, CreatedAt)
                OUTPUT inserted.Id
                VALUES (@Id, @Title, @Description, @Tags, @Rating, @StorageUrl, @FileName, GETDATE());
            END
        `);
        return result.recordset[0].Id;
    } catch (err) {
        console.error("SQL error", err);
        return "";
    }
}

export async function deleteNote(id: string): Promise<boolean> {
    try {
        await sql.connect(config)
        const request = new sql.Request()
        request.input('Id', sql.UniqueIdentifier, id)
        const result = await request.query(`
            DELETE FROM dbo.Notes WHERE Id = @Id
        `);
        return true;
    } catch (err) {
        console.error("SQL error", err);
        return false;
    }
}