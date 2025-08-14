import { Link } from 'react-router';
import { useAuth } from '@/context';
import { EditModal, DeleteModal } from '..';
const PostCard = ({ _id, content, image, title, author, setPosts }) => {
  const { user } = useAuth();
  return (
    <div className='card bg-base-100 shadow-xl'>
      <figure className='bg-white h-48'>
        <img src={image} alt={title} className='object-cover h-full w-full' />
      </figure>
      <div className='card-body h-56'>
        <h2 className='card-title'>{title}</h2>
        <p className='truncate text-wrap'>{content}</p>
        <button>
          <Link to={`/post/${_id}`} className='btn btn-primary mt-4'>
            Read More
          </Link>
        </button>
        {user?._id === author && (
          <div className='card-actions justify-center gap-6'>
            <button onClick={() => document.getElementById('edit-modal').showModal()} className='btn btn-success'>
              Edit
            </button>
            <EditModal
              _id={_id}
              image={image}
              title={title}
              content={content}
              author={author._id}
              setPosts={setPosts}
            />
            <button onClick={() => document.getElementById('delete-modal').showModal()} className='btn btn-error'>
              Delete
            </button>
            <DeleteModal _id={_id} setPosts={setPosts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
