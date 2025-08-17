# Lab Platform

A personal portfolio site built with **Next.js + TypeScript**, featuring a Lab publishing system powered by Supabase.
The site includes portfolio projects, a Lab blog, and admin-only content management.

🔗 Live Site: [hazle.netlify.app](https://staging--hazle.netlify.app/)

---

## 📦 Tech Stack

- **Frontend**: [Next.js 14+](https://nextjs.org/) (App Router), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + Auth + Storage)
- **Markdown/MDX**: [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) + Supabase Posts Table
- **Image Optimization**: Next.js `Image` component with support for unoptimized GIFs, blurDataURL

- **Deployment**: [Netlify](https://netlify.com/) CI + Preview builds

---

## 🚀 Features

- 📂 **Dynamic MDX content** with metadata  
- 🖼 **Post cover images** with blurred background preview  
- 🔒 **RLS policies**: only admin UID can write/update/delete  
- 🗂 **Tags & filtering**  
- 📅 Date formatting (`Intl.DateTimeFormat`)  
- 📱 Responsive grid layout  
- ⏳ **Skeleton loading states** for better UX  
- 🔍 Client-side search & tag filter  

---

## 📁 Project Structure

src/  
  app/  
    lab/                 # Lab page (list view)  
    lab/[slug]/          # Single post page  
    lab/loading.tsx      # Skeleton loader  
    api/posts/           # API routes for CRUD (admin protected)  
  components/  
    lab/                 # Lab-specific components (LabGrid, TagList, etc.)  
  lib/                   # Utilities (markdown, supabase helpers)  
  types/  
    lab.ts               # LabPost type definition  
public/  
  images/                # Static assets  

---

## ⚙️ Setup & Installation

### 1) Clone
```bash
git clone https://github.com/your-username/lab-platform.git
cd lab-platform
```

### 2) Install
```bash
pnpm install
# or
npm install
```

### 3) Env
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...    # server-only usage
NEXT_PUBLIC_ADMIN_UID=...        # your Supabase Auth UID (uuid)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4) Run
```bash
pnpm dev
# or
npm run dev
```

---

## 🔑 Supabase: Table & RLS (UID-based)

> Replace **`YOUR_ADMIN_UID`** with your actual Supabase Auth **User ID (uuid)**.  
> Console → Authentication → Users → copy your user’s **ID**.

```sql
-- 0) Table
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  tags text[] default '{}',
  cover text,
  content_mdx text not null,
  draft boolean default true,
  hidden_from_list boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_posts_created_at on public.posts (created_at desc);
create index if not exists idx_posts_draft on public.posts (draft);
create index if not exists idx_posts_hidden on public.posts (hidden_from_list);

-- Enable RLS
alter table public.posts enable row level security;

-- (cleanup if you experimented before)
drop policy if exists "read published posts" on public.posts;
drop policy if exists "admin read write by uid" on public.posts;

-- 1) Public read: only published (not draft, not hidden)
create policy "read published posts"
on public.posts
for select
using (
  coalesce(draft, true) = false
  and coalesce(hidden_from_list, false) = false
);

-- 2) Admin full access by UID (select/insert/update/delete)
create policy "admin read write by uid"
on public.posts
for all
using ( auth.uid() = 'YOUR_ADMIN_UID'::uuid )
with check ( auth.uid() = 'YOUR_ADMIN_UID'::uuid );
```

### (Optional) Storage bucket `lab-images` policies  
Make images publicly readable, but allow **writes/updates/deletes only by admin UID**.

```sql
-- Create bucket in Console first: lab-images (Public)

-- Cleanup old policies if exist
drop policy if exists "public read lab-images" on storage.objects;
drop policy if exists "admin write lab-images" on storage.objects;
drop policy if exists "admin update lab-images" on storage.objects;
drop policy if exists "admin delete lab-images" on storage.objects;

-- Public read (only this bucket)
create policy "public read lab-images"
on storage.objects
for select
using ( bucket_id = 'lab-images' );

-- Admin-only insert
create policy "admin write lab-images"
on storage.objects
for insert
with check (
  bucket_id = 'lab-images'
  and auth.uid() = 'YOUR_ADMIN_UID'::uuid
);

-- Admin-only update
create policy "admin update lab-images"
on storage.objects
for update
using (
  bucket_id = 'lab-images'
  and auth.uid() = 'YOUR_ADMIN_UID'::uuid
)
with check (
  bucket_id = 'lab-images'
  and auth.uid() = 'YOUR_ADMIN_UID'::uuid
);

-- Admin-only delete
create policy "admin delete lab-images"
on storage.objects
for delete
using (
  bucket_id = 'lab-images'
  and auth.uid() = 'YOUR_ADMIN_UID'::uuid
);
```

> ⚠️ If you use the **Service Role Key** from server routes, it bypasses RLS.  
> For write operations, prefer calling Supabase with the logged-in admin session (anon key) or enforce an explicit UID check in your server route before using the service key.

---

## 🖊 Writing a Post

Two ways:
1) **MDX file** in `content/lab` (manual path)  
2) **Admin dashboard** (`/lab/admin`) after auth → write, upload cover, publish

Frontmatter example (if using file-based MDX too):
```mdx
---
title: "My First Lab Post"
date: "2025-08-15"
tags: ["next.js", "supabase", "mdx"]
excerpt: "A quick overview of the lab setup"
cover: "/images/post-cover.jpg"
---
```

---

## 🛠 Deployment

- Deploy on **Netlify**  
- inked to a Git repository github.com/murmurket/hazle
- Build command npm run build
- Publish directory .next
- In Supabase **Auth → URL configuration**, allow your production domain

---

## 🧭 Pages Overview

| Path             | Description                                                              |
|------------------|---------------------------------------------------------------------------|
| `/`              | Landing page — brief introduction and latest featured content            |
| `/lab`           | Lab list view — experimental posts and CS learning logs                  |
| `/lab/[slug]`    | Individual lab post page rendered from MDX or Supabase                   |
| `/lab/admin`     | Admin-only dashboard for creating & managing posts (auth required)       |
| `/portfolio`     | Visual portfolio of projects, design/dev case studies                    |
| `/about`         | Personal background, skills, values, and current goals                   |
| `/contact`       | Contact form or external links (email, GitHub, LinkedIn)                 |

### 🔎 Notes
- `slug` refers to the unique identifier for each lab post, e.g. `/lab/cs50-w2`.
- `/lab/admin` requires Supabase login and only allows access to the admin UID.
- All pages are built with a responsive layout.
- Dark mode support is optionally extendable if needed.

---

## 🧪 Development Notes

- Shared `LabPost` type lives in `src/types/lab.ts` to avoid type drift  
- Client grid uses search, tag filter, pagination  
- Use `revalidatePath('/lab')` on post create/update to refresh the list  
- Keep image sizes reasonable; prefer WEBP/optimized PNG/JPEG
- Conditional class handling is done with [`clsx`](https://github.com/lukeed/clsx) for cleaner Tailwind integration.

---

## 📜 License

MIT © 2025 [Hazle]