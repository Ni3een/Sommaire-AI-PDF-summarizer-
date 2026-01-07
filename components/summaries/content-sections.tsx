import React from 'react';
import { MotionDiv } from '@/components/common/motion-wrapper';
import { itemsVariants } from '@/utils/constants';

function parsePoint(point: string) {
  const isNumbered = /^\d+\.\s/.test(point);
  const isMainPoint = /^\*/.test(point);

  // Regex to find emoji
  const emojiRegex = /([\u{1F300}-\u{1F9FF}]|\u{2600}-\u{26FF})/u;
  const match = point.match(emojiRegex);
  const hasEmoji = !!match;
  
  let emoji = match ? match[0] : '•';
  let text = point.replace(emojiRegex, '').trim();
  
  // Clean up text
  text = text.replace(/^[-•*]\s*/, '').trim();
  if (isNumbered) {
      text = text.replace(/^\d+\.\s*/, '').trim();
  }

  return { isNumbered, isMainPoint, hasEmoji, emoji, text };
}

export default function ContentSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="space-y-4">
      {points.map((point, index) => {
        const { isNumbered, isMainPoint, hasEmoji, emoji, text } = parsePoint(point);

        return (
          <MotionDiv variants={itemsVariants}
            initial="hidden"
            animate="visible"
            key={`point-${index}`}
            className="group relative bg-gradient-to-br 
              from-gray-200/[0.08] to-gray-400/[0.03] p-4 
              rounded-2xl border border-gray-500/10 
              hover:shadow-lg transition-all"
          >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r 
              from-gray-500/10 to-transparent opacity-0 
              group-hover:opacity-100 transition-opacity 
              rounded-2xl" />

            <div className="relative flex items-start gap-3">
              <span className="text-lg lg:text-xl shrink-0 
                pt-1">{emoji}</span>
              <p className="text-lg lg:text-xl 
                text-muted-foreground/90 leading-relaxed">
                {text}
              </p>
            </div>
          </MotionDiv>

        );
      })}
    </div>
  );
}