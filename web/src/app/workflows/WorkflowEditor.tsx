"use client";

import { useState } from "react";
import { Play, Copy, Download } from "@phosphor-icons/react";
import { Button } from "@tremor/react";

interface WorkflowEditorProps {
  title?: string;
  subtitle?: string;
  initialJson?: string;
}

export default function WorkflowEditor({
  title = "Custom Workflow",
  subtitle = "Your custom workflow",
  initialJson = "",
}: WorkflowEditorProps) {
  const [json, setJson] = useState(initialJson);
  const [isLoading, setIsLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(json);
  };

  const handleRun = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasRun(true);
    }, 3000);
  };

  const handleDownload = () => {
    // In a real application, replace this with the actual file path
    const filePath = "/path/to/your/file.txt";
    const link = document.createElement("a");
    link.href = filePath;
    link.download = "result.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="pl-20 pr-[60px] py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-xl text-gray-600 mb-6">{subtitle}</p>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="json-editor"
                  className="block text-sm font-medium text-gray-700"
                >
                  JSON Editor
                </label>
                <Button
                  size="xs"
                  variant="secondary"
                  onClick={handleCopy}
                  icon={Copy}
                  className="bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-300"
                >
                  Copy
                </Button>
              </div>
              <textarea
                id="json-editor"
                rows={10}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                value={json}
                onChange={(e) => setJson(e.target.value)}
                placeholder="Start describing your workflow here"
              />
            </div>
            <div className="flex space-x-4">
              <Button
                size="md"
                variant="secondary"
                onClick={handleRun}
                disabled={isLoading}
                icon={isLoading ? undefined : Play}
                className="bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-300"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Running...
                  </>
                ) : (
                  "Run"
                )}
              </Button>
              {hasRun && (
                <Button
                  size="md"
                  variant="secondary"
                  onClick={handleDownload}
                  icon={Download}
                  className="bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-300"
                >
                  Download Result
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
