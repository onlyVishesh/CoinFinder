"use client";

import { useEffect, useRef } from "react";

type AboutCoinProps = {
  data: {
    description: { [key: string]: string };
    links: { [key: string]: [string] | string };
  };
};

const AboutCoin = ({ data }: AboutCoinProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { description, links } = data;

  const renderLinks = () => {
    const linkElements: JSX.Element[] = [];

    if (links.homepage) {
      linkElements.push(
        <a
          key="homepage"
          href={
            Array.isArray(links.homepage) ? links.homepage[0] : links.homepage
          }
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline bg-zinc-800 px-2 py-1 rounded-lg hover:bg-zinc-700"
        >
          Website
        </a>,
      );
    }
    if (links.whitepaper) {
      linkElements.push(
        <a
          key="reddit"
          href={Array.isArray(links.whitepaper) ? links.whitepaper[0] : links.whitepaper}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline bg-zinc-800 px-2 py-1 rounded-lg hover:bg-zinc-700"
        >
          Whitepaper
        </a>,
      );
    }
    if (links.official_forum_url) {
      linkElements.push(
        <a
          key="reddit"
          href={Array.isArray(links.official_forum_url) ? links.official_forum_url[0] : links.official_forum_url || ''}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline bg-zinc-800 px-2 py-1 rounded-lg hover:bg-zinc-700"
        >
          Official Form
        </a>,
      );
    }
    if (links.repos_url?.github) {
      links.repos_url.github.forEach((repoUrl, index) => {
        linkElements.push(
          <a
            key={`github-${index}`}
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline bg-zinc-800 px-2 py-1 rounded-lg hover:bg-zinc-700"
          >
            {index === 0 ? "GitHub Repository" : `GitHub Repo ${index + 1}`}
          </a>,
        );
      });
    }
    if (links.subreddit_url) {
      linkElements.push(
        <a
          key="reddit"
          href={Array.isArray(links.subreddit_url) ? links.subreddit_url[0] : links.subreddit_url || ''}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline bg-zinc-800 px-2 py-1 rounded-lg hover:bg-zinc-700"
        >
          Reddit
        </a>,
      );
    }

    return linkElements;
  };

  useEffect(() => {
    const applyTailwindClasses = () => {
      if (contentRef.current) {
        const links = contentRef.current.querySelectorAll("a");
        links.forEach((link) => {
          link.classList.add("text-blue-500", "hover:underline");
        });
      }
    };

    applyTailwindClasses();
  }, [data]);

  return (
    <div className="flex flex-col gap-7 rounded-lg border-[0.5px] border-zinc-800 bg-[#1B1816] p-8 md:p-2 lg:p-8">
      <div
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: description.en }}
        className="text-md lg:text-lg"
      />
      <div className="flex gap-2 items-start">
        <h2 className="text-lg font-bold lg:text-xl text-nowrap">Links : </h2>
        <div className="flex gap-2 flex-wrap">{renderLinks()}</div>
      </div>
    </div>
  );
};

export default AboutCoin;
