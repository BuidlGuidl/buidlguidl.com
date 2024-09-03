export function AccentShape() {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 -top-40 transform-gpu blur-3xl overflow-hidden sm:-top-80">
      <div
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
        className="relative left-[calc(50%-10rem)] aspect-[1155/678] w-[30rem] -translate-x-1/2 rotate-[20deg] bg-gradient-to-tr from-[#FF78A5] to-[#B293FE] opacity-30 sm:left-[calc(50%-50rem)] sm:w-[70rem]"
      />
    </div>
  );
}

export function AccentShapeSecondary() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-[20%] transform-gpu blur-3xl overflow-hidden sm:-top-[30%]"
    >
      <div
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
        className="relative left-[calc(50%+5rem)] aspect-[1155/678] w-[30rem] -translate-x-1/2 bg-gradient-to-tr from-[#FF78A5] to-[#B293FE] opacity-20 sm:left-[calc(50%+40rem)] sm:w-[70rem]"
      />
    </div>
  );
}

export function AccentGrid() {
  return (
    <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-base-100/70 ring-1 ring-base-100 lg:w-1/2">
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full stroke-base-100 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="100%"
            y={-1}
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M130 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <rect fill="#E1E5FE" width="100%" height="100%" strokeWidth={0} />
        <svg x="100%" y={-1} className="overflow-visible fill-base-100">
          <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
        </svg>
        <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
      </svg>
    </div>
  );
}
