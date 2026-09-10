# Changelog

All notable changes to **Hirenza** will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.1.0] - 2026-09-10

### Added
- **Dynamic Asynchronous Routing**: Migrated all dynamic routes (`[patternId]`, `[companyId]`, `[sheetId]`, `[tech]`) to Next.js 16 asynchronous params pattern with explicit `notFound()` boundaries.
- **GitHub Community Band**: Real-time repository metrics (stars, forks, MIT license) on landing page with resilient offline caching.
- **Privacy Engine Panel**: Direct client-side JSON data backup, import verification, and storage schema enforcement.
- **Unified Announcement Bar**: Rotating notification strip for community updates, challenge alerts, and changelog releases.
- **Data Integrity Test Suite**: Vitest regression testing ensuring global problem ID uniqueness, cross-module collision prevention, and sidebar parity.

### Fixed
- Resolved cross-module collision between Arsh Goyal sheet and Amazon company track by namespacing Arsh problem identifiers (`arsh-a1` through `arsh-a7`).
- Canonicalized all company problem progress keys to `comp-*` across dashboard, revision queues, and command palette.
- Migrated 20-Patterns client state onto global `ProgressContext` with backward-compatible localStorage migration.
- Restored CI pipeline execution order and aligned package lockfile dependencies.

---

## [2.0.0] - 2026-08-28

### Added
- **4-State Problem Lifecycle**: Replaced binary checkboxes with a comprehensive state machine: `todo` → `in-progress` → `solved` → `mastered`.
- **Spaced Repetition & Leitner Engine**: Automatic queue calculation for reviewing solved problems based on decay intervals.
- **Company Readiness Formula**: Weighted scoring algorithm assessing candidate preparation by company interview frequency.
- **Global ⌘K Command Palette**: Fast fuzzy search across 600+ problems, 124 patterns, and 39 practice tracks powered by Fuse.js.

### Changed
- Complete voice de-cloning and engineering redesign with bespoke technical aesthetic.
- Dynamic data-driven sidebar navigation replacing hardcoded links.

---

## [1.1.0] - 2026-08-01

### Added
- Striver A2Z DSA Sheet and NeetCode 150 structured curriculum tracks.
- SQL interview questions database with recursive CTEs and window function challenges.
- High-level and Low-level system design architectural blueprints.
- Offline-first notes engine for Core Subjects (OS, DBMS, Networks).

---

## [1.0.0] - 2026-07-15

### Initial Release
- Initial release of Hirenza: Open-source developer interview workspace.
- 100% client-side data persistence with zero account requirement.
- Dark mode first aesthetic with fluid CSS variables.
