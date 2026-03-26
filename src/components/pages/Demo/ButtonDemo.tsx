import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-4">
      <Button variant="default" className="min-w-25">Default</Button>
      <Button variant="info" className="min-w-25">Info</Button>
      <Button variant="success" className="min-w-25">Success</Button>
      <Button variant="warning" className="min-w-25">Warning</Button>
      <Button variant="secondary" className="min-w-25">Secondary</Button>
      <Button variant="outline" className="min-w-25">Outline</Button>
      <Button variant="destructive" className="min-w-25">Destructive</Button>
      <Button variant="ghost" className="min-w-25">Ghost</Button>
      <Button variant="link" className="min-w-25">Link</Button>
    </div>
  );
}
