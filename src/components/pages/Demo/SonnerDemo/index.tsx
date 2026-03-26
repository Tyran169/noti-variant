import { Separator } from "@/components/ui/separator";
import HeadlessSonnerBtn from "./HeadlessSonnerBtn";
import PromiseSonnerBtn from "./PromiseSonnerBtn";
import SonnerVariants from "./SonnerVariant";

function Title({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 scroll-m-20 font-bold text-lg tracking-tight">
      {children}
    </p>
  );
}

export default function SonnerDemo() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-fit max-w-lg">
        <Title>Default Style</Title>
        <SonnerVariants />
        <Separator className="my-4 w-full" />
        <Title>Rich Colors Style</Title>
        <SonnerVariants richColors />
        <Separator className="my-4 w-full" />
        <Title>Inverted Colors Style</Title>
        <SonnerVariants invertColors />
        <Separator className="my-4 w-full" />
        <Title>Inverted Colors + Rich Colors Style</Title>
        <SonnerVariants richColors invertColors />
        <Separator className="my-4 w-full" />
        <Title>Promise Toast</Title>
        <PromiseSonnerBtn />
        <Separator className="my-4 w-full" />
        <Title>Headless Toast</Title>
        <HeadlessSonnerBtn />
      </div>
    </div>
  );
}
