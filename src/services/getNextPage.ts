import { Post } from "../interface/post";
import { API_URL, httpGetNextPage } from "./common/http";

export function getNextPage(page: number, limit: number): Promise<Post[]> {
    return httpGetNextPage(API_URL, page, limit)
}
