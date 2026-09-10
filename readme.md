## A production-oriented personal portfolio website, built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

### Environment Variables

All environment variables are loaded from the `.env` file in the project root.

| Variable                      | Description                  | Example                           |
| ----------------------------- | ---------------------------- | --------------------------------- |
| `NEXT_PUBLIC_GITHUB_USERNAME` | GitHub username for repos    | `johndeniel`                      |
| `NEXT_PUBLIC_GITHUB_TOKEN`    | GitHub personal access token | `ghp_xxxxx`                       |
| `NEXT_PUBLIC_API_BASEURL`     | Backend API base URL         | `https://profile-api.example.com` |

### Build and Run

```bash
npm install         # Install dependencies
npm run dev         # Start development server (http://localhost:3000)
npm run build       # Build for production
npm run start       # Start production server
```

### Tech Stack

`TypeScript 6.0` `Next.js 16.3` `React 19.2` `Tailwind CSS 4.3` `shadcn/ui` `Nextra 4.5`
