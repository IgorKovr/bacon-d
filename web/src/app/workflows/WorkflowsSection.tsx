"use client";

import FixedLogo from "@/app/chat/shared_chat_search/FixedLogo";
import WorkflowTiles, { Workflow } from "./WorkflowTiles";
import { useRouter } from "next/navigation";
import { EnterpriseAccessModal } from "@/components/EnterpriseAccessModal";

export const WorkflowsSection = () => {
  const router = useRouter();

  const handleWorkflowClick = (workflow: Workflow) => {
    const params = new URLSearchParams({
      title: workflow.title,
      subtitle: workflow.subtitle,
    });
  };

  return (
    <>
      <EnterpriseAccessModal />
      <div className="flex relative pr-[8px] h-full text-default">
        <div className="absolute include-scrollbar h-screen overflow-y-auto left-0 w-full top-0">
          <div className="w-full flex">
            <div className="desktop:px-24 w-full mt-10 pt-10 relative max-w-[2000px] xl:max-w-[1430px] mx-auto">
              <div className="mobile:fixed mobile:left-1/2 mobile:transform mobile:-translate-x-1/2 mobile:max-w-search-bar-max mobile:w-[90%] mobile:z-100 mobile:bottom-12">
                <div className="mt-48 mb-8 flex justify-center items-center">
                  <div className="text-3xl font-bold font-strong text-strong mx-auto">
                    Workflows
                  </div>
                </div>
                <div className="mt-8">
                  <WorkflowTiles onSelectedWorkflow={handleWorkflowClick} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FixedLogo />
    </>
  );
};
