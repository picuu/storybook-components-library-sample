# Storybook components library sample

This is a sample project to demonstrate how to create a components library using Storybook, Vite, React and TypeScript.

## Part one: Create project and publish it

### Step 1: Create a Vite app

Create a new Vite project and select React and TypeScript + SWC.

```bash
yarn create vite
```

### Step 2: Configure the project

You will probably need to install `@types/node` as dev dependency.

Setup the project for [library mode](https://vite.dev/guide/build.html#library-mode).

### Step 3: Create your first component

Create a new folder `/lib` in the root of your project and there create your components. The important thing is that you have to export all your components in the `/lib/main.ts` file.

This folder name and file name are just a convention, you can name them as you want. If you rename them, you will need to update the `vite.config` file.

### Step 4: Configure TypeScript and Vite aliases (optional)

Install `vite-tsconfig-pahts` and import it as a plugin in your `vite.config` file.

For now on, all alias you create in your `tsconfig.json` file will be available in your Vite project. The `vite-tsconfig-paths` plugin will take care of that. Otherwise, you would need to create the same aliases in your `vite.config` file, manually.

All files in `/src` could be deleted.

### Step 5: Configure the `package.json` file

Add the `files`, `main`, `module` and `export` fields to the `package.json` file and also add the `prebuild` and `prepublish` scripts.

### Step 6: Publish the package

Before publishing the package, you can test it locally by running the `yarn build` command and then the `yarn link` command.

If your projects compiles correctly with `yarn build`, you can publish it to npm. Just run the `yarn publish` command.
