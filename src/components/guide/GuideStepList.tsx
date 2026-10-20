export interface StepItem {
  title: string;
  description: string;
  screenshot?: {
    src?: string;
    alt?: string;
    caption?: string;
  };
}

interface GuideStepListProps {
  steps: StepItem[];
  primaryKeyword?: string;
  className?: string;
}

export function GuideStepList({
  steps,
  primaryKeyword = "Fire TV Stick",
  className,
}: GuideStepListProps) {

  return (
    <div id="setup-steps" className={`scroll-mt-28 my-10 ${className || ""}`}>
      <div className="mb-8">
        <p className="eyebrow mb-1.5">Step-by-Step Walkthrough</p>
        <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Step-by-Step Installation Guide for {primaryKeyword}
        </h2>
        <p className="mt-2 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl">
          Follow this 7-step sequence to configure your IPTV player, load channel bouquets, and verify live stream playback.
        </p>
      </div>

      <div className="relative">
        {steps.map((step, index) => {
          const stepNumber = String(index + 1).padStart(2, "0");
          const isLast = index === steps.length - 1;

          return (
            <div
              key={index}
              id={`step-${index + 1}`}
              className="group relative flex items-start gap-4 sm:gap-6 scroll-mt-28"
            >
              {/* Timeline indicator & vertical rail */}
              <div className="flex flex-col items-center self-stretch shrink-0">
                <div
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-primary/30 bg-[#07080a] text-primary font-mono text-xs font-bold shadow-[0_0_10px_rgba(0,240,120,0.06)] group-hover:border-primary/60 transition-colors"
                  aria-hidden="true"
                >
                  {stepNumber}
                </div>
                {!isLast && (
                  <div className="w-px flex-1 bg-white/[0.08] my-2 group-hover:bg-primary/20 transition-colors" />
                )}
              </div>

              {/* Step content */}
              <div className={`min-w-0 flex-1 max-w-[740px] ${isLast ? "pb-2" : "pb-8 sm:pb-11"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[10px] font-extrabold uppercase text-primary tracking-wider bg-primary/[0.08] border border-primary/20 rounded px-1.5 py-0.5">
                    STEP {stepNumber}
                  </span>
                  <h3 className="font-headline text-base sm:text-lg font-bold text-foreground">
                    {step.title}
                  </h3>
                </div>

                <div
                  className="text-xs sm:text-sm leading-relaxed text-muted-foreground space-y-2.5 [&>p]:leading-relaxed [&>ul]:space-y-1.5 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:space-y-1.5 [&>ol]:list-decimal [&>ol]:pl-5 [&>strong]:text-foreground [&>strong]:font-semibold [&>a]:text-primary [&>a]:underline [&>a]:underline-offset-4"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
