import { Check, CircleDot } from "lucide-react";
import type { WorkflowStep } from "./workflowTypes";

type EffectGuideProps = {
  steps: WorkflowStep[];
};

export function EffectGuide({ steps }: EffectGuideProps) {
  return (
    <aside className="guidePanel" aria-label="Arbeitsablauf">
      <p className="panelLabel">Ablauf</p>
      <ol className="stepList">
        {steps.map((step) => (
          <li className={`stepItem stepItem-${step.state}`} key={step.title}>
            <span className="stepMarker" aria-hidden="true">
              {step.state === "done" ? <Check size={16} /> : <CircleDot size={16} />}
            </span>
            <span>
              <strong>{step.title}</strong>
              <span>{step.description}</span>
            </span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
