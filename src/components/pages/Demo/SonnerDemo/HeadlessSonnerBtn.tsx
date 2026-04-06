"use client";

import { toast } from "sonner";

/** I recommend abstracting the toast function
 *  so that you can call it without having to use toast.custom everytime. */
function customToast(toastOptions: Omit<ToastProps, "id">) {
  return toast.custom((id) => (
    <Toast
      id={id}
      title={toastOptions.title}
      description={toastOptions.description}
      button={{
        label: toastOptions.button.label,
        onClick: toastOptions.button.onClick
      }}
    />
  ));
}

/** A fully custom toast that still maintains the animations and interactions. */
function Toast(props: ToastProps) {
  const { title, description, button, id } = props;

  return (
    <div className="flex w-full items-center rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5 md:max-w-[364px]">
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <p className="font-medium text-gray-900 text-sm">{title}</p>
          <p className="mt-1 text-gray-500 text-sm">{description}</p>
        </div>
      </div>
      <div className="ml-5 shrink-0 rounded-md font-medium text-indigo-600 text-sm hover:text-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <button
          type="button"
          className="rounded bg-indigo-50 px-3 py-1 font-semibold text-indigo-600 text-sm hover:bg-indigo-100"
          onClick={() => {
            button.onClick();
            toast.dismiss(id);
          }}
        >
          {button.label}
        </button>
      </div>
    </div>
  );
}

export default function HeadlessSonnerBtn() {
  return (
    <button
      type="button"
      className="relative flex h-10 w-24 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#FCF8F7] px-4 font-medium text-sm shadow-sm transition-all hover:bg-[#f7f4f3] dark:bg-[#161615] dark:text-[#FCF8F7] dark:hover:bg-[#1A1A19]"
      onClick={() => {
        customToast({
          title: "This is a headless toast",
          description:
            "You have full control of styles and jsx, while still having the animations.",
          button: {
            label: "Reply",
            onClick: () => console.log("Custom toast button clicked!")
          }
        });
      }}
    >
      Headless
    </button>
  );
}

interface ToastProps {
  id: string | number;
  title: string;
  description: string;
  button: {
    label: string;
    onClick: () => void;
  };
}
