export type WorkflowStepState = "active" | "idle" | "done";

export type WorkflowStep = {
  title: string;
  description: string;
  state: WorkflowStepState;
};

export type EffectPreset = {
  name: string;
  summary: string;
  intensity: string;
};
