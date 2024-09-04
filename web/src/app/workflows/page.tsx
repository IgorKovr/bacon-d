"use client";
import FunctionalWrapper from "../chat/shared_chat_search/FunctionalWrapper";
import { WorkflowsSection } from "./WorkflowsSection";
import WrappedWorkflows from "./WrappedWorkflows";

export default async function Home() {
  return (
    <FunctionalWrapper
      initiallyToggled={true}
      content={() => <WorkflowsSection />}
    />
  );
}
