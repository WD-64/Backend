import { useState } from 'react';

const App = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = async (formData) => {
    const name = formData.get('name');
    const file = formData.get('profileImg');

    try {
      const res = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'multipart/formdata', //This is not needed
        // },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to upload');

      const data = await res.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        action={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <input type='text' placeholder='name' name='name' />
        <input type='file' name='profileImg' />
        <button>Submit</button>
      </form>
      {imageUrl && <img src={imageUrl} style={{ width: '250px' }} />}
    </div>
  );
};

export default App;
