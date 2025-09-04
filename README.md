# Hi Bumper Team!

First of all, thank you. This was a project I truly enjoyed building.

The project is live on Vercel. Due to a platform limitation that prevents file writing, you can browse the list, but adding a new entry is not supported. The link to see the project's overall design and functionality is: (https://partner-reg.vercel.app/)[https://partner-reg.vercel.app/]

The project has three main pages:

- `/`
- `/list`
- `/register`

In this project, I:

- **Stayed highly faithful to the provided design.** For unprovided details, I took the initiative to improvise and add minor features—like a button to the list page, an empty "search results" box, a loading box, and a success message after a form submission—to create a more complete and functional user flow.
- **Focused on solving current problems while creating components.** I avoided adding things just because they "might be useful later," but I still chose flexible methods for future development.
- **Avoided unnecessary abstractions to keep the code readable.** Although it was tempting to create a new component or function in a few places, I prioritized keeping the structure simple.
- **Used Tailwind's `@apply` directive.** I could have done it without it, but I wanted to evaluate the useful aspects of CSS.
- **Wrote unit tests** for the `Input` and `Checkbox` components.
- **Created an e2e test with Cypress** to validate the entire registration form flow, which is the core of the application.
- **Chose fetch and Next.js's caching mechanism** for data fetching to avoid increasing the bundle size.
- **Substituted the corporate sans-serif font with Inter.** It's compatible with Oswald and, aside from a few letters, looks very similar to the corporate font.
- **Used Phosphor Icons instead of the premium set from the Figma file.** A few icons look slightly different, but it's a bundle-size friendly solution thanks to tree-shaking.
- **Noted that triggering form validations on blur might not be the best approach for checkboxes,** but I kept it that way as it was requested.

---

### Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
