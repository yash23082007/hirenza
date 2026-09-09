# Contributing to HIRENZA

First off, thanks for taking the time to contribute! 🎉

HIRENZA is an open-source project and we welcome contributions from the community. Whether you're fixing a bug, adding a feature, or improving documentation, your help is appreciated.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Style Guides](#style-guides)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

---

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

**Our Pledge:**
- Be respectful and inclusive
- Give and gracefully accept constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues. When you create a bug report, include:

- **Clear title** — Summarize the problem
- **Steps to reproduce** — Be specific
- **Expected behavior** — What should happen
- **Actual behavior** — What actually happens
- **Environment** — OS, browser, Node version
- **Screenshots** — If applicable

**Example:**
```markdown
**Title:** DSA Sheets page crashes on mobile Safari

**Steps to Reproduce:**
1. Open https://hirenza.com/preparation/dsa-sheets on iPhone Safari
2. Click on "Striver's A2Z" sheet
3. Scroll down

**Expected:** Page scrolls smoothly
**Actual:** Page freezes and becomes unresponsive

**Environment:**
- iOS 17.2
- Safari 17.2
- iPhone 14 Pro

**Screenshots:** [attached]
```

### 💡 Suggesting Features

Feature suggestions are welcome! When suggesting a feature:

- **Explain the problem** — What pain point does this solve?
- **Describe the solution** — How should it work?
- **Alternatives considered** — What other approaches did you think about?
- **Use cases** — Who would benefit from this?

### 📝 Improving Documentation

Documentation contributions are highly valued:

- Fix typos or unclear explanations
- Add examples to existing docs
- Create new guides or tutorials
- Translate documentation
- Improve code comments

### 🔧 Submitting Code Changes

**Small changes:**
- Fix typos
- Improve error messages
- Add missing tests
- Refactor small sections

**Medium changes:**
- Add new features
- Fix bugs
- Improve performance

**Large changes:**
- Open an issue first to discuss
- Create a detailed proposal
- Break into smaller PRs if possible

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/hirenza.git
   cd hirenza
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## Development Workflow

### Branch Naming

```
feature/add-new-dsa-sheet
fix/sidebar-scroll-issue
docs/update-readme
refactor/data-modules
```

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add NeetCode 150 sheet
fix: correct LeetCode URL for Two Sum
docs: update README with new features
style: format code with Prettier
refactor: simplify QuestionList component
test: add tests for data modules
chore: update dependencies
```

### Code Style

**TypeScript:**
```typescript
// ✅ Good
interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  leetcodeUrl?: string;
}

const solveProblem = (problem: Problem): void => {
  console.log(`Solving: ${problem.title}`);
};

// ❌ Bad
const solve = (p: any) => {
  console.log(p.title);
};
```

**React Components:**
```typescript
// ✅ Good
interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, children, className = "" }: CardProps) {
  return (
    <div className={`card ${className}`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// ❌ Bad
export default function Card(props) {
  return <div>{props.title}</div>;
}
```

**Tailwind CSS:**
```typescript
// ✅ Good
<div className="flex items-center gap-4 p-6 rounded-lg bg-surface hover:bg-surface-hover transition-colors">

// ❌ Bad
<div className="flex items-center gap-4 p-6 rounded-lg bg-white hover:bg-gray-100 transition-colors">
// Don't hardcode colors, use design tokens
```

### Testing

Before submitting a PR:

```bash
# Run linting
npm run lint

# Type check
npm run type-check

# Build
npm run build

# Test (when implemented)
npm test
```

---

## Style Guides

### TypeScript

- Use `interface` for object shapes
- Use `type` for unions, intersections, utilities
- Avoid `any` — use `unknown` or specific types
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Export types from data modules

### React

- Use functional components with hooks
- Use TypeScript for all props
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use `className` for conditional styling

### Styling

- Use Tailwind utility classes
- Use design tokens (colors from CSS variables)
- Keep class strings readable (break into multiple lines if long)
- Use `cn()` utility for conditional classes (when implemented)

### Data Modules

- Export typed data arrays
- Include all required fields
- Verify URLs are correct
- Add JSDoc comments for complex structures

```typescript
/**
 * DSA Sheet data
 * Source: Striver's A2Z DSA Course
 * @see https://takeuforward.org/strivers-a2z-dsa-course-sheet-2/
 */
export const striverSheet: DSASheet = {
  id: "striver-a2z",
  name: "Striver's A2Z DSA Sheet",
  source: "takeuforward.org",
  problems: [...]
};
```

---

## Pull Request Process

### Before Submitting

1. **Sync with upstream**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/hirenza.git
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run checks**
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

3. **Write tests** (if applicable)
   - Unit tests for new functions
   - Integration tests for new pages
   - Update existing tests if needed

4. **Update documentation**
   - README.md if adding features
   - Inline code comments for complex logic
   - JSDoc for public APIs

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Testing
- [ ] Ran `npm run lint`
- [ ] Ran `npm run type-check`
- [ ] Ran `npm run build`
- [ ] Added/updated tests

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex logic
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tested locally
```

### Review Process

1. **Automated checks** — CI runs lint, type-check, build
2. **Code review** — At least 1 maintainer approves
3. **Discussion** — Address feedback
4. **Merge** — Squash and merge into main

---

## Community

### Communication Channels

- **GitHub Issues** — Bug reports, feature requests
- **GitHub Discussions** — Questions, ideas, showcase
- **Discord** (coming soon) — Real-time chat
- **Twitter** — [@hirenza](https://twitter.com/hirenza)

### Getting Help

- Check existing documentation
- Search GitHub Issues/Discussions
- Ask in Discussions (not Issues)
- Be patient and respectful

### Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- Social media shoutouts

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## Thank You! 🎉

Your contributions make HIRENZA better for everyone. We appreciate your time and effort!

---

<div align="center">

**Happy Coding! 💜**

[Back to README](./README.md)

</div>
