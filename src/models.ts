export type Note = {
    Id: string
    Title: string
    Description: string
    Tags: string[]
    Rating: number
    IsPrivate: boolean
    StorageUrl: string | null
    FileName: string | null
    File?: Blob
    FileContentType?: string
    SearchText?: string
    CreatedAt?: Date | null
}

export type Tag = {
    Name: string;
    Count: number;
}

export type NotesSearchResult = {
    Notes: Note[];
    TotalNotesCount: number;
}

export function toNote(body: any): Note {
  const tagsRaw = String(body.Tags ?? '');
  return {
    Id: String(body.Id),
    Title: String(body.Title),
    Description: String(body.Description),
    Tags: tagsRaw.split(' ').map(t => t.trim()).filter(t => t.length > 0),
    Rating: Number(body.Rating),
    IsPrivate: body.IsPrivate === 'true' || body.IsPrivate === true,
    StorageUrl: body.StorageUrl != null ? String(body.StorageUrl) : null,
    FileName: (body.File instanceof File && body.File.name) ? body.File.name : null,
    File: body.File instanceof Blob ? body.File : undefined
  }
}
