import { Post as PostI } from "../interface/post";

interface PostProps {
  post: PostI;
}

export default function Post({ post }: PostProps) {
	return (
		<div key={post.id} className='bg-white shadow-md rounded-md p-4'>
			<h2 className='text-lg font-semibold mb-2'>{post.title}</h2>
			<p className='text-gray-600'>{post.body}</p>
		</div>
	);
}
