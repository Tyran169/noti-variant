import {
  CheckCircle2Icon,
  CircleEllipsisIcon,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon
} from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertDemo() {
  return (
    <div className="grid w-full place-items-center gap-4">
      <Alert variant="default" className="max-w-md">
        <CircleEllipsisIcon />
        <AlertTitle>
          Check new <Link href="/#alert">updates</Link>
        </AlertTitle>
        <AlertDescription>
          We have released version 2.0 of our app. Click{" "}
          <Link href="/#alert">the button</Link> below to see what&apos;s new.
        </AlertDescription>
      </Alert>
      <Alert variant="info" className="max-w-md">
        <InfoIcon />
        <AlertTitle>
          New <Link href="/#alert">feature</Link> available
        </AlertTitle>
        <AlertDescription>
          We&apos;ve added dark mode support. You can{" "}
          <Link href="/#alert">enable it</Link> in your account settings.
        </AlertDescription>
      </Alert>
      <Alert variant="success" className="max-w-md">
        <CheckCircle2Icon />
        <AlertTitle>
          <Link href="/#alert">Payment</Link> successful
        </AlertTitle>
        <AlertDescription>
          Your payment of $29.99 has been processed.{" "}
          <Link href="/#alert">A receipt</Link> has been sent to your email
          address.
        </AlertDescription>
      </Alert>
      <Alert variant="warning" className="max-w-md">
        <TriangleAlertIcon />
        <AlertTitle>
          <Link href="/#alert">Storage</Link> almost full
        </AlertTitle>
        <AlertDescription>
          Your storage is almost full. Please consider deleting{" "}
          <Link href="/#alert">some files</Link> or upgrading your plan.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive" className="max-w-md">
        <OctagonXIcon />
        <AlertTitle>
          <Link href="/#alert">Account</Link> suspended
        </AlertTitle>
        <AlertDescription>
          Your account has been suspended due to{" "}
          <Link href="/#alert">suspicious activity</Link>. Please contact
          support for more information.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive-text" className="max-w-md">
        <OctagonXIcon />
        <AlertTitle>
          <Link href="/#alert">Account</Link> suspended
        </AlertTitle>
        <AlertDescription>
          Your account has been suspended due to{" "}
          <Link href="/#alert">suspicious activity</Link>. Please contact
          support for more information.
        </AlertDescription>
      </Alert>
    </div>
  );
}
