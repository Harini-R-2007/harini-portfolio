# Harini R – Portfolio

React + TypeScript + Vite + Tailwind CSS.

## Run locally
```
npm install
npm run dev      # http://localhost:5173
```
## Edit content
All text, links, skills, projects, certifications and experience are in `src/data/content.ts`.
- **Photo:** replace `public/images/profile.jpg` (keep a 4:5 portrait crop).
- **Resume:** replace `public/resume/Harini_R_Resume.pdf` (keep the same file name).
- **Add a project:** add an object to the `projects` list (fields: name, desc, tech, optional live link).
## Deploy
`npm run build` creates `dist/`. Deploy on Vercel or Netlify (build command `npm run build`, output `dist`), or upload `dist/` to any static host.
