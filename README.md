# Next.js MCP Template

A Next.js template that integrates with the Model Context Protocol (MCP) using the xmcp adapter, enabling AI assistants to interact with your web application through standardized tools and resources.

## Features

- 🚀 **Next.js 15** with TypeScript and Tailwind CSS
- 🤖 **MCP Integration** via xmcp adapter for AI assistant compatibility
- 🔐 **Authentication** with Clerk
- 🌐 **Farcaster Integration** for decentralized social features
- ☁️ **Multi-platform Deployment** (Vercel, Cloudflare)
- 🛠️ **AI SDK** with multiple provider support (OpenAI, OpenRouter, Google Gemini)
- 🏗️ **Database Ready** with Drizzle ORM and PostgreSQL
- 🎨 **Modern UI** with Tailwind CSS and dark mode support

## Installation

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm/bun
- GitHub CLI (for template usage)
- PostgreSQL database (optional, for full functionality)

### Clone and Setup

1. **Create a new repository from this template:**
   ```bash
   gh repo create your-new-repo --template uratmangun/nextjs-mcp-2 --public --clone
   ```

2. **Or clone an existing repository:**
   ```bash
   gh repo clone username/your-repo-name
   ```

3. **Make repository public (if needed):**
   ```bash
   gh repo edit --visibility public
   ```

4. **Install dependencies:**
   ```bash
   bun install
   # or
   pnpm install
   # or
   yarn install
   # or
   npm install
   ```

5. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

   Fill in your API keys and configuration in `.env.local`

6. **Set up the database (optional):**
   ```bash
   bun run db:push
   # or
   pnpm run db:push
   ```

## Usage

### Development

Start the development server:
```bash
bun dev
# or
pnpm dev
# or
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:3000` and the MCP endpoint at `http://localhost:3000/mcp`.

### Building

Build for production:
```bash
bun run build
# or
pnpm run build
# or
yarn build
# or
npm run build
```

### Deployment

#### Vercel (Recommended)
```bash
bun run deploy
# or
pnpm run deploy
```

#### Cloudflare
```bash
bun run workers:build
bun run preview
# or
pnpm run workers:build
pnpm run preview
```

## MCP Integration

This template provides a complete MCP (Model Context Protocol) integration that allows AI assistants to interact with your application through standardized tools.

### MCP Endpoint

The MCP server is available at `/mcp` and supports both GET and POST requests. The endpoint is publicly accessible and doesn't require authentication.

### Example Tools

The template includes example MCP tools:

1. **greet** - A simple text-based greeting tool
2. **greet-ui** - An interactive UI greeting component

### Creating Custom Tools

Add new tools in the `src/tools/` directory. Each tool should export:
- `schema` - Zod schema for parameters
- `metadata` - Tool metadata including name, description, and annotations
- `default` - Tool implementation function

Example:
```typescript
import { z } from "zod";
import { type InferSchema, type ToolMetadata } from "xmcp";

export const schema = {
  message: z.string().describe("Message to display"),
};

export const metadata: ToolMetadata = {
  name: "display-message",
  description: "Display a custom message",
  annotations: {
    title: "Display Message",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function displayMessage({ message }: InferSchema<typeof schema>) {
  return {
    content: [{ type: "text", text: message }],
  };
}
```

## Configuration

### Environment Variables

Key environment variables (see `.env.example` for complete list):

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# AI Providers
OPENAI_API_KEY=sk-...
OPENROUTER_API_KEY=sk-or-v1-...
GEMINI_API_KEY=...

# Farcaster
FARCASTER_FID=123
FARCASTER_CUSTODY_ADDRESS=0x...
FARCASTER_CUSTODY_PRIVATE_KEY=...

# Database
DATABASE_URL=postgresql://...
```

### Next.js Configuration

The project includes configurations for:
- CORS headers for API access
- TypeScript strict mode (with build error ignoring for quick prototyping)
- ESLint configuration
- Asset prefixing for deployment flexibility

## Project Structure

```
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (mcp-ui)/          # MCP UI components
│   │   ├── mcp/               # MCP API endpoint
│   │   ├── mcp-auth/          # MCP authentication
│   │   └── hooks/             # Custom React hooks
│   ├── tools/                 # MCP tools
│   ├── lib/                   # Utility libraries
│   │   ├── db/               # Database utilities
│   │   └── apps-sdk-html/    # Farcaster mini-app SDK
│   └── config/               # Configuration files
├── public/                   # Static assets
├── scripts/                  # Build and utility scripts
└── middleware.ts             # Authentication middleware
```

## Authentication

The application uses Clerk for authentication with the following features:
- Protected routes (all except public MCP endpoints)
- Session management
- User profile integration

Public routes (no authentication required):
- `/` - Landing page
- `/mcp` - MCP API endpoint
- `/mcp-auth` - MCP authentication
- `/.well-known/*` - Protocol endpoints

## Deployment

### Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

### Cloudflare

1. Set up Cloudflare Pages with GitHub integration
2. Configure environment variables
3. Deploy using the build command

### Manual Deployment

For other platforms, use the standard Next.js deployment process:
```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** Clerk
- **Database:** PostgreSQL with Drizzle ORM
- **AI Integration:** AI SDK with multiple providers
- **MCP:** xmcp adapter
- **Deployment:** Vercel, Cloudflare

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:
1. Check the [Issues](../../issues) page
2. Review the documentation
3. Create a new issue with detailed information

## Related Projects

- [xmcp](https://github.com/your-org/xmcp) - MCP adapter for Next.js
- [Clerk](https://clerk.com) - Authentication platform
- [Farcaster](https://farcaster.xyz) - Decentralized social protocol
