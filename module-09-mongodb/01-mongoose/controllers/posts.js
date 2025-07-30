import Post from '../models/Post.js';

export const getPosts = async (req, res) => {
  const allPosts = await Post.find().populate(
    'authorID', //The name of the property/field that you want to be populated.
    'firstName -_id email' //The specific fields from the user document you want. Optional.
  );

  res.json(allPosts);
};

export const createPost = async (req, res) => {
  const newPost = await Post.create(req.sanitizedBody);

  res.json(newPost);
};

export const getPostById = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  // Alternative to findById using findOne
  // const post = await Post.findOne({ _id: id });

  res.json(post);
};

export const updatePost = async (req, res) => {
  const { id } = req.params;

  const updatedPost = await Post.findByIdAndUpdate(id, req.sanitizedBody, {
    new: true, //Return the updated document. By default it returns the original document. See README file for details.
    runValidators: true, //Validate document also on updating. See README file for details.
  });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  const deletedPost = await Post.findByIdAndDelete(id);

  res.json(deletedPost);
};
