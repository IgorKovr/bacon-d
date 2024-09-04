"use client";

import { useSearchParams } from "next/navigation";
import WorkflowEditor from "../WorkflowEditor";
import FunctionalWrapper from "@/app/chat/shared_chat_search/FunctionalWrapper";
import { HistorySidebar } from "@/app/chat/sessionSidebar/HistorySidebar";
import FixedLogo from "@/app/chat/shared_chat_search/FixedLogo";

export default function EditWorkflowPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "My Workflow";
  const subtitle = searchParams.get("subtitle") || "Your custom workflow";

  return (
    <FunctionalWrapper
      initiallyToggled={true}
      content={() => (
        <>
          <div className="flex relative pr-[8px] h-full text-default">
            <div className="flex-none fixed left-0 z-30 bg-background-100 h-screen transition-all bg-opacity-80 duration-300 ease-in-out">
              <div className="w-full relative">
                <HistorySidebar explicitlyUntoggle={() => {}} page="chat" />
              </div>
            </div>

            <div className="absolute include-scrollbar h-screen overflow-y-auto left-0 w-full top-[80px] bottom-0">
              <div className="w-full flex">
                <div
                  style={{ transition: "width 0.30s ease-out" }}
                  className="flex-none overflow-y-hidden bg-background-100 h-full transition-all bg-opacity-80 duration-300 ease-in-out w-[250px]"
                />

                <div className="desktop:px-24 w-full mt-10 pt-10 relative max-w-[2000px] xl:max-w-[1430px] mx-auto">
                  <div className="mobile:fixed mobile:left-1/2 mobile:transform mobile:-translate-x-1/2 mobile:max-w-search-bar-max mobile:w-[90%] mobile:z-100 mobile:bottom-12">
                    <div className="mt-0 mb-8 flex justify-center items-center">
                      <div className="text-3xl font-bold font-strong text-strong mx-auto">
                        Configure Workflow
                      </div>
                    </div>
                    <div className="mt-8">
                      <WorkflowEditor
                        title={title}
                        subtitle={subtitle}
                        initialJson={
                          title === "Add new"
                            ? undefined
                            : `company = "Microsoft"
fyear = "2023"

main_task_message = "
    With the tools you've been provided, write an annual report based on {company}'s {fyear} 10-k report, format it into a pdf.
    Pay attention to the followings:
    - Explicitly explain your working plan before you kick off.
    - Use tools one by one for clarity, especially when asking for instructions. 
    - All your file operations should be done in "{work_dir}". 
    - Display any image in the chat once generated.
    - All the paragraphs should combine between 400 and 450 words, don't generate the pdf until this is explicitly fulfilled."

library = [
    {
        "name": "Expert_Investor",
        "profile": dedent(
            f"""
            Role: Expert Investor
            Department: Finance
            Primary Responsibility: Generation of Customized Financial Analysis Reports

            Role Description:
            As an Expert Investor within the finance domain, your expertise is harnessed to develop bespoke Financial Analysis Reports that cater to specific client requirements. This role demands a deep dive into financial statements and market data to unearth insights regarding a company's financial performance and stability. Engaging directly with clients to gather essential information and continuously refining the report with their feedback ensures the final product precisely meets their needs and expectations.

            Key Objectives:

            Analytical Precision: Employ meticulous analytical prowess to interpret financial data, identifying underlying trends and anomalies.
            Effective Communication: Simplify and effectively convey complex financial narratives, making them accessible and actionable to non-specialist audiences.
            Client Focus: Dynamically tailor reports in response to client feedback, ensuring the final analysis aligns with their strategic objectives.
            Adherence to Excellence: Maintain the highest standards of quality and integrity in report generation, following established benchmarks for analytical rigor.
            Performance Indicators:
            The efficacy of the Financial Analysis Report is measured by its utility in providing clear, actionable insights. This encompasses aiding corporate decision-making, pinpointing areas for operational enhancement, and offering a lucid evaluation of the company's financial health. Success is ultimately reflected in the report's contribution to informed investment decisions and strategic planning.

            Reply TERMINATE when everything is settled.
            """
        ),
        "toolkits": [
            FMPUtils.get_sec_report,  # Retrieve SEC report url and filing date
            IPythonUtils.display_image,  # Display image in IPython
            TextUtils.check_text_length,  # Check text length
            ReportLabUtils.build_annual_report,  # Build annual report in designed pdf format
            ReportAnalysisUtils,  # Expert Knowledge for Report Analysis
            ReportChartUtils,  # Expert Knowledge for Report Chart Plotting
        ],
    }
]

analyze_income_stmt_instruction = dedent(
            """
            Conduct a comprehensive analysis of the company's income statement for the current fiscal year. 
            Start with an overall revenue record, including Year-over-Year or Quarter-over-Quarter comparisons, 
            and break down revenue sources to identify primary contributors and trends. Examine the Cost of 
            Goods Sold for potential cost control issues. Review profit margins such as gross, operating, 
            and net profit margins to evaluate cost efficiency, operational effectiveness, and overall profitability. 
            Analyze Earnings Per Share to understand investor perspectives. Compare these metrics with historical 
            data and industry or competitor benchmarks to identify growth patterns, profitability trends, and 
            operational challenges. The output should be a strategic overview of the company's financial health 
            in a single paragraph, less than 130 words, summarizing the previous analysis into 4-5 key points under 
            respective subheadings with specific discussion and strong data support.
            """
        )

analyze_balance_sheet_instruction = dedent(
            """
            Delve into a detailed scrutiny of the company's balance sheet for the most recent fiscal year, pinpointing 
            the structure of assets, liabilities, and shareholders' equity to decode the firm's financial stability and 
            operational efficiency. Focus on evaluating the liquidity through current assets versus current liabilities, 
            the solvency via long-term debt ratios, and the equity position to gauge long-term investment potential. 
            Contrast these metrics with previous years' data to highlight financial trends, improvements, or deteriorations. 
            Finalize with a strategic assessment of the company's financial leverage, asset management, and capital structure, 
            providing insights into its fiscal health and future prospects in a single paragraph. Less than 130 words.
            """
        )
analyze_cash_flow_instruction = dedent(
            """
            Dive into a comprehensive evaluation of the company's cash flow for the latest fiscal year, focusing on cash inflows 
            and outflows across operating, investing, and financing activities. Examine the operational cash flow to assess the 
            core business profitability, scrutinize investing activities for insights into capital expenditures and investments, 
            and review financing activities to understand debt, equity movements, and dividend policies. Compare these cash movements 
            to prior periods to discern trends, sustainability, and liquidity risks. Conclude with an informed analysis of the company's 
            cash management effectiveness, liquidity position, and potential for future growth or financial challenges in a single paragraph. 
            Less than 130 words.
            """
        )

analyze_segment_stmt_instruction = dedent(
            """
            Identify the company's business segments and create a segment analysis using the Management's Discussion and Analysis 
            and the income statement, subdivided by segment with clear headings. Address revenue and net profit with specific data, 
            and calculate the changes. Detail strategic partnerships and their impacts, including details like the companies or organizations. 
            Describe product innovations and their effects on income growth. Quantify market share and its changes, or state market position 
            and its changes. Analyze market dynamics and profit challenges, noting any effects from national policy changes. Include the cost side, 
            detailing operational costs, innovation investments, and expenses from channel expansion, etc. Support each statement with evidence, 
            keeping each segment analysis concise and under 60 words, accurately sourcing information. For each segment, consolidate the most 
            significant findings into one clear, concise paragraph, excluding less critical or vaguely described aspects to ensure clarity and 
            reliance on evidence-backed information. For each segment, the output should be one single paragraph within 150 words.
            """
income_summarization_instruction = dedent(
            f"""
            Income statement analysis: {income_stmt_analysis},
            Segment analysis: {segment_analysis},
            Synthesize the findings from the in-depth income statement analysis and segment analysis into a single, coherent paragraph. 
            It should be fact-based and data-driven. First, present and assess overall revenue and profit situation, noting significant 
            trends and changes. Second, examine the performance of the various business segments, with an emphasis on their revenue and 
            profit changes, revenue contributions and market dynamics. For information not covered in the first two areas, identify and 
            integrate key findings related to operation, potential risks and strategic opportunities for growth and stability into the analysis. 
            For each part, integrate historical data comparisons and provide relevant facts, metrics or data as evidence. The entire synthesis 
            should be presented as a continuous paragraph without the use of bullet points. Use subtitles and numbering for each key point. 
            The total output should be less than 160 words.
            """
        )

     
get_risk_assessment_instruction = "According to the given information, summarize the top 3 key risks of the company. Less than 100 words."
    
 analyze_business_highlights_instruction = dedent(
            """
            According to the given information, describe the performance highlights per business of the company. 
            Each business description should contain one sentence of a summarization and one sentence of explanation. 
            Less than 130 words.
            """
    )

analyze_company_description_instruction = dedent(
            """
            According to the given information, 
            1. Briefly describe the company's industry,
            2. Highlight core strengths and competitive advantages key products or services,
            3. Identify current industry trends, opportunities, and challenges that influence the company's strategy,
            4. Outline recent strategic initiatives such as product launches, acquisitions, or new partnerships, and describe the company's response to market conditions. 
            Less than 400 words.
            """
        )

                        `
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FixedLogo />
        </>
      )}
    />
  );
}
