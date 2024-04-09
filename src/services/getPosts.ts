import { Post } from "../interface/post";
import { API_URL, httpGet } from "./common/http";

export function getPosts(): Promise<Post[]> {
  return httpGet(API_URL);
}