import { reviews } from "../data/reviewsData.js";

export function useGoogleReviews() {
  return {
    reviews,
    loading: false,
    error: "",
    fromCache: false,
    configured: reviews.length > 0,
  };
}
