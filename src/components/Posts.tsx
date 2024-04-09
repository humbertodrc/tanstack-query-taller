import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {getNextPage} from "../services/getNextPage";
import Spinner from "./Spinner";
import NoAviable from "./NoAviable";
import Post from "./Post";

export default function Posts() {
	const [currentPage, setCurrentPage] = useState(1);

	const query = useQuery({
		queryKey: ["posts", currentPage],
		queryFn: () => getNextPage(currentPage, 4),
		// refetchOnWindowFocus: false,
		// refetchInterval: 2000,
		// staleTime: 60000,
		// staleTime: Infinity,
		// gcTime: 3000,
		// retry: 1
	});

	const nextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

	const prevPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
	};

	return (
		<section className='col-span-3'>
			<h2>Posts {query.isFetching && <Spinner />}</h2>
			<div>
				{query.isLoading ? (
					<div className='flex items-center justify-center'>
						<Spinner />
					</div>
				) : (
					<div className='grid grid-cols-1 grid-rows-2 sm:grid-cols-2 lg:grid-cols-2 gap-8 min-h-80'>
						{query.data &&
							query.data.map((post) => <Post key={post.id} post={post} />)}
					</div>
				)}
				{query.data?.length === 0 && <NoAviable />}
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
						disabled={query.data?.length === 0}
						className='bg-blue-500 text-white font-semibold px-4 py-2 rounded disabled:bg-gray-300'
					>
						Next
					</button>
				</div>
			</div>
		</section>
	);
}
