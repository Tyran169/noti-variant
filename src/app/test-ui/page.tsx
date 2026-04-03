export default function Page() {
  return (
    <div className="mt-5 grid min-h-screen min-w-md grid-cols-3 gap-5 p-5">
      <div className="flex flex-col gap-5">
        <div className="grid h-40 place-items-center bg-info-solid">
          <p className="text-info-solid-fg">This is the text.</p>
        </div>
        <div className="grid h-40 place-items-center bg-success-solid">
          <p className="text-success-solid-fg">This is the text.</p>
        </div>
        <div className="grid h-40 place-items-center bg-warning-solid">
          <p className="text-warning-solid-fg">This is the text.</p>
        </div>
      </div>
      {/*  */}
      <div className="flex flex-col gap-5">
        <div className="grid h-40 place-items-center border border-info-soft-border bg-info-soft">
          <p className="text-info-soft-fg">This is the text.</p>
        </div>
        <div className="grid h-40 place-items-center border border-success-soft-border bg-success-soft">
          <p className="text-success-soft-fg">This is the text.</p>
        </div>
        <div className="grid h-40 place-items-center border border-warning-soft-border bg-warning-soft">
          <p className="text-warning-soft-fg">This is the text.</p>
        </div>
      </div>
      {/*  */}
      <div className="flex flex-col gap-5">
        <div className="grid h-40 place-items-center bg-info-solid">
          <p className="text-info-solid-fg">This is the text.</p>
        </div>
        <div className="grid h-40 place-items-center bg-success-solid">
          <p className="text-success-solid-fg">This is the text.</p>
        </div>
        <div className="grid h-40 place-items-center bg-warning-solid">
          <p className="text-warning-solid-fg">This is the text.</p>
        </div>
      </div>
    </div>
  );
}
