"use client";


const OverviewShimmer = () => {
  return (
    <div className="flex flex-1 flex-col gap-7 self-auto rounded-lg border-[0.5px] border-zinc-800 bg-[#1B1816] p-8 md:p-2 lg:self-stretch lg:p-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-1 justify-between">
          <h2 className="h-8 w-32 animate-pulse rounded-lg bg-zinc-800"></h2>
          <div className="flex items-center justify-center gap-3 text-sm text-zinc-400">
            <div className="flex items-center justify-center gap-2">
              <div className="h-6 w-14 animate-pulse rounded-lg bg-zinc-800"></div>
              <div className="h-6 w-14 animate-pulse rounded-lg bg-zinc-800" />
            </div>
          </div>
        </div>
        <div className="m-auto w-full text-sm lg:w-[90%] lg:text-lg">
          <ul className="flex flex-col justify-center gap-3">
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <div className="size-5 animate-pulse rounded-lg bg-zinc-800" />{" "}
                <span className="h-6 w-32 animate-pulse rounded-lg bg-zinc-800"></span>
              </span>
              <span className="h-6 w-20 animate-pulse rounded-lg bg-zinc-800 text-right"></span>
            </li>
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <div className="size-5 animate-pulse rounded-lg bg-zinc-800" />{" "}
                <span className="h-6 w-32 animate-pulse rounded-lg bg-zinc-800"></span>
              </span>
              <span className="h-6 w-20 animate-pulse rounded-lg bg-zinc-800 text-right"></span>
            </li>
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <div className="size-5 animate-pulse rounded-lg bg-zinc-800" />{" "}
                <span className="h-6 w-32 animate-pulse rounded-lg bg-zinc-800"></span>
              </span>
              <span className="h-6 w-20 animate-pulse rounded-lg bg-zinc-800 text-right"></span>
            </li>
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <div className="size-5 animate-pulse rounded-lg bg-zinc-800" />{" "}
                <span className="h-6 w-32 animate-pulse rounded-lg bg-zinc-800"></span>
              </span>
              <span className="h-6 w-20 animate-pulse rounded-lg bg-zinc-800 text-right"></span>
            </li>
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <div className="size-5 animate-pulse rounded-lg bg-zinc-800" />{" "}
                <span className="h-6 w-32 animate-pulse rounded-lg bg-zinc-800"></span>
              </span>
              <span className="h-6 w-20 animate-pulse rounded-lg bg-zinc-800 text-right"></span>
            </li>
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <div className="size-5 animate-pulse rounded-lg bg-zinc-800" />{" "}
                <span className="h-6 w-32 animate-pulse rounded-lg bg-zinc-800"></span>
              </span>
              <span className="h-6 w-20 animate-pulse rounded-lg bg-zinc-800 text-right"></span>
            </li>
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <div className="size-5 animate-pulse rounded-lg bg-zinc-800" />{" "}
                <span className="h-6 w-32 animate-pulse rounded-lg bg-zinc-800"></span>
              </span>
              <span className="flex flex-col gap-1 text-right">
                <span className="h-3 w-20 animate-pulse rounded-lg bg-zinc-800"></span>
                <div className="h-3 w-20 animate-pulse rounded-lg bg-zinc-800"></div>
              </span>
            </li>
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <div className="size-5 animate-pulse rounded-lg bg-zinc-800" />{" "}
                <span className="h-6 w-32 animate-pulse rounded-lg bg-zinc-800"></span>
              </span>
              <span className="flex flex-col gap-1 text-right">
                <span className="h-3 w-20 animate-pulse rounded-lg bg-zinc-800"></span>
                <div className="h-3 w-20 animate-pulse rounded-lg bg-zinc-800"></div>
              </span>
            </li>
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <div className="size-5 animate-pulse rounded-lg bg-zinc-800" />{" "}
                <span className="h-6 w-32 animate-pulse rounded-lg bg-zinc-800"></span>
              </span>

              <span className="flex gap-3 text-right font-semibold text-zinc-200">
                <span className="h-6 w-20 animate-pulse rounded-lg bg-zinc-800"></span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="space-y-5">
        <div className="mx-auto flex w-full items-center justify-between lg:w-[70%]">
          <h2 className="h-8 w-32 animate-pulse rounded-lg bg-zinc-800"></h2>
          <div className="size-7 animate-pulse rounded-full bg-zinc-800"></div>
        </div>

        <div className="mx-auto flex w-full justify-between lg:w-[70%]">
          <div className="h-32 w-full animate-pulse rounded-lg bg-zinc-800"></div>
        </div>

        <div className="mx-auto flex w-full justify-center lg:w-[70%]">
          <div className="h-16 w-full animate-pulse rounded-lg bg-zinc-800 p-2 px-1">
            <div className="size-6 animate-pulse rounded-lg bg-zinc-800" />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewShimmer;
