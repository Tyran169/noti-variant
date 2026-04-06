/** biome-ignore-all lint/a11y/useValidAnchor: use for demo purposes only */
import {
  CheckCircle2Icon,
  CircleEllipsisIcon,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertDemo() {
  return (
    <div className="grid w-full place-items-center gap-4">
      <Alert variant="default" className="max-w-md">
        <CircleEllipsisIcon />
        <AlertTitle>
          Check new <a className="cursor-pointer">updates</a>
        </AlertTitle>
        <AlertDescription>
          We have released version 2.0 of our app. Click{" "}
          <a className="cursor-pointer">the button</a> below to see what&apos;s
          new.
        </AlertDescription>
      </Alert>
      <Alert variant="info" className="max-w-md">
        <InfoIcon />
        <AlertTitle>
          New <a className="cursor-pointer">feature</a> available
        </AlertTitle>
        <AlertDescription>
          We&apos;ve added dark mode support. You can{" "}
          <a className="cursor-pointer">enable it</a> in your account settings.
        </AlertDescription>
      </Alert>
      <Alert variant="success" className="max-w-md">
        <CheckCircle2Icon />
        <AlertTitle>
          <a className="cursor-pointer">Payment</a> successful
        </AlertTitle>
        <AlertDescription>
          Your payment of $29.99 has been processed.{" "}
          <a className="cursor-pointer">A receipt</a> has been sent to your
          email address.
        </AlertDescription>
      </Alert>
      <Alert variant="warning" className="max-w-md">
        <TriangleAlertIcon />
        <AlertTitle>
          <a className="cursor-pointer">Storage</a> almost full
        </AlertTitle>
        <AlertDescription>
          Your storage is almost full. Please consider deleting{" "}
          <a className="cursor-pointer">some files</a> or upgrading your plan.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive" className="max-w-md">
        <OctagonXIcon />
        <AlertTitle>
          <a className="cursor-pointer">Account</a> suspended
        </AlertTitle>
        <AlertDescription>
          Your account has been suspended due to{" "}
          <a className="cursor-pointer">suspicious activity</a>. Please contact
          support for more information.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive-text" className="max-w-md">
        <OctagonXIcon />
        <AlertTitle>
          <a className="cursor-pointer">Account</a> suspended
        </AlertTitle>
        <AlertDescription>
          Your account has been suspended due to{" "}
          <a className="cursor-pointer">suspicious activity</a>. Please contact
          support for more information.
        </AlertDescription>
      </Alert>
    </div>
  );
}
