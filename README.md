# nksquare.in portfolio

Game-UI portfolio of Narenkarthik Kesavamoorthy. Built with [Astro](https://astro.build) (static output),
served by nginx in a small Docker container.

## 1. Run it locally (development)

Needs Node.js 22.12 or newer (Node 24 LTS recommended).

```bash
npm install
npm run dev
```

Open http://localhost:4321. Every time you save a file the page reloads.

## 2. Test the production container locally

Needs Docker Desktop.

```bash
docker compose up --build
```

Open http://localhost:8080. This is exactly what will run on the server. Stop it with `Ctrl+C`.

## Where to change things

| What | File |
|---|---|
| Name, email, links, hobby, motto | `src/data/site.ts` |
| Capstone quest and its checklist | `src/data/site.ts` (`quest`) |
| Travel notes for the map | `src/data/site.ts` (`travel`) |
| Achievements | `src/data/achievements.ts` |
| Projects (one file each) | `src/content/projects/*.md` |
| Internships | `src/content/logs/*.md` |
| Resume download | replace `public/resume/Narenkarthik_Kesavamoorthy_Resume.pdf` |
| Profile photo | `src/components/ProfilePanel.astro` (placeholder marked in a comment) |
| Colours and fonts | `src/styles/global.css` |

**Adding a project:** copy one of the files in `src/content/projects/`, change the text, and put its
images in `src/assets/projects/`. Images are converted to WebP automatically. Videos go in `public/media/`.

**Adding a video:** compress it first so it stays small:

```bash
ffmpeg -i input.mp4 -t 60 -vf "scale=-2:720,fps=30" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart public/media/clip.mp4
```

## Credits

Design based on the free "Web Portfolio Design" game-UI template by Alex Dimitrov (Figma Community).
Fonts: Big Shoulders Display, Iceland and Iceberg (SIL Open Font License, licences in `public/fonts/`).
Map: Natural Earth (public domain).
