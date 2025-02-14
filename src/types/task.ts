// Define the allowed task types as a union of string literals

export type TaskType =
  | "education"
  | "recreational"
  | "social"
  | "diy"
  | "charity"
  | "cooking"
  | "relaxation"
  | "music"
  | "busywork";

export interface Task {
  id: string;
  activity: string;
  price: number;
  type: TaskType;
  bookingRequired: boolean;
  accessibility: number;
}
