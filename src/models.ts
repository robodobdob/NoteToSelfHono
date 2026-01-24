interface Note {
    Id: string
    Title: string
    Description: string
    Tags: string
    Rating: number
    StorageUrl?: string
    FileName?: string
    File?: Blob
}

interface Tag {
    Name: string;
    Count: number;
}

function toNote(body: any): Note {
  return {
    Id: String(body.Id),
    Title: String(body.Title),
    Description: String(body.Description),
    Tags: String(body.Tags),
    Rating: Number(body.Rating),
    StorageUrl: String(body.StorageUrl) ?? null,
    FileName: String(body.File.name) ?? null,
    File: body.File ?? null
  }
}

export {
    Note,
    Tag,
    toNote
}