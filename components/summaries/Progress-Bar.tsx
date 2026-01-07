import { cn } from "@/lib/utils";

export default function ProgressBar({
  sections,
  currentSection,
}: {
  sections: Array<{ title: string; points: string[] }>;
  currentSection: number;
}) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 bg-white/50 backdrop-blur-sm pt-6 pb-4 px-6 rounded-t-3xl border-b border-rose-100">
      <div className="flex w-full items-center gap-2">
        {sections.map((_, index) => (
          <div
            key={index}
            className="h-1.5 rounded-full bg-rose-100 overflow-hidden flex-1 transition-all duration-500"
          >
            <div
              className={cn(
                "h-full bg-gradient-to-r from-rose-400 to-rose-600 transition-all duration-500 ease-out",
                index <= currentSection ? "w-full" : "w-0"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}