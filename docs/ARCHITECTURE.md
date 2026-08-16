# Antigravity Site — Architecture Reference

Background/reference material split out of `CLAUDE.md` to keep the root file
lean. Not auto-loaded every session — read this when a task actually touches
the areas below (e.g. refactoring `createAdminClient()` callers, touching
email templates, or working across GlassCard/Button/Badge).

## God Nodes (Critical Dependencies)

1. `createAdminClient()` (66 edges) — **BOTTLENECK** — touches everything
2. `GlassCard()` (30 edges) — core UI component
3. `Button()` (27 edges) — ubiquitous
4. `createClient()` (22 edges) — client auth
5. `SectionHeading()` (18 edges) — layout
6. `getResend()` (18 edges) — email service
7. `getAllPosts()` (10 edges) — blog content

## Core Subsystems

### Frontend Pages

* Blog, FAQ, About, Contact, Courses, Pricing, Training, Services, AI Mastery
* Layout: Header, Footer, auth pages (login)
* UI: GlassCard, Button, Badge, SectionHeading

### Backend (API Routes)

* Blog admin: create/edit articles
* Email: drip campaigns (day 3/7/14), transactional emails
* Admin: contact management, newsletter scheduling, GSC sync
* Payments: PayPal subscription handling

### Data Layer

* **Supabase:** Database + auth (admin + user clients)
* **Resend:** Email delivery
* **PayPal:** Payments
* **Google Search Console:** Analytics
* File-based blog (markdown posts)

## Key Patterns & Issues

### Supabase Bottleneck

`createAdminClient()` is called from 66 different places. This is a major
coupling point — refactoring could improve maintainability.

### Email Workflow

Drip campaigns are central: welcome → day 3 → day 7 → day 14. Used for
onboarding.

### UI Component Reuse

GlassCard, Button, Badge are everywhere. Good sign of design system, but
watch for over-specialization.

## Refactoring opportunities

* `createAdminClient()` centralization / dependency injection
* Email template consolidation (drip campaign variants)
* Component prop consistency across GlassCard/Button/Badge

## Knowledge Graph

Full analysis saved in `graphify-out-antigravity/`:

* `graph.html` — interactive visualization
* `GRAPH_REPORT.md` — detailed community breakdown
* `graph.json` — raw data

Last updated: 2026-06-06
