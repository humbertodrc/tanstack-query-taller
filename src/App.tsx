import Form from "./components/Form";
import Posts from "./components/Posts";

function App() {
	return (
		<div className='bg-gray-100 min-h-screen'>
			<header className='text-center py-8'>
				<h1 className='text-3xl font-bold underline'>Posts App</h1>
			</header>

			<main className='container mx-auto px-4 py-4'>
				<div className='grid grid-cols-5 gap-6'>
					<Form />
					<Posts />
				</div>
			</main>
		</div>
	);
}

export default App;
