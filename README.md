# NoteToSelf

A personal note-taking application with file attachments, tag filtering, star ratings, and a real-time chat assistant — built with **Hono**, **TypeScript**, and **Bun**.

## Features

- Create, read, update, and delete notes
- File attachments with automatic image optimisation (resized to 600×600 px)
- Tag-based filtering and full-text search
- Star ratings and private note flag
- PIN-based authentication
- Real-time chat assistant via Server-Sent Events (SSE)
- Server-side JSX rendering (no React required)

## Technology Stack

| Layer | Technology |
|---|---|
| Runtime | [Bun](https://bun.sh/) |
| Web Framework | [Hono 4.11.7](https://hono.dev/) |
| Language | TypeScript (strict) |
| UI Rendering | Hono JSX (`hono/jsx`) |
| Database | Microsoft SQL Server |
| Database Driver | [mssql 12.2.0](https://www.npmjs.com/package/mssql) |
| Cloud Storage | [Azure Blob Storage 12.29.1](https://www.npmjs.com/package/@azure/storage-blob) |
| Azure Auth | [Azure Identity 4.13.0](https://www.npmjs.com/package/@azure/identity) |
| Image Processing | [sharp 0.34.5](https://github.com/lovell/sharp) |
| UUID Generation | [uuid 13.0.0](https://www.npmjs.com/package/uuid) |

## Project Structure

```
src/
├── index.tsx                   # Application entry point
├── hono.tsx                    # Hono app instance
├── models.ts                   # TypeScript type definitions
├── infrastructure/
│   ├── database.ts             # SQL Server queries
│   └── storage.ts              # Azure Blob Storage operations
└── features/
    ├── auth/
    │   ├── authEndpoints.tsx   # Login / logout routes
    │   └── components/
    │       └── Login.tsx
    ├── notes/
    │   ├── notesEndpoints.tsx  # Notes API routes
    │   ├── notesService.ts     # Notes business logic
    │   └── components/         # NoteList, NoteDetails, EditNote, etc.
    ├── chat/
    │   ├── chatEndpoints.tsx   # Chat routes (SSE)
    │   └── components/         # ChatForm, ChatModal
    └── shared/
        ├── helpers.ts
        └── components/         # PageLayout, BodyLayout, Icon, etc.
static/                         # Static assets (CSS, JS, images)
```

## Setup

### Prerequisites

- [Bun](https://bun.sh/docs/installation)
- Microsoft SQL Server (local or Azure)
- Azure Storage Account (or Azurite for local development)

### Install Dependencies

```bash
cd NoteToSelfHono
bun install
```

### Configure Environment Variables

Create a `.env` file in the project root:

```env
ConnectionStrings__AzureSql=Server=your-server.database.windows.net;Database=your-db;...
ConnectionStrings__AzureStorage=DefaultEndpointsProtocol=https;AccountName=...
PIN_CODE=1234
PORT=3000
NODE_ENV=development
```

| Variable | Description |
|---|---|
| `ConnectionStrings__AzureSql` | Full mssql connection string |
| `ConnectionStrings__AzureStorage` | Azure Blob Storage connection string |
| `PIN_CODE` | PIN code required to log in |
| `PORT` | Server port (default: `3000`) |
| `NODE_ENV` | `production` enables secure cookies |

### Run the Development Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). The server hot-reloads on file changes.

### Build for Production

```bash
bun run build
```

Output is written to `dist/`.

### Compile to a Standalone Executable

```bash
bun run build-app
```

Creates a single self-contained binary named `app`.

---

## Database Setup

There are no built-in migrations. Run the following script against your SQL Server database to create the required table and indexes:

```sql
CREATE TABLE dbo.Notes (
    Id              UNIQUEIDENTIFIER  NOT NULL DEFAULT NEWID() PRIMARY KEY,
    Title           NVARCHAR(200)     NOT NULL,
    Description     NVARCHAR(MAX)     NOT NULL,
    Tags            NVARCHAR(200)     NULL,
    Rating          INT               NOT NULL DEFAULT 0,
    IsPrivate       BIT               NOT NULL DEFAULT 0,
    StorageUrl      NVARCHAR(200)     NULL,
    FileName        NVARCHAR(200)     NULL,
    FileContentType NVARCHAR(50)      NULL,
    SearchText      NVARCHAR(1000)    NULL,
    CreatedAt       DATETIME2         NOT NULL DEFAULT GETUTCDATE()
);

CREATE INDEX IX_Notes_Tags       ON dbo.Notes (Tags);
CREATE INDEX IX_Notes_SearchText ON dbo.Notes (SearchText);
```

Tags are stored as pipe-delimited strings, e.g. `cooking|recipes|thai`.

---

## API Endpoints

All routes except `/login` and `/auth/*` require a valid session (PIN authentication).

### Authentication

| Method | Path | Description |
|---|---|---|
| `GET` | `/login` | Display login page |
| `POST` | `/auth/login` | Authenticate with PIN |
| `POST` | `/auth/logout` | Clear session and redirect to login |

### Notes

| Method | Path | Description |
|---|---|---|
| `GET` | `/notes/list` | List notes; supports `Query` and `Tags[]` query params |
| `GET` | `/notes/details/:id` | Get note detail view |
| `GET` | `/notes/edit/:id` | Get note edit form |
| `POST` | `/notes/edit/:id` | Save / update a note (multipart form, optional file upload) |
| `DELETE` | `/notes/delete/:id` | Delete a note |
| `GET` | `/notes/rating/:rating` | Get star rating selector component |

### Chat

| Method | Path | Description |
|---|---|---|
| `POST` | `/chat/message` | Post a chat message |
| `GET` | `/chat/events` | SSE stream for real-time chat responses |

### Utility

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | Home page |
| `GET` | `/refresh` | Refresh component |
| `GET` | `/static/*` | Serve static assets |

---

## Infrastructure

### Cloud Storage

Files are stored in an Azure Blob Storage container named `notes`, organised as `{noteId}/{fileName}`. Authentication uses `DefaultAzureCredential` (Azure AD).

Images are automatically resized to **600×600 px** before upload using `sharp`.

### CI/CD

GitHub Actions workflow (`.github/workflows/main_notetoself-bun.yml`) triggers on pushes to `main` and manual dispatch:

1. **Build** — installs Bun, runs `bun install --frozen-lockfile`, builds the app, packages static assets and the Bun runtime binary into a deployment artifact.
2. **Deploy** — authenticates to Azure via OIDC federated credentials and deploys to the `notetoself-bun` Azure Web App (production slot).

---

## License

This project is suitable for learning purposes only and does not represent a commercial product.