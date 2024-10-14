import { useState } from "react";
import {
  Activity,
  FileText,
  Users,
  Gear,
  ChartBar,
  Plus,
} from "@phosphor-icons/react";

export type Workflow = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
};

const defaultWorkflows: Workflow[] = [
  {
    title: "Company analysis and reporting",
    subtitle:
      "Automatic report about specific company based on annual regulatory filiings and recent market data",
    icon: <ChartBar size={32} />,
  },
  {
    title: "Company outlook estimation",
    subtitle:
      "Short-term outlook about the company based on financials, stock prices and latest news.",
    icon: <FileText size={32} />,
  },
  {
    title: "Competitive analysis",
    subtitle:
      "Research competitive landscape of the company, including compraible analysis.",
    icon: <FileText size={32} />,
  },
  {
    title: "Regulations overview",
    subtitle:
      "Review regulatory documents and prepare on overview of requirements and initial impact estimations.",
    icon: <Gear size={32} />,
  },
  {
    title: "Analyst research",
    subtitle:
      "Review analyst research about company, while focusing on key changes of estimations and of future outlook over time",
    icon: <Activity size={32} />,
  },
  {
    title: "Add new",
    subtitle: "Create your custom workflow",
    icon: <Plus size={32} />,
  },
];

type WorkflowsPageProps = {
  workflows?: Workflow[];
  onSelectedWorkflow: (workflow: Workflow) => void;
};

export default function WorkflowTiles({
  workflows = defaultWorkflows,
  onSelectedWorkflow,
}: WorkflowsPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((workflow, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105"
            onClick={() => onSelectedWorkflow(workflow)}
          >
            <div className="flex items-center justify-center mb-4">
              {workflow.icon}
            </div>
            <h2 className="text-xl font-semibold text-center mb-2">
              {workflow.title}
            </h2>
            <p className="text-gray-600 text-center">{workflow.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
