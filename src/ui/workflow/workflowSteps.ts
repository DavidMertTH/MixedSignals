import type { WorkflowStep } from "./workflowTypes";

export const workflowSteps: WorkflowStep[] = [
  {
    title: "Import",
    description: "Video ablegen und Projekt starten",
    state: "active",
  },
  {
    title: "Mosh",
    description: "Effekt auswählen und Intensität formen",
    state: "idle",
  },
  {
    title: "Preview",
    description: "Bewegung, Schnitte und Artefakte prüfen",
    state: "idle",
  },
  {
    title: "Export",
    description: "Format wählen und Render vorbereiten",
    state: "idle",
  },
];
