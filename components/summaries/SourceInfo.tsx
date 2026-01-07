import { Button } from "@/components/ui/button";
import { ExternalLink, FileText } from "lucide-react";
import DownloadSummaryButton from "./DownloadSummaryButton";
export function SourceInfo({fileName,originalUrl,title,summary_text,createdAt }: {fileName:string;originalUrl?:string;title?:string;summary_text?:string;createdAt?:string}){

    return (
<div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
  {/* Source info section (left on large screens, top on mobile) */}
  <div className="flex items-center justify-center gap-2">
    <FileText className="h-4 w-4 text-rose-400" />
    <span>Source: {fileName}</span>
  </div>

  {/* View Original button (right on large screens, bottom on mobile) */}
  <div className="flex gap-2">
    <Button
      variant="ghost"
      size="sm"
      className="h-8 px-3 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
      asChild
    >
      <a
        href={originalUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExternalLink className="h-4 w-4 mr-1" />
        View Original
      </a>
    </Button>
    <DownloadSummaryButton
    title={title}
    summary_text={summary_text}
    createdAt={createdAt}
    fileName={fileName}
    />
  </div>
</div>    )
}