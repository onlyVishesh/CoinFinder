const AboutCoinShimmer = () => {
  return (
    <div className="flex animate-pulse flex-col gap-7 rounded-lg border-[0.5px] border-zinc-800 bg-[#1B1816] p-8 md:p-2 lg:p-8">
      <div className="flex flex-col gap-2">
        <div className="h-6 w-full rounded-lg bg-zinc-800"></div>
        <div className="h-6 w-full rounded-lg bg-zinc-800"></div>
        <div className="h-6 w-[70%] rounded-lg bg-zinc-800"></div>
      </div>
      <div className="flex items-start gap-2">
        <h2 className="h-6 w-20 rounded-lg bg-zinc-800"> </h2>
        <div className="flex flex-wrap gap-2">
          <a className="h-6 w-20 rounded-lg bg-zinc-800"></a>
          <a className="h-6 w-20 rounded-lg bg-zinc-800"></a>
          <a className="h-6 w-20 rounded-lg bg-zinc-800"></a>
          <a className="h-6 w-20 rounded-lg bg-zinc-800"></a>
        </div>
      </div>
    </div>
  );
};

export default AboutCoinShimmer;
