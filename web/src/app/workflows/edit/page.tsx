"use client";

import { useSearchParams } from "next/navigation";
import WorkflowEditor from "../WorkflowEditor";

export default function EditWorkflowPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "My Workflow";
  const subtitle = searchParams.get("subtitle") || "Your custom workflow";

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Workflow</h1>
        </div>
      </header>
      <main>
        <div className="max-w-full mx-auto">
          <WorkflowEditor
            title={title}
            subtitle={subtitle}
            initialJson={`{
              "name": "${title}",
              "description": "${subtitle}",
              "steps": [
                {
                  "id": 1,
                  "name": "First Step",
                  "action": "startProcess"
                },
                {
                  "id": 2,
                  "name": "Second Step",
                  "action": "processData"
                },
                {
                  "id": 3,
                  "name": "Final Step",
                  "action": "sendResults"
                }
              ]
            }`}
          />
        </div>
      </main>
    </div>
  );
}
