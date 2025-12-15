# AliceUI

React Aria Components + Tailwindcss + Tailwind Variants = Alice UI

> ⚠️ **This library is no longer maintained** - Please use [Vela UI](https://github.com/vela-ui/vela-ui) instead.

## Installation

Requirements:

- [React 18](https://reactjs.org/) or later
- [Tailwind CSS 3](https://tailwindcss.com/) or later

---

To use AliceUI in your project, you need to follow the following steps:

### Install Packages

Run the following command:

```sh
pnpm add @alice-ui/react
```

### Tailwind CSS Setup

AliceUI is built on top of Tailwind CSS, so you need to install Tailwind CSS first. You can follow the officia [installation guide](https://tailwindcss.com/docs/installation) to install Tailwind CSS. Then you need to add the following code to your `tailwind.config.js` file:

```js
// tailwind.config.js
const { aliceui } = require('@alice-ui/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    './node_modules/@alice-ui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'selector',
  plugins: [aliceui()],
};
```

### Provider Setup

It is essential to add the `AliceUIProvider` at the `root` of your application.

```jsx
import React from 'react';

// 1. import `AliceUIProvider` component
import { AliceUIProvider } from '@alice-ui/react';

function App() {
  // 2. Wrap AliceUIProvider at the root of your app
  return (
    <AliceUIProvider>
      <YourApplication />
    </AliceUIProvider>
  );
}
```

### Setup pnpm (optional)

If you are using pnpm, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@alice-ui/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## Useful Links

- [NextUI](https://nextui.org)
- [TailwindCSS](https://tailwindcss.com)
- [Tailwind Variants](https://www.tailwind-variants.org)
- [React Aria Components](https://react-spectrum.adobe.com/react-aria/index.html)

This project is tested with BrowserStack
