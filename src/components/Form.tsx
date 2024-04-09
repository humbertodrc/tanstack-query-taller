import { useMutation, useQueryClient} from '@tanstack/react-query';
import { createPost } from "../services/createPost";
import { Post } from "../interface/post";


export default function Form() {

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (post: Post) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["posts"]});
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const post = {
      title: formData.get("title") as string,
      body: formData.get("body") as string,
    };

    mutation.mutate(post);
  
  }
	return (
		<section className='col-span-2'>
      <h2>New Post</h2>
      {mutation.isPending && <div className='bg-blue-100 text-blue-700 p-2 rounded-md'>Loading...</div>}
			<form
				onSubmit={handleSubmit}
				className='bg-white shadow-md rounded-md p-4'
			>
				<div className='mb-4'>
					<label
						htmlFor='title'
						className='block text-sm font-medium text-gray-700'
					>
						Title
					</label>
					<input
						type='text'
						name='title'
						id='title'
						className='mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='body'
						className='block text-sm font-medium text-gray-700'
					>
						Body
					</label>
					<textarea
						name='body'
						id='body'
						rows={4}
						className='mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300'
					></textarea>
				</div>
				<button
					type='submit'
					className='bg-blue-500 text-white font-semibold px-4 py-2 rounded'
				>
					Submit
				</button>
			</form>
		</section>
	);
}
