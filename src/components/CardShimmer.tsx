const CardShimmer = () => {
  return (
    <div className="flex w-[300px] animate-pulse items-center justify-between gap-5 rounded-md border-2 border-zinc-800 px-4 py-2 hover:cursor-pointer hover:bg-zinc-900/95 sm:w-[400px]">
      <div className="flex flex-col gap-2 text-sm font-semibold text-zinc-500 sm:text-lg">
        <p className="h-4 w-32 sm:w-44 rounded-md bg-zinc-700"></p>
        <h2 className="h-4 w-24 sm:w-32 rounded-md bg-zinc-700"></h2>
        <p className="h-4 w-24 sm:w-32 rounded-md bg-zinc-700"></p>
        <p className="h-4 w-16 sm:w-24 rounded-md bg-zinc-700"></p>
        <p className="h-4 w-16 sm:w-24 rounded-md bg-zinc-700"></p>
      </div>
      <div className="flex size-28 items-center justify-center rounded-full border-2 border-zinc-400 p-1 sm:size-32">
        <div className="size-24 rounded-full bg-zinc-700 sm:size-28"></div>
      </div>
    </div>
  );
};

export default CardShimmer;
