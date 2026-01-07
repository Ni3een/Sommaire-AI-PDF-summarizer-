import { Pizza } from "lucide-react";
import { SummaryViewer } from "@/components/summaries/summary-viewer";
import { MotionH3,MotionDiv} from "@/components/common/motion-wrapper";

const DEMO_SUMMARY = `# 📄 Document Overview
This summary covers Next.js 14 development from fundamentals to production patterns including App Router, Server Components, data fetching, and optimization.

# 🚀 Getting Started
🆕 Create Next.js 14 project with TypeScript
📁 Understand app/, public/, and config structure
✅ Configure ESLint, Prettier, and TypeScript
📦 Install Tailwind CSS and UI libraries
🔑 Set up .env.local for environment variables
⚙️ Configure next.config.js settings
📜 Learn package.json scripts

# 🗂️ App Router Architecture
📂 File-based routing with App directory
🖼️ Create layouts with layout.tsx
📄 Build pages with page.tsx
🪆 Implement nested routes with subdirectories
🔗 Dynamic routes with [slug] parameters
🎯 Catch-all segments with [...slug]
📦 Route groups with (folder) syntax
⚡ Parallel routes with @folder
🚪 Intercepting routes for modals

# ⚡ Server Components
🖥️ RSC is the default in App Router
📉 Smaller bundle size on server
🔒 Direct database access securely
⚡ Automatic code splitting and streaming
📊 Fetch data without useEffect
🔄 Pass props to client components
⏳ Use async/await in components
🔍 Better SEO with server rendering

# 🖥️ Client Components
🎯 Add "use client" for interactivity
📝 Manage state with useState
🔄 Use useEffect for side effects
👆 Handle events and form submissions
🔗 Import client into server components
💡 Keep client components small
🌐 Use React Context for global state
📚 Integrate browser-dependent libraries

# 🔄 Data Fetching Patterns
🌐 Fetch API with built-in caching
🏗️ Static rendering at build time
⚡ Dynamic rendering at request time
🔄 ISR with revalidate option
🎯 On-demand revalidation APIs
🚀 Parallel fetching with Promise.all
📋 Sequential fetching for dependencies
🌊 Streaming with Suspense
⏳ loading.tsx for loading states

# 🎨 Styling & UI
🎨 Tailwind CSS with JIT compilation
📦 CSS Modules for scoped styles
🌍 Global styles in globals.css
🧩 shadcn/ui component primitives
📱 Responsive design with breakpoints
🌙 Dark mode with CSS variables
💅 CSS-in-JS with SSR support
✨ Framer Motion animations
🔤 next/font for optimized fonts

# 🔐 Authentication & Security
🔑 NextAuth.js for OAuth
👤 Clerk or Auth0 integration
🛡️ Protected routes with middleware
🎫 JWT or database sessions
🔒 Secure environment variables
🤫 Server-only API secrets
🛡️ CSRF protection strategies
🔒 Security headers (CSP, HSTS)
⏱️ Rate limiting and validation

# 🚢 Deployment & Optimization
🚀 Deploy to Vercel with CI/CD
🖼️ next/image optimization
🔄 WebP and AVIF conversion
📊 Core Web Vitals monitoring
🌍 Edge functions for low latency
☁️ Serverless auto-scaling
📦 Bundle analyzer insights
💾 Cache-Control and CDN
👀 Preview deployments for PRs`;

export default function DemoSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        {/* Background gradient effect - decorative only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        {/* Actual content */}
        <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4">
          <Pizza className="w-6 h-6 text-rose-500 mb-4" />
          </div>
          <MotionH3 initial={{y:20,opacity:0}}
          whileInView={{y:0,opacity:1}}
          transition={{duration:0.5, delay:0.2}}
          className="font-bold text-2xl sm:px-6 max-w-2xl mx-auto px-4">
            Watch how Sommaire transforms{' '}<span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">this Next.js course PDF</span> into an
            easy-to-read summary!
          </MotionH3>
        </div>
        <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
          <MotionDiv initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.5}}>
          <SummaryViewer summary_text={DEMO_SUMMARY} />
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
