import React from "react";
import Image from "next/image";

// MDXComponents type definition
// - Strongly typed mapping for intrinsic HTML tags
// - Allows arbitrary custom MDX components through index signature
type MDXComponentsMap = {
  [K in keyof JSX.IntrinsicElements]?: React.ComponentType<JSX.IntrinsicElements[K]>;
} & { 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: React.ComponentType<any>;
};


// Export a plain object (NOT a client hook) so it can be used on the server
export const mdxComponents: MDXComponentsMap = {
    // Headings
    h1: (p: JSX.IntrinsicElements["h1"]) => (
      <h1 className="text-3xl font-bold mt-10 mb-6" {...p} />
    ),
    h2: (p: JSX.IntrinsicElements["h2"]) => (
      <h2 className="text-2xl font-semibold mt-8 mb-4" {...p} />
    ),

    // Text
    p: (p: JSX.IntrinsicElements["p"]) => (
      <p className="leading-7 my-4 text-gray-200" {...p} />
    ),
    a: (p: JSX.IntrinsicElements["a"]) => (
      <a className="underline hover:opacity-70" {...p} />
    ),
    strong: (p: JSX.IntrinsicElements["strong"]) => (
      <strong className="font-semibold text-gray-100" {...p} />
    ),
    em: (p: JSX.IntrinsicElements["em"]) => (
      <em className="italic text-gray-200" {...p} />
    ),
    hr: (p: JSX.IntrinsicElements["hr"]) => (
      <hr className="my-8 border-t border-white/10" {...p} />
    ),

    // image, gif, video
    img: (p: JSX.IntrinsicElements["img"]) => {
        const src = p.src ?? "";
        const isAnimated = src.endsWith(".gif");
        const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");

        // If it's a video file, use <video> instead of <Image>
        if (isVideo) {
            return (
            <video
                controls
                playsInline
                loop
                muted
                autoPlay
                className="my-6 rounded-xl border border-white/10 max-w-full h-auto"
            >
                <source src={src} type={src.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
                Your browser does not support the video tag.
            </video>
            );
        }

        // For images
        return (
            <span className="block my-6 rounded-xl border border-white/10 overflow-hidden">
            <Image
                src={src}
                alt={p.alt ?? ""}
                width={Number(p.width) || 1200}
                height={Number(p.height) || 800}
                unoptimized={isAnimated}
                className="h-auto w-full"
            />
            </span>
        );
    },

    // Figure + Figcaption
    figure: (p: JSX.IntrinsicElements["figure"]) => (
      <figure
        className="my-6 rounded-xl border border-white/10 overflow-hidden"
        {...p}
      />
    ),
    figcaption: (p: JSX.IntrinsicElements["figcaption"]) => (
      <figcaption
        className="px-3 py-2 text-sm text-gray-400 bg-white/5 text-center"
        {...p}
      />
    ),

    // Code
    pre: (p: JSX.IntrinsicElements["pre"]) => (
      <pre
        className="bg-black/40 rounded-xl p-4 overflow-x-auto my-6 border border-white/10"
        {...p}
      />
    ),
    code: (p: JSX.IntrinsicElements["code"]) => (
      <code className="px-1.5 py-0.5 bg-black/30 rounded" {...p} />
    ),

    // Blockquote
    blockquote: (p: JSX.IntrinsicElements["blockquote"]) => (
      <blockquote
        className="my-6 border-l-4 border-white/20 pl-4 text-gray-300 italic"
        {...p}
      />
    ),

    // Lists
    ul: (p: JSX.IntrinsicElements["ul"]) => (
      <ul className="list-disc pl-6 my-4 space-y-2 marker:text-white/60" {...p} />
    ),
    ol: (p: JSX.IntrinsicElements["ol"]) => (
      <ol className="list-decimal pl-6 my-4 space-y-2 marker:text-white/60" {...p} />
    ),
    li: (p: JSX.IntrinsicElements["li"]) => (
      <li className="leading-7 text-gray-200" {...p} />
    ),

    // Tables
    table: (p: JSX.IntrinsicElements["table"]) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full border-collapse text-sm" {...p} />
      </div>
    ),
    thead: (p: JSX.IntrinsicElements["thead"]) => (
      <thead className="bg-white/5" {...p} />
    ),
    tbody: (p: JSX.IntrinsicElements["tbody"]) => <tbody {...p} />,
    tr: (p: JSX.IntrinsicElements["tr"]) => (
      <tr className="border-b border-white/10 last:border-0" {...p} />
    ),
    th: (p: JSX.IntrinsicElements["th"]) => (
      <th className="text-left font-semibold px-3 py-2 text-gray-100" {...p} />
    ),
    td: (p: JSX.IntrinsicElements["td"]) => (
      <td className="px-3 py-2 align-top text-gray-200" {...p} />
    ),

  };