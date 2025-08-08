## Explanation of vite.config.js file

- ### `import.meta.url`

  In ES Modules, `import.meta.url` is a special property that gives you the absolute URL of the current module file. It's a standardized feature for getting the location of the file you're currently in.

  **Example:** If your `vite.config.js` file is located at `/Users/student/my-project/vite.config.js`, `import.meta.url` will return the string:
  `'file:///Users/student/my-project/vite.config.js'`

- ### `fileURLToPath(url)`

  This is a helper function from Node.js's built-in `url` module. Its job is to **convert a `file://` URL string into a regular file system path** that your operating system understands. Node.js file system functions often need standard paths, not URLs.

  **Example:** It takes the output from `import.meta.url` and converts it.

  - **Input:** `'file:///Users/student/my-project/vite.config.js'`
  - **Output:** `'/Users/student/my-project/vite.config.js'`

- ### `dirname(path)`

  This function, from Node.js's `path` module, takes a file path and returns the **directory name of that path**. It essentially strips off the filename, leaving you with just the folder where the file is located. In our setup, this gives us the project's root directory.

  **Example:** It takes the output from `fileURLToPath` and gets its parent folder.

  - **Input:** `'/Users/student/my-project/vite.config.js'`
  - **Output:** `'/Users/student/my-project'`

- ### `resolve.alias`

  This is a Vite configuration option that lets you create **shortcuts or "aliases" for common paths** in your project. This makes your import statements cleaner and easier to manage, preventing messy relative paths like `../../components/Button`.

  **Example:** In the config, we set `'@'` as an alias for the `src` folder.

  ```javascript
  alias: {
    '@': resolve(__dirname, './src'),
  },
  ```

  - `__dirname` is our project root (`/Users/student/my-project`).
  - `resolve(__dirname, './src')` creates the full, absolute path: `/Users/student/my-project/src`.
  - Now, instead of writing `import Button from '../../components/Button'`, you can simply write `import Button from '@/components/Button'` from anywhere in your project. ✨
