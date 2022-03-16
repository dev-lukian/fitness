export interface Exercise {
  id: string;
  name: string;
  muscleTarget: string[];
  sets: number;
  reps: number;
  restTime: number;
}

export interface Workout {
  name: string | undefined;
  split: string | undefined;
  exercises: Exercise[];
  draft: boolean;
}
