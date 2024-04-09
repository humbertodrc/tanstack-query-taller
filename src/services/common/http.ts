import { Post } from "../../interface/post";

export const API_URL = "http://localhost:3005/posts";

interface DefaultHeaders {
	[key: string]: string;
}


// Encabezados por defecto
const defaultHeaders: DefaultHeaders = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

// Manejo de errores
export class HttpError extends Error {
	response: Response;

	constructor(response: Response) {
		super(`HTTP error! Status: ${response.status}`);
		this.response = response;
	}
}

// Handle response
const handleResponse = async (response: Response): Promise<Post[]> => {
	if (!response.ok) {
		throw new HttpError(response);
	}

	return response.json();
};

export const httpGet = async (
	endpoint: string,
	options: {headers?: DefaultHeaders} = {}
): Promise<Post[]> => {
	const response = await fetch(endpoint, {
		method: "GET",
		headers: {...defaultHeaders, ...options.headers},
	});

	return handleResponse(response);
};

export const httpGetPostById = async(
  endpoint: string,
  id: string,
  options: {headers?: DefaultHeaders} = {}
): Promise<Post[]> => {
  const response = await fetch(`${endpoint}/${id}`, {
    method: "GET",
    headers: {...defaultHeaders, ...options.headers},
  });

  return handleResponse(response);
};

export const httpPost = async (
	endpoint: string,
	body: Post,
	options: {headers?: DefaultHeaders} = {}
): Promise<Post> => {
	const response = await fetch(endpoint, {
		method: "POST",
		headers: {...defaultHeaders, ...options.headers},
		body: JSON.stringify(body),
	});

	return response.json();
};

// Método Siguiente (Paginación)
export const httpGetNextPage = async (
	endpoint: string,
  page: number,
  limit: number,
	options: {headers?: DefaultHeaders} = {}
): Promise<Post[]> => {
  const response = await fetch(`${endpoint}?_page=${page}&_limit=${limit}`, {
    method: "GET",
    headers: {...defaultHeaders, ...options.headers},
  });

  return handleResponse(response);
};