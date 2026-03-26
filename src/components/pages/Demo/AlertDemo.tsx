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
        <AlertTitle>Check new updates</AlertTitle>
        <AlertDescription>
          We have released version 2.0 of our app. Click the button below to see
          what&apos;s new.
        </AlertDescription>
      </Alert>
      <Alert variant="info" className="max-w-md">
        <InfoIcon />
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>
          We&apos;ve added dark mode support. You can enable it in your account
          settings.
        </AlertDescription>
      </Alert>
      <Alert variant="success" className="max-w-md">
        <CheckCircle2Icon />
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>
          Your payment of $29.99 has been processed. A receipt has been sent to
          your email address.
        </AlertDescription>
      </Alert>
      <Alert variant="warning" className="max-w-md">
        <TriangleAlertIcon />
        <AlertTitle>Storage almost full</AlertTitle>
        <AlertDescription>
          Your storage is almost full. Please consider deleting some files or
          upgrading your plan.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive" className="max-w-md">
        <OctagonXIcon />
        <AlertTitle>Account suspended</AlertTitle>
        <AlertDescription>
          Your account has been suspended due to suspicious activity. Please
          contact support for more information.
        </AlertDescription>
      </Alert>
    </div>
  );
}
