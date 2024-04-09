import { Post } from "../interface/post";
import { API_URL, httpGetPostById } from "./common/http";

export function getPost(id: string): Promise<Post[]> {
  return httpGetPostById(API_URL, id);
}