# Antigravity Site - Project Context

## Quick Facts
- **Type:** Next.js blog + course platform with email automation
- **Size:** 153 code files, 578 nodes, 1097 edges, 39 communities
- **Stack:** Next.js + TypeScript, Supabase, Resend, PayPal
- **Location:** C:\Users\Ronen\Documents\Projects\Personal\Antigravity\blog andwebsite\site

## God Nodes (Critical Dependencies)
1. \createAdminClient()\ (66 edges) — **BOTTLENECK** — touches everything
2. \GlassCard()\ (30 edges) — core UI component
3. \Button()\ (27 edges) — ubiquitous
4. \createClient()\ (22 edges) — client auth
5. \SectionHeading()\ (18 edges) — layout
6. \getResend()\ (18 edges) — email service
7. \getAllPosts()\ (10 edges) — blog content

## Core Subsystems

### Frontend Pages
- Blog, FAQ, About, Contact, Courses, Pricing, Training, Services, AI Mastery
- Layout: Header, Footer, auth pages (login)
- UI: GlassCard, Button, Badge, SectionHeading

### Backend (API Routes)
- Blog admin: create/edit articles
- Email: drip campaigns (day 3/7/14), transactional emails
- Admin: contact management, newsletter scheduling, GSC sync
- Payments: PayPal subscription handling

### Data Layer
- **Supabase:** Database + auth (admin + user clients)
- **Resend:** Email delivery
- **PayPal:** Payments
- **Google Search Console:** Analytics
- File-based blog (markdown posts)

## Key Patterns & Issues

### Supabase Bottleneck
\createAdminClient()\ is called from 66 different places. This is a major coupling point — refactoring could improve maintainability.

### Email Workflow
Drip campaigns are central: welcome → day 3 → day 7 → day 14. Used for onboarding.

### UI Component Reuse
GlassCard, Button, Badge are everywhere. Good sign of design system, but watch for over-specialization.

## Work Guidelines

1. **Before any task:** check this file for context
2. **Focus:** Only work on this project unless explicitly redirected
3. **Refactoring opportunities:**
   - \createAdminClient()\ centralization / dependency injection
   - Email template consolidation (drip campaign variants)
   - Component prop consistency across GlassCard/Button/Badge
4. **Test coverage:** Light on isolated unit tests; focus on integration tests
5. **No breaking changes** to the Supabase client pattern without refactoring all 66 call sites

## Knowledge Graph
Full analysis saved in \graphify-out-antigravity/\:
- \graph.html\ — interactive visualization
- \GRAPH_REPORT.md\ — detailed community breakdown
- \graph.json\ — raw data

Last updated: 2026-06-06
