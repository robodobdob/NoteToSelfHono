# NoteToSelf

A note-taking application with file attachments, built using **Hono** (TypeScript/Bun).

## Technology Stack

The Hono implementation is a lightweight, fast web application built with TypeScript and the Bun runtime.

#### Tech Stack Components:

- **Runtime**: [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime with native bundler
- **Web Framework**: [Hono 4.10.7](https://hono.dev/) - Ultrafast web framework for edge computing
- **Language**: TypeScript with strict type checking
- **UI Rendering**: JSX with Hono's JSX runtime (`hono/jsx`)
- **Database Driver**: [mssql 12.2.0](https://www.npmjs.com/package/mssql) - Microsoft SQL Server client for Node.js/Bun
- **Database**: SQL Server with Azure Active Directory authentication
- **Cloud Storage**: [@azure/storage-blob 12.29.1](https://www.npmjs.com/package/@azure/storage-blob) - Azure Blob Storage SDK
- **Authentication**: [@azure/identity 4.13.0](https://www.npmjs.com/package/@azure/identity) - Azure Active Directory authentication
- **Utilities**: [uuid 13.0.0](https://www.npmjs.com/package/uuid) - UUID generation

#### Key Features:
- JSX-based component rendering without React
- File-based routing with Hono routes
- Built-in logger middleware
- Static file serving with Bun's native performance
- Hot reload during development
- Direct SQL queries with prepared statements
- Azure AD authentication for database and storage

#### Project Structure:
- **src/components**: JSX components for UI (pages, layout, shared components)
- **src/services**: Business logic (Database, NotesService, Storage)
- **static**: Static assets served directly
- **index.tsx**: Application entry point

#### Setup Instructions:

1. **Prerequisites**:
    - Install [Bun](https://bun.sh/docs/installation)
    - SQL Server instance (local or Azure)
    - Azure Storage Account

2. **Install Dependencies**:
   ```bash
   cd Hono
   bun install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the Hono directory:
   ```env
   DB_SERVER=your-sql-server.database.windows.net
   DB_NAME=your-database-name
   AZURE_ACCOUNT_NAME=your-storage-account-name
   PORT=3000
   ```

4. **Run Development Server** (with hot reload):
   ```bash
   bun run dev
   ```
   Open http://localhost:3000

5. **Build for Production**:
   ```bash
   bun run build
   ```

6. **Compile to Standalone Executable**:
   ```bash
   bun run build-app
   ```
   This creates a single executable file named `app`

---

## Infrastructure

### Database Schema
- **SQL Server** database with a `Notes` table
- **Columns**: Id, Title, Description, Tags, Rating, StorageUrl, FileName, FileContentType, SearchText, CreatedAt
- **Indexes**: Tags and SearchText for optimized queries
- **Tag System**: Pipe-delimited tags (`tag1|tag2|tag3`)

### Cloud Storage
- **Azure Blob Storage** container named `notes`
- **File Organization**: Files stored as `{noteId}/{fileName}`
- **Authentication**: Azure Active Directory (DefaultAzureCredential)

### Features
- Create, read, update, and delete notes
- File attachments with cloud storage
- Tag-based filtering and searching
- Full-text search across note content
- Star ratings for notes
- Responsive UI

## Development Workflow

```bash
cd Hono
bun run dev
```

## License

This project is suitable for learning purposes only and does not represent a commercial product.