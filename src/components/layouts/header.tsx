import { MoveUpRightIcon } from "lucide-react";
import { hashIdString } from "@/lib/hashIdString";
import { LightDarkToggle } from "../themes/light-dark-toggle";
import { ThemePicker } from "../themes/tweakcn-theme-picker";
import { Button } from "../ui/button";
import Logo from "./logo";

const HEADER_ID = hashIdString("main-header", { length: 32, seed: 12345 });

export function Header() {
  return (
    <>
      <header
        id={HEADER_ID}
        className="fixed top-0 right-0 left-0 z-50 border-b"
      >
        <div className="flex items-center justify-between bg-background/80 px-4 py-3 backdrop-blur-md sm:px-6 md:px-8">
          {/* Left: Logo and Title */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Logo
              width={32}
              height={32}
              className="h-8 w-8 select-none rounded-md sm:h-10 sm:w-10 sm:rounded-lg"
            />
            <h1 className="hidden font-semibold text-lg tracking-tight sm:block sm:text-xl">
              Shadcn Notification Variants
            </h1>
          </div>

          {/* Right: GitHub Button and Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemePicker />
            <Button variant="outline" size="sm" asChild className="sm:px-3">
              <a
                href="https://github.com/Tyran169/noti-variant"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sm:hidden">
                  <MoveUpRightIcon className="size-4" />
                </span>
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </Button>
            <LightDarkToggle />
          </div>
        </div>
      </header>
      {/* Derived Header Height */}
      <DerivedHeaderHeight />
    </>
  );
}

const derivedHeihtScript = `
;(function () {
  let mh = document.getElementById('${HEADER_ID}');
  if (!mh) return;
  let hs = mh.nextElementSibling;
  if (!(hs instanceof HTMLDivElement)) return;
  let uh = () => {
    hs.style.height = mh.offsetHeight + 'px';
  };
  uh();
  let ro = new ResizeObserver(uh);
  ro.observe(mh);
})();
`;

function DerivedHeaderHeight() {
  return (
    <>
      <div suppressHydrationWarning />
      <script
        dangerouslySetInnerHTML={{
          __html: derivedHeihtScript
        }}
      />
    </>
  );
}
