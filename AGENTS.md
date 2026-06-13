# AGENTS.md

> This file is mirrored across CLAUDE.md, AGENTS.md, and GEMINI.md so the same instructions load in any AI environment.

# Project Philosophy

Build production-ready software as if it will be maintained by a team of senior engineers for years.

Prioritize:

* Scalability
* Maintainability
* Reliability
* Reusability
* Accessibility
* Performance
* Developer Experience

Avoid:

* Hardcoded content
* Duplicated code
* Tight coupling
* Magic values
* Unstructured files
* Temporary shortcuts that create technical debt

---

# Architecture Principles

## Component-Driven Development

Every UI section must be an isolated component.

Examples:

* HeroSection
* FeaturesSection
* TestimonialSection
* FAQSection
* PricingSection
* CTASection

Each component:

* Lives in its own file
* Has a clear responsibility
* Receives content through props
* Provides default values
* Is independently testable

Never hardcode content inside components.

Bad:

```tsx
<h1>Welcome to our platform</h1>
```

Good:

```tsx
<HeroSection {...heroContent} />
```

---

## Content-Driven Architecture

All content must be centralized.

Structure:

```txt
content/
├── home.ts
├── about.ts
├── services.ts
├── faq.ts
└── contact.ts
```

Example:

```ts
export const heroContent = {
  title: "...",
  subtitle: "...",
  ctaText: "...",
};
```

Pages consume content objects and pass them into sections.

This architecture must remain CMS-ready at all times.

Future integrations should be possible without modifying component code.

---

## Strict TypeScript

Always use strict TypeScript.

Requirements:

* No any
* No implicit any
* Explicit interfaces
* Explicit return types where useful
* Shared type definitions

Example:

```ts
export interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}
```

---

## Folder Structure

```txt
src/
├── app/
├── pages/
├── layouts/
├── sections/
├── components/
│   ├── ui/
│   ├── forms/
│   └── shared/
├── content/
├── hooks/
├── lib/
├── services/
├── constants/
├── types/
├── assets/
├── styles/
└── tests/
```

Maintain clear separation of concerns.

---

# Design System

## Design Tokens

Never use arbitrary values.

Create centralized tokens:

```txt
tokens/
├── colors.ts
├── spacing.ts
├── typography.ts
├── shadows.ts
├── radius.ts
├── breakpoints.ts
└── zIndex.ts
```

Use tokens everywhere.

Avoid:

```tsx
padding: 17px;
```

Prefer:

```tsx
padding: spacing.lg;
```

---

## Reusable UI Layer

Create reusable primitives before page-specific implementations.

Examples:

```txt
Button
Input
Textarea
Select
Card
Modal
Badge
Tooltip
Accordion
Tabs
```

Page sections should compose primitives.

Primitives should not depend on page sections.

---

# Responsive Design

All development must be mobile-first.

Required breakpoints:

```txt
Mobile
Tablet
Laptop
Desktop
Wide Desktop
```

No desktop-only implementations.

Every component must be responsive.

---

# Accessibility

All UI must satisfy WCAG standards.

Requirements:

* Semantic HTML
* Proper heading hierarchy
* Keyboard navigation
* Visible focus states
* Screen-reader support
* Alt text support
* ARIA attributes when necessary

Accessibility is not optional.

---

# Performance

Optimize by default.

Requirements:

* Lazy loading
* Code splitting
* Tree shaking
* Dynamic imports where appropriate
* Image optimization
* Font optimization
* Minimized bundle size

Avoid unnecessary rerenders.

Use memoization only when justified.

---

# SEO

All pages must support:

```txt
Title
Description
Keywords
Canonical URL
Open Graph
Twitter Cards
Structured Data
```

SEO should be built into the architecture.

---

# Error Handling

Every feature must include:

* Loading states
* Empty states
* Error states
* Retry states

Never assume success.

---

# Documentation

Every major component should include:

* Purpose
* Props
* Example usage

Document architectural decisions when appropriate.

Code should be understandable without external explanation.

---

# Naming Conventions

Components:

```txt
PascalCase
```

Examples:

```txt
HeroSection.tsx
FeatureCard.tsx
ContactForm.tsx
```

Variables:

```txt
camelCase
```

Routes:

```txt
kebab-case
```

Examples:

```txt
/contact-us
/case-studies
/pricing
```

---

# AI Agent Operating Model

The system follows a 3-layer architecture.

## Layer 1: Directives

Located in:

```txt
directives/
```

Contain SOPs describing:

* Goals
* Inputs
* Outputs
* Constraints
* Edge cases

Treat directives as source-of-truth instructions.

---

## Layer 2: Orchestration

This is the AI agent.

Responsibilities:

* Read directives
* Make decisions
* Route tasks
* Call tools
* Handle failures
* Request clarification
* Improve workflows

The agent coordinates work.

The agent should not replace deterministic systems.

---

## Layer 3: Execution

Located in:

```txt
execution/
```

Contains deterministic scripts.

Responsibilities:

* APIs
* Data processing
* Scraping
* Transformations
* Database operations
* File operations

Prefer execution scripts over manual agent work whenever possible.

---

# Execution Rules

## Check Existing Tools First

Before creating:

* Scripts
* Utilities
* Services

Search existing implementations.

Reuse before creating.

Avoid duplicate functionality.

---

## Self-Annealing Workflow

When failures occur:

1. Read the error
2. Diagnose the root cause
3. Fix the implementation
4. Test the solution
5. Update documentation
6. Update directives if needed

The system should improve after every failure.

---

## Directive Improvement

When discovering:

* API limitations
* Better approaches
* Performance improvements
* Common failures

Suggest directive updates.

Do not overwrite directives without approval.

---

# File Organization

## Deliverables

Deliverables should live in cloud-accessible systems whenever possible.

Examples:

* Google Sheets
* Google Slides
* CMS Entries
* Databases

---

## Intermediates

Temporary files belong in:

```txt
.tmp/
```

Examples:

* Exports
* Scraped data
* Temporary transforms
* Generated artifacts

Everything inside `.tmp/` should be safely regeneratable.

---

# Environment

Secrets must never be hardcoded.

Store sensitive information in:

```txt
.env
```

Examples:

* API Keys
* Access Tokens
* Service Credentials

Never commit secrets.

---

# Quality Standard

Before completing any task, verify:

* Architecture consistency
* Type safety
* Accessibility
* Responsiveness
* Performance
* Reusability
* Error handling
* Documentation

Build solutions that a senior engineering team would approve for production deployment.

---

# Golden Rule

Assume that:

* A CMS will be connected later
* Multiple developers will maintain the project
* Content will change frequently
* Features will expand over time

Therefore:

* No hardcoded content
* No duplicated logic
* No fragile implementations
* No shortcuts

Design for scale from the beginning.
