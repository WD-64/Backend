import { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { deletePost, getPosts } from '@/data';

const DeleteModal = ({ _id, setPosts }) => {
    const [value, setValue] = useState('');
    // const [isValid, setIsValid] = useState(false);

    const isValid = useMemo(() => {
        if (value === '') return true;
        return value.toUpperCase() === 'DELETE' ? true : false;
    }, [value]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await deletePost(_id);

            const posts = await getPosts();
            setPosts(posts);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setValue('');
            document.getElementById('edit-modal').close();
        }
    };
    return (
        <dialog id='delete-modal' className='modal'>
            <div className='modal-box'>
                <form method='dialog'>
                    {/* if there is a button in form, it will close the modal */}
                    <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
                        ✕
                    </button>
                </form>
                <h3 className='font-bold text-lg'>
                    Are you sure you want to delete? This action is permanent
                </h3>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col items-center mt-2'
                >
                    <label className='form-control w-full max-w-xs'>
                        <input
                            type='text'
                            placeholder='Type here'
                            className={`input input-bordered w-full max-w-xs ${
                                isValid ? '' : 'input-error'
                            }`}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <div className='label'>
                            <span className='label-text-alt'>
                                Type delete to confirm
                            </span>
                        </div>
                    </label>
                    <button
                        disabled={!isValid || value === ''}
                        className='btn btn-error self-end'
                    >
                        Delete
                    </button>
                </form>
            </div>
        </dialog>
    );
};

export default DeleteModal;
