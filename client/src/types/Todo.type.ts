export enum PriorityType {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface TodoType {
  id: number;
  title: string;
  description: string | null;
  isDone: boolean;
  priority: PriorityType;
}
