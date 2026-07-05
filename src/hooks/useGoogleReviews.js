import { reviewsFallback } from "../data/reviewsFallback.js";

export function useGoogleReviews() {
  return {
    reviews: reviewsFallback,
    loading: false,
    error: "",
    fromCache: false,
    configured: reviewsFallback.length > 0,
  };
}
