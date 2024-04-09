import {useEffect, useState} from "react";
import {Post} from "./interface/post";
import {getNextPage} from "./services/getNextPage";
import Spinner from "./components/Spinner";

function App() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reachedLastPage, setReachedLastPage] = useState(false);

	const fetchPosts = async (page: number) => {
		setIsLoading(true);
		try {
			const response = await getNextPage(page, 4);
      setPosts(response);
      
      // Check if the response is empty
      if (response.length === 0) {
        setReachedLastPage(true);
      } else {
        setReachedLastPage(false);
      }

		} catch (error) {
			setHasError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const nextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

	const prevPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
	};

	useEffect(() => {
		fetchPosts(currentPage);
	}, [currentPage]);

	return (
		<div className='bg-gray-100 min-h-screen'>
			<header className='text-center py-8'>
				<h1 className='text-3xl font-bold underline'>Posts App</h1>
			</header>

			<main className='container mx-auto px-4 py-4'>
				{hasError && (
					<p className='text-center text-red-600'>
						Error loading posts. Please try again later.
					</p>
				)}

				<div className="min-h-[700px]">
					{isLoading ? (
						<div className='flex items-center justify-center'>
							<Spinner />
						</div>
					) : (
						<div className='grid grid-cols-1 grid-rows-2 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
							{posts.map((post) => (
								<div
									key={post.id}
									className='bg-white shadow-md rounded-md p-4'
								>
									<h2 className='text-lg font-semibold mb-2'>{post.title}</h2>
									<p className='text-gray-600'>{post.body}</p>
								</div>
							))}
						</div>
					)}
				</div>

				<div className='flex justify-center mt-8'>
					<button
						onClick={prevPage}
						disabled={currentPage === 1}
						className='bg-blue-500 text-white font-semibold px-4 py-2 mr-2 rounded disabled:bg-gray-300'
					>
						Previous
					</button>
					<button
						onClick={nextPage}
						disabled={reachedLastPage || isLoading || posts.length === 0}
						className='bg-blue-500 text-white font-semibold px-4 py-2 rounded disabled:bg-gray-300'
					>
						Next
					</button>
				</div>
			</main>
		</div>
	);
}

export default App;
