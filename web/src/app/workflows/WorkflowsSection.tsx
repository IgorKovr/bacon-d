"use client";

import { HistorySidebar } from "@/app/chat/sessionSidebar/HistorySidebar";
import FixedLogo from "@/app/chat/shared_chat_search/FixedLogo";
import WorkflowEditor from "./WorkflowEditor";
import WorkflowTiles from "./WorkflowTiles";

export const WorkflowsSection = () => {
  return (
    <>
      <div className="flex relative pr-[8px] h-full text-default">
        <div
          className={`
            flex-none 
            fixed
            left-0 
            z-30
            bg-background-100 
            h-screen
            transition-all 
            bg-opacity-80
            duration-300 
            ease-in-out
          `}
        >
          <div className="w-full relative">
            <HistorySidebar explicitlyUntoggle={() => {}} page="chat" />
          </div>
        </div>

        <div className="absolute include-scrollbar h-screen overflow-y-auto left-0 w-full top-0">
          <div className="w-full flex">
            <div
              style={{ transition: "width 0.30s ease-out" }}
              className={`
                  flex-none
                  overflow-y-hidden
                  bg-background-100
                  h-full
                  transition-all
                  bg-opacity-80
                  duration-300 
                  ease-in-out
                  w-[250px]
                `}
            />

            {
              <div
                className={`desktop:px-24 w-full mt-10 pt-10 relative max-w-[2000px] xl:max-w-[1430px] mx-auto`}
              >
                <div
                  className={`mobile:fixed mobile:left-1/2 mobile:transform mobile:-translate-x-1/2 mobile:max-w-search-bar-max mobile:w-[90%] mobile:z-100 mobile:bottom-12`}
                >
                  <div className="mt-48 mb-8 flex justify-center items-center">
                    <div className="text-3xl font-bold font-strong text-strong mx-auto">
                      Workflows
                    </div>
                  </div>
                  <div className="mt-8">
                    <WorkflowTiles />
                    {/* <WorkflowEditor /> */}
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <FixedLogo />
    </>
  );
};
