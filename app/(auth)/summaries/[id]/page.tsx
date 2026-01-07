import { getSummaryPageById } from "@/lib/summary";
import { notFound } from "next/navigation";
import BgGradient from "@/components/common/bg-gradient";
import SummaryHeader from "@/components/summaries/summariesHeader"; // Fixed typo: "summairesHeader" → "summaryHeader"
import { FileText } from "lucide-react"; // You need this import!
import { SourceInfo } from "@/components/summaries/SourceInfo";
import { SummaryViewer } from "@/components/summaries/summary-viewer";
import { MotionDiv } from "@/components/common/motion-wrapper";
import { itemsVariants } from "@/utils/constants";
export default async function SummaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Await the promised params
  const summary = await getSummaryPageById(id); // Renamed for clarity

  if (!summary) {
    notFound(); // Shows Next.js 404 page
  }

  const { title, summary_text, file_name, word_count,originalUrl } = summary; // Destructure all needed fields

  return (
    <div className="relative isolate min-h-screen bg-gradient-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

      <div className="container mx-auto flex flex-col gap-4">
        <MotionDiv variants={itemsVariants} initial={{opacity:0,y:20}} animate={{opacity:1,y:0,transition:{duration:0.5}}}
         className="px-4 py-6 sm:py-8 lg:py-24">
          <SummaryHeader title={title} createdAt={summary.created_at} />
        </MotionDiv>

        {file_name && (
          <SourceInfo
            fileName={file_name}
            title={title}
            summary_text={summary_text}
            createdAt={summary.created_at}
            originalUrl={summary.original_file_url}
          />
        )}

        <MotionDiv variants={itemsVariants} initial={{opacity:0,y:20}} animate={{opacity:1,y:0,transition:{duration:0.5}}}
        className="relative mt-4 sm:mt-8 lg:mt-10">
          <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl pointer-events-none" />

            {/* Word count badge */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
              {word_count?.toLocaleString() || "0"} words
            </div>

            {/* Summary content */}
            <div className="relative mt-8 sm:mt-6 prose prose-lg max-w-none">
              <SummaryViewer summary_text={summary_text} />
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}