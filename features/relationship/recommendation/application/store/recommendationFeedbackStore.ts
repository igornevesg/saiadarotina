export type RecommendationFeedback = {
  momentId: string;
  action: "liked" | "anotherSuggestion";
  createdAt: Date;
};

const feedbacks: RecommendationFeedback[] = [];

export function saveRecommendationFeedback(
  feedback: RecommendationFeedback
) {
  feedbacks.push(feedback);
}

export function listRecommendationFeedback() {
  return [...feedbacks];
}

export function clearRecommendationFeedback() {
  feedbacks.length = 0;
}