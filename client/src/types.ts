export interface set {
  reps: number;
  weight: number | undefined;
  rest: number | undefined;
}

export interface Exercise {
  name: string;
  muscleTarget: string[];
  sets: set[];
}

export interface Workout {
  id?: string;
  name: string | undefined;
  splitType: string | undefined;
  exerciseBlocks: Exercise[][];
  draft: boolean;
}

export interface formsFunctions {
  errorCheck(): void;
  resetState(): void;
  createExercise(): Exercise;
}

export type Mode = "view" | "edit" | "create";
