/**
 * v0 by Vercel.
 * @see https://v0.app/t/yWYpaHrdyyX
 * Documentation: https://v0.app/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

export default function Component() {
  return (
    <div className="flex min-h-screen items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-4">
          <h1 className="font-bold text-4xl tracking-tighter sm:text-5xl">
            404 Page Not Found
          </h1>
          <p className="text-muted-foreground">
            Sorry, we couldn&#x27;t find the page you&#x27;re looking for.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-md border bg-popover px-8 font-medium text-sm shadow-sm transition-colors hover:bg-secondary"
          prefetch={false}
        >
          Return to website
        </Link>
      </div>
    </div>
  );
}
