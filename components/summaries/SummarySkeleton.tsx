'use client';

import { MotionDiv } from "@/components/common/motion-wrapper";
import BgGradient from "@/components/common/bg-gradient";
import { FileText } from "lucide-react";

export default function SummarySkeleton() {
  return (
    <div className="relative w-full">
      {/* Main card container matching summary page style */}
      <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 max-w-4xl mx-auto">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl pointer-events-none" />

        {/* Word count skeleton */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
          <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
          <MotionDiv
            className="h-4 bg-rose-100/60 rounded w-16"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>

        {/* Summary viewer skeleton */}
        <div className="relative mt-8 sm:mt-6">
          <div className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full overflow-hidden bg-gradient-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg rounded-3xl border border-rose-500/10">
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-rose-100/50 overflow-hidden">
              <MotionDiv
                className="h-full bg-gradient-to-r from-rose-500 to-rose-600 w-1/3"
                animate={{ x: ['-100%', '400%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Content area */}
            <div className="h-full overflow-hidden pt-12 sm:pt-16 pb-20 sm:pb-24 px-4 sm:px-6">
              {/* Section title skeleton */}
              <div className="flex flex-col gap-2 mb-6 pt-2 pb-4">
                <div className="flex items-center justify-center gap-2">
                  <MotionDiv
                    className="h-8 w-48 bg-gradient-to-r from-rose-100 to-rose-50 rounded-lg"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Content cards skeleton */}
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <MotionDiv
                    key={index}
                    className="group relative bg-gradient-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Emoji placeholder */}
                      <MotionDiv
                        className="h-6 w-6 bg-rose-100/50 rounded-full shrink-0"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                      />
                      {/* Text placeholder */}
                      <div className="flex-1 space-y-2">
                        <MotionDiv
                          className="h-4 bg-rose-100/40 rounded-lg"
                          style={{ width: `${90 - index * 8}%` }}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                        />
                        {index % 2 === 0 && (
                          <MotionDiv
                            className="h-4 bg-rose-100/30 rounded-lg w-2/3"
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 + 0.1 }}
                          />
                        )}
                      </div>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </div>

            {/* Loading overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm rounded-3xl">
              <MotionDiv
                className="flex flex-col items-center gap-4 bg-white/90 p-8 rounded-2xl shadow-lg border border-rose-100/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <MotionDiv
                  className="h-16 w-16 border-4 border-rose-200 border-t-rose-500 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <MotionDiv
                  className="text-lg font-semibold text-rose-600"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Generating Summary...
                </MotionDiv>
                <p className="text-sm text-gray-500 text-center max-w-xs">
                  Our AI is reading and analyzing your PDF. This may take a moment.
                </p>
              </MotionDiv>
            </div>

            {/* Navigation skeleton */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xs border-t border-rose-500/10">
              <div className="flex items-center justify-between">
                <MotionDiv
                  className="h-10 w-10 bg-rose-100/50 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div className="flex gap-2">
                  {[...Array(3)].map((_, index) => (
                    <MotionDiv
                      key={index}
                      className={`h-3 w-3 rounded-full ${index === 0 ? 'bg-rose-500' : 'bg-rose-200'}`}
                      animate={{ scale: index === 0 ? [1, 1.2, 1] : 1, opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
                    />
                  ))}
                </div>
                <MotionDiv
                  className="h-10 w-10 bg-rose-100/50 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
