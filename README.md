# React + TanStack Query + TypeScript + TailwindCSS + Vite

## Que es TanStack Query?

Es una librería de gestión de estado para React que se integra con React Query. Permite realizar consultas a una API y gestionar el estado de la aplicación de forma sencilla.

## ¿Por qué usar TanStack Query?

- **Sencillo de usar**: TanStack Query es muy fácil de usar y se integra perfectamente con React Query.

- **Optimizado para React**: TanStack Query está optimizado para trabajar con React y se integra perfectamente con el ecosistema de React.

- **Gestión de estado**: TanStack Query permite gestionar el estado de la aplicación de forma sencilla y eficiente.

- **Documentación completa**: TanStack Query cuenta con una documentación completa y detallada que te ayudará a sacarle el máximo provecho.

## ¿Cómo instalar TanStack Query?

Para instalar TanStack Query en tu proyecto, simplemente ejecuta el siguiente comando:

```bash
npm i @tanstack/react-query
```

## ¿Cómo usar TanStack Query?

Primero crear un queryClient en el archivo `main.tsx`:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
)
```

Luego, en el componente donde quieras usar TanStack Query, importa `useQuery` y usa la función `useQuery` para realizar consultas a la API:

```tsx
import { useQuery } from '@tanstack/react-query'

function App() {
    const [page, setPage] = useState(1)
  
  const { data: posts, error, isLoading, isFetching, isPreviousData } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => nextPagePost(page),
    keepPreviousData: true
  })

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      <ul>
        {posts && posts.map((post) => (
          <li onClick={() => handlePostId(post.id)} key={post.id}>{post.title}</li>
          ))}
      </ul>

      <button
        onClick={() => setPage((old) => old - 1)}
        disabled={page === 1}
      >
        Prev Page
      </button>

      <button
        onClick={() => {
          if (!isPreviousData && posts?.length) {
            setPage((old) => old + 1)
          }
        }}

        disabled={isPreviousData || !posts?.length}
      >
        Next Page
      </button>
    </div>
  )
}
```

## Mutaciones

TanStack Query también permite realizar mutaciones a la API. Para ello, importa `useMutation` y usa la función `useMutation` para realizar mutaciones a la API:

```tsx
import { useMutation } from '@tanstack/react-query'

function App() {
 const [newPost, setNewPost] = useState({
    title: '',
    body: ' '
  })

  const mutation = useMutation((newPost) => {
    return createNewPost(newPost)
  })

  const handleChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <h1>Nuevo Post</h1>
      {mutation.isLoading && <p>Creando Post...</p>}
      <form>
        <input type="text" name='title' value={newPost.title} onChange={handleChange} placeholder='Title' />
        <input type="text" name='body' value={newPost.body} onChange={handleChange} placeholder='Body' />
        <button onClick={() => mutation.mutate(newPost)} type='submit'>Crear Post</button>
      </form>
    </div>
  )
}
```
## Conclusiones

TanStack Query es una librería de gestión de estado para React que se integra con React Query y que permite gestionar el estado de la aplicación de forma sencilla y eficiente. Si estás buscando una forma sencilla de gestionar el estado de tu aplicación en React, TanStack Query es una excelente opción.