"use client";

import { useState } from "react";
import {
  useWidgetProps,
  useMaxHeight,
  useDisplayMode,
  useRequestDisplayMode,
  useIsChatGptApp,
} from "@/app/hooks";

export default function GreetUiPage() {
  const toolOutput = useWidgetProps<{
    name?: string;
  }>();
  const maxHeight = useMaxHeight() ?? undefined;
  const displayMode = useDisplayMode();
  const requestDisplayMode = useRequestDisplayMode();
  const isChatGptApp = useIsChatGptApp();
  const [copied, setCopied] = useState(false);

  const handleCopyName = () => {
    if (!toolOutput?.name) return;
    navigator.clipboard.writeText(toolOutput.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="font-sans bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4"
      style={{
        maxHeight: maxHeight ? `${maxHeight}px` : "100vh",
        height: displayMode === "fullscreen" ? (maxHeight ? `${maxHeight}px` : "100vh") : "auto",
        minHeight: maxHeight ? `${maxHeight}px` : "100vh",
        overflow: "auto",
      }}
    >
      {displayMode !== "fullscreen" && (
        <button
          aria-label="Enter fullscreen"
          className="fixed top-4 right-4 z-50 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-lg ring-1 ring-slate-900/10 dark:ring-white/10 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          onClick={() => requestDisplayMode("fullscreen")}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        </button>
      )}

      {!isChatGptApp && (
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-3 mb-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
              This greeting interface is designed to work within ChatGPT.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {!toolOutput?.name ? (
          <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-8">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-500 mb-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <p className="text-slate-600 dark:text-slate-300">No name provided</p>
            </div>
          </section>
        ) : (
          <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-12">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 012.689 6.022m12.318 0c.768.975 1.431 1.974 1.831 3m-6.117-6.022a300.672 300.672 0 01-5.814 0 m5.814 0a23.805 23.805 0 015.814 0M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Hello, {toolOutput.name}! 👋
                </h1>
                <p className="text-lg text-blue-100">
                  Welcome to our interactive greeting interface
                </p>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-slate-700/50 dark:to-slate-700/30 rounded-lg p-6 border border-sky-200 dark:border-slate-600">
                  <div className="text-3xl mb-3">😊</div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Friendly</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    We're here to help and support you every step of the way
                  </p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-slate-700/50 dark:to-slate-700/30 rounded-lg p-6 border border-emerald-200 dark:border-slate-600">
                  <div className="text-3xl mb-3">⚡</div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Fast</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Quick and efficient service delivery for your needs
                  </p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-700/50 dark:to-slate-700/30 rounded-lg p-6 border border-amber-200 dark:border-slate-600">
                  <div className="text-3xl mb-3">✨</div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Reliable</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Consistent and dependable results you can trust
                  </p>
                </div>
              </div>

              <div className="bg-sky-50 dark:bg-slate-700/50 border border-sky-200 dark:border-slate-600 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Your Information</h2>
                <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Name</p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">{toolOutput.name}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyName}
                    className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Thanks for visiting! We're excited to work with you, {toolOutput.name}. 🚀
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
