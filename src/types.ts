export interface Exercise {
  id: string;
  name: string;
  muscleTarget: string[];
  sets: number;
  reps: number;
  restTime: number | undefined;
}

export interface Workout {
  id: string;
  name: string | undefined;
  split: string | undefined;
  exerciseBlocks: Exercise[][];
  draft: boolean;
}

export interface formsFunctions {
  errorCheck(): void;
  resetState(): void;
  createExercise(): Exercise;
}

export type Mode = "view" | "edit" | "create";
