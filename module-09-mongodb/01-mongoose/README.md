### Additional Notes

#### `runValidators: true`

You can see these options used in the [`updatePost`](./controllers/posts.js) and [`updateUser`](./controllers/users.js) functions within the project.

Here’s what runValidators: true means

It is an option you can pass to certain Mongoose methods (like `update`, `updateOne`, `updateMany`, or `findOneAndUpdate`).
It tells Mongoose to run schema validation on the data being updated, not just when creating new documents.

Why is this important?

- By default, Mongoose only validates data when you create a new document (with `.save()` or `.create()`). When you update a document, validation is not run unless you explicitly set `runValidators: true.`

---

#### `new: true`

The option `new: true` is commonly used in update operations. It is often used in methods like `findOneAndUpdate` or `findByIdAndUpdate`

What does new: true do?

- By default, these update methods return the original document (the one before the update).
- With new: true, the method returns the updated document (after the changes).
- Why use it?
  If you want to immediately see the changes you just made, set new: true.
  If you omit it, you’ll get the old version, which can be confusing.
