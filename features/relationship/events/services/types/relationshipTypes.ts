export type TimelineEventType =
  | "match_created"
  | "experience_completed"
  | "memory_created"
  | "special_date_added"
  | "milestone_unlocked"
  | "product_clicked"
  | "product_purchased"
  | "story_generated";

export type TimelineEventVisibility = "private" | "couple" | "admin_aggregate";

export type RelationshipTimelineEvent = {
  id: string;
  couple_id: string;
  user_id?: string | null;
  idea_id?: string | null;
  product_id?: string | null;
  event_type: TimelineEventType;
  title: string;
  description?: string | null;
  visibility: TimelineEventVisibility;
  metadata?: Record<string, unknown>;
  created_at: string;
};

export type RelationshipMemory = {
  id: string;
  couple_id: string;
  user_id?: string | null;
  idea_id?: string | null;
  title: string;
  content?: string | null;
  rating?: number | null;
  mood?: string | null;
  metadata?: Record<string, unknown>;
  created_at: string;
};

export type RelationshipSpecialDate = {
  id: string;
  couple_id: string;
  title: string;
  date: string;
  type: "dating_anniversary" | "wedding_anniversary" | "birthday" | "custom";
  reminder_enabled: boolean;
  metadata?: Record<string, unknown>;
  created_at: string;
};

export type RelationshipDNA = {
  couple_id: string;
  communication: number;
  romance: number;
  intimacy: number;
  fun: number;
  novelty: number;
  quality_time: number;
  relaxation: number;
  updated_at: string;
};