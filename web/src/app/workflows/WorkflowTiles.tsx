import { useState } from "react";
import {
  Activity,
  FileText,
  Users,
  Gear,
  ChartBar,
  Envelope,
} from "@phosphor-icons/react";

export type Workflow = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
};

const defaultWorkflows: Workflow[] = [
  {
    title: "Analytics",
    subtitle: "Track your data",
    icon: <ChartBar size={32} />,
  },
  {
    title: "Reporting",
    subtitle: "Generate reports",
    icon: <FileText size={32} />,
  },
  {
    title: "Team Management",
    subtitle: "Manage your team",
    icon: <Users size={32} />,
  },
  {
    title: "Settings",
    subtitle: "Configure your Workflows",
    icon: <Gear size={32} />,
  },
  {
    title: "Activity",
    subtitle: "Monitor actions",
    icon: <Activity size={32} />,
  },
  {
    title: "Communications",
    subtitle: "Manage messages",
    icon: <Envelope size={32} />,
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
