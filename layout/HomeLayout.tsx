import React, { ReactNode } from "react";
import useUser from "hook/useUser";
import { useRouter } from "next/router";
import Link from "next/link";
interface LayoutProps {
  children: ReactNode;
  path?: string;
}

const HomeLayout = ({ children, path }: LayoutProps) => {
  const router = useRouter();
  const { user, isLoading } = useUser({
    redirectTo: "/log-in",
  });
  const currentPath = router.pathname;
  return (
    <div>
      <header className="h-[50px] px-4 py-[10px] flex border-b-[rgba(163,163,163,0.2)] border-b sticky top-0 w-full backdrop-blur-[12px]">
        <div className="flex mr-6">
          <div className="w-[30px] h-[30px] bg-blue-300 rounded-full" />
        </div>
        <div className="grow items-center flex py-[2px] text-lg font-semibold">
          <h1>Home</h1>
        </div>
      </header>
      {children}
      <nav className="fixed bottom-0 h-[3.5rem] border-t-[rgba(163,163,163,0.2)] border-t w-full flex items-center justify-around">
        <Link href="/">
          <div className="">
            {currentPath === path ? (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-7 h-7 fill-current"
              >
                <g>
                  <path d="M22.58 7.35L12.475 1.897c-.297-.16-.654-.16-.95 0L1.425 7.35c-.486.264-.667.87-.405 1.356.18.335.525.525.88.525.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398c.485.263 1.092.082 1.354-.404.263-.486.08-1.093-.404-1.355zM12 15.435c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25 3.25 1.455 3.25 3.25-1.455 3.25-3.25 3.25z"></path>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-7 h-7 fill-current"
              >
                <g>
                  <path d="M22.46 7.57L12.357 2.115c-.223-.12-.49-.12-.713 0L1.543 7.57c-.364.197-.5.652-.303 1.017.135.25.394.393.66.393.12 0 .243-.03.356-.09l.815-.44L4.7 19.963c.214 1.215 1.308 2.062 2.658 2.062h9.282c1.352 0 2.445-.848 2.663-2.087l1.626-11.49.818.442c.364.193.82.06 1.017-.304.196-.363.06-.818-.304-1.016zm-4.638 12.133c-.107.606-.703.822-1.18.822H7.36c-.48 0-1.075-.216-1.178-.798L4.48 7.69 12 3.628l7.522 4.06-1.7 12.015z"></path>
                  <path d="M8.22 12.184c0 2.084 1.695 3.78 3.78 3.78s3.78-1.696 3.78-3.78-1.695-3.78-3.78-3.78-3.78 1.696-3.78 3.78zm6.06 0c0 1.258-1.022 2.28-2.28 2.28s-2.28-1.022-2.28-2.28 1.022-2.28 2.28-2.28 2.28 1.022 2.28 2.28z"></path>
                </g>
              </svg>
            )}
          </div>
        </Link>
        <Link href="/compose">
          <a className="">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-7 h-7 fill-current"
            >
              <g>
                <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"></path>
              </g>
            </svg>
          </a>
        </Link>
      </nav>
    </div>
  );
};

export default HomeLayout;
