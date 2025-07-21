import BlogPost from '../models/BlogPost';

//This function focuses only on getting all posts and sending them as response
const getAllPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll(); //Gets all rows from the blogposts table in database
    res.json(blogPosts); //We send all of them to client as response
  } catch (error) {
    res.status(500).json({ message: `Couldn't fetch posts` }); //If something went wrong, we send a error message
  }
};

//This function focuses only on getting ONE post and sending that as response
const getSinglePost = async (req, res) => {
  try {
    const id = +req.params.id; //Convert the id from string to number. Eg: '2' => 2
    const post = await BlogPost.findByPk(id); //Find a blogpost matching a certain id

    if (!post) res.status(404).json({ message: 'Post not found!' }); //If not found, we send the right response
    res.json(post); //If found, we send the matching post as response
  } catch (error) {
    res.status(500).json({ message: `Couldn't fetch post!` }); //If something went wrong, we send a error message
  }
};

//This function focuses only on creating a new post
const createPost = async (req, res) => {
  //Validate body if necessary

  try {
    await BlogPost.create(req.body); //First create the row in the DB
    res.json({ message: 'Successfully created post' }); //Then send a response to client saying it was successful
  } catch (error) {
    res.status(500).json({ message: `Couldn't create!` }); //If something went wrong, we send a error message
  }
};

export { getAllPosts, getSinglePost, createPost };
