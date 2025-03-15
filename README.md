# Storybook components library sample

This is a sample project to demonstrate how to create a components library using Storybook, Vite, React and TypeScript.

## Part one: Create project and publish it

See the complete process in Antonin Januska's video [How To Build a React UI Library ep1: Setting up the build system and NPM publishing](https://youtu.be/btVwaMWuhtc).

### Step 1: Create a Vite app

Create a new Vite project and select React and TypeScript + SWC.

```bash
yarn create vite
```

### Step 2: Configure the project

You will probably need to install `@types/node` as dev dependency (mostly if you are using TypeScript).

Setup the [Vite project for library mode](https://vite.dev/guide/build.html#library-mode).

```ts
export default defineConfig({
  plugins: [react()],
  build: {
    // library entry and output settings
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'Package Name',
      fileName: 'package-name'
    },

    // bundler options
    // externalize react-related imports
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        }
      }
    }
  }
})
```

### Step 3: Create your first component

Create a new folder `/lib` in the root of your project and there create your components. The important thing is that you have to export all your components in the `/lib/main.ts` file.

This folder name and file name are just a convention (following the Vite documentation), you can name them as you want. If you rename them, you will need to update the `vite.config` file.

### Step 4: Configure TypeScript and Vite aliases

Add the folder `/lib` to the `include` field in the `tsconfig.json` file.
This is necessary for the TypeScript compiler to find the files in the `/lib` folder.

All files in `/src` could be deleted. Make sure to remove the it from the `include` field in the `tsconfig.json` file if you do so (for a reason I don't know, my `yarn build` won't generate the types correctly until I done that).

```diff
{
-  "include": ["src"]
+  "include": ["lib"]
}
```

**This (the configuration for aliases) is optional.**

  Install [vite-tsconfig-pahts](https://www.npmjs.com/package/vite-tsconfig-paths) and import it as a plugin in your `vite.config` file.

  For now on, all alias you create in your `tsconfig.json` file will be available in your Vite project. The `vite-tsconfig-paths` plugin will take care of that. Otherwise, you would need to create the same aliases in your `vite.config` file, manually.

### Step 5: Configure the `package.json` file

Add the `files`, `main`, `module` and `export` fields to the `package.json` file and also add the `prebuild` and `prepublish` scripts.

```json
{
  "files": [
    "dist"
  ],
  "main": "./dist/package-name.umd.cjs",
  "module": "./dist/package-name.js",
  "exports": {
    ".": {
      "import": "./dist/package-name.js",
      "require": "./dist/package-name.umd.cjs"
    }
  },
  "scripts": {
    "dev": "vite",
    "prebuild": "rm -rf dist",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "prepublish": "yarn build"
  }
}
```

### Step 6: Publish the package

Before publishing the package, you can test it locally by running the `yarn build` command and then the [yarn link command](https://classic.yarnpkg.com/lang/en/docs/cli/link/#toc-yarn-link-package). See the link for more information on how to use `yarn link`.

If your projects compiles correctly with `yarn build`, you can publish it to npm. Just run the `yarn publish` command. You should have created an account on [NPM](https://www.npmjs.com/) by now.

## Part two: Export types

See the complete process in Antonin Januska's video [How To Build a React UI Library ep3: Exporting Styles and Types](https://youtu.be/T3NR6dpMZZY). The types part starts at 7:56 aprox.

### Step 1: Install dts plugin

Install the [vite-plugin-dts](https://www.npmjs.com/package/vite-plugin-dts) plugin as dev dependency.

Add the plugin to the `vite.config` file with the option `{ rollupTypes: true }` as this will export all files in one declaration file.

If your `tsconfig.json` file is named differently, you will need to add this option as well to the `dts` plugin `tsconfigPath: './tsconfig.app.json'`.

> [!NOTE]
> Vite changed the way to configure TypeScript in its projects so the `tsconfig.json` file is now named `tsconfig.app.json`, so you will need to add the `tsconfigPath` option to the `dts` plugin if you created the project with Vite.

```ts
plugins: [
  react(),
  tsconfigPaths(),
  dts({
    rollupTypes: true,
    tsconfigPath: "./tsconfig.app.json",
  })
],
```

### Step 2: Build types

Run the `yarn build` command to generate the types.

### Step 3: Publish the package

Run the `yarn publish` command to publish the package with the types.

## Part three: Add Storybook

See the complete process in Antonin Januska's video [How To Build a React UI Library ep2: Setting up Storybook and TailwindCSS support](https://youtu.be/5zCXD7QscGQ). The Storybook part starts at 6:30 aprox.

### Step 1: Install Storybook

Install [Storybook for Vite](https://storybook.js.org/blog/storybook-for-vite/) with the following command:

```bash
npx sb init --builder @storybook/builder-vite
```

This will create a `stories` folder with sample code and a `.storybook` folder with the Storybook configuration.
Also, Storybook created some scripts in the `package.json` for us to run it easily.

I recommend disabling the Storybook telemetry by adding `core: { disableTelemetry: true }` in the StorybookConfig file (`./.storybook/main.ts`).

Inside the `stories` folder you can add components, stories (which are the Storybook "tests") and even MDX files to document your components.

### Step 2: Config Storybook

To make Storybook work with our project, let's modify the `.storybook/main.ts` file so we replace the paths to the `stories` folder with the `lib` folder.
With this change, Storybook will look for components and stories in the `lib` folder.

```diff
{
  "stories": [
-   "../stories/**/*.mdx",
-   "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
+   "../lib/**/*.mdx",
+   "../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ]
}
```

### Step 3: Create your first stories

You can read more about how to write stories in the [Storybook documentation](https://storybook.js.org/docs/get-started/setup).

#### How to organize your stories

Go into your `lib` folder and create a new file with the name of your component and the `.stories.tsx` extension.

I recommend organizing your stories in the same way you organize your components. For example, if you have a `Button` component, you can create a `Button` folder and inside it, create the `Button.stories.tsx` file. Something like that:

```bash
📁 storybook-components-library-sample
└─ 📁 lib
   ├─ 📁 components
   │  ├─ 📁 Button
   │  │  ├─ 📄 Button.stories.tsx
   │  │  ├─ 📄 Button.tsx
   │  │  └─ 📄 index.ts
   │  │
   │  └─ 📄 index.ts
   │
   └─ 📄 main.ts
```

#### First stories

Here is an example of a `.stories.tsx` file:

```tsx
import type { Meta, StoryObj } from '@storybook/react'

import YourComponent from './YourComponent'

const meta: Meta<typeof YourComponent> = {
  component: YourComponent
}

export default meta

type Story = StoryObj<typeof YourComponent>

export const Default: Story = {
  args: {
    children: 'Click me!'
  }
}

export const Emoji: Story = {
  args: {
    children: '🤠'
  }
}
```

With just that you can create different stories for your component. Each story is like a test case for your component.

Storybook will render your component with the props you pass in the `args` object.

Additionaly, with the Storybook GUI you can change the args of the stories and modify or create new ones. Super easy!
