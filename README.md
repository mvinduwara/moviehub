# 🎬 MovieHub

MovieHub is a modern, full-stack web application for discovering, tracking, and streaming movies, TV shows, and anime. Built with **Next.js (App Router)** and **TypeScript**, it offers a seamless and responsive user interface, robust authentication via **Supabase**, and built-in streaming capabilities with subtitle support.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

## ✨ Key Features

* **Extensive Library:** Browse movies, TV shows, and anime with dedicated category pages.
* **Smart Search & Filtering:** Dynamic search bar and genre dropdowns to easily find what you want to watch.
* **Integrated Video Player:** Custom-built video player (`MoviePlayer` & `TVPlayer`) supporting multiple stream sources (`stream-sources.ts`).
* **Subtitles Support:** Built-in subtitle panel for an accessible viewing experience.
* **Progress Tracking:** "Continue Watching" row automatically tracks playback progress using a custom store (`continueWatchingStore.ts`).
* **Personalized Watchlist:** Users can add items to their personal watchlist, saved and synced via a dedicated store (`watchlistStore.ts`).
* **User Authentication:** Secure login and user management powered by Supabase.
* **Responsive Design:** Fully responsive UI tailored for mobile, tablet, and desktop viewing.

## 🛠️ Technology Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (via PostCSS)
* **State Management:** Custom stores (likely Zustand or Context API based on the `store/` directory structure)
* **Backend / Database:** Supabase (Authentication & Database)
* **API Integration:** Custom Next.js Route Handlers (`app/api/movies`, `app/api/search`, `app/api/subtitles`)

## 📂 Project Structure

```text
moviehub/
├── app/                  # Next.js App Router (Pages, Layouts, API Routes)
│   ├── api/              # Backend API handlers (movies, search, subtitles)
│   ├── movie/            # Dynamic movie detail pages
│   ├── tv/               # Dynamic TV show & episode pages
│   ├── anime/            # Dedicated anime browsing
│   ├── genre/            # Genre-specific filtering
│   ├── watchlist/        # User's saved items
│   └── login/            # Authentication pages
├── components/           # Reusable React components
│   ├── common/           # Navbar, SearchBar, GenreDropdown, WatchlistButton
│   ├── home/             # Homepage specific sections (ContinueWatchingRow)
│   ├── movie/            # MovieCard, MoviePlayer, TVPlayer
│   └── player/           # ProgressTracker, SubtitlePanel
├── hooks/                # Custom React hooks (useStore)
├── lib/                  # Utility functions (Supabase client, Stream sources)
├── store/                # Global state management (Watchlist, Continue Watching)
└── types/                # TypeScript type definitions (movie.ts, tv.ts)
