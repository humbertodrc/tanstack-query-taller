import { Post } from "../interface/post";
import { API_URL, httpPost } from "./common/http";

export function createPost(post: Post): Promise<Post[]> {
  return httpPost(`${API_URL}/posts`, post);
}