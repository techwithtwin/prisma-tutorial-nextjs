import { IMAGE_URL } from "@/config";

export function getImageUrl(path: string) {
  return `${IMAGE_URL}${path}`;
}
