import Image from "next/image";

/**
 * Centered auth card from the Figma "Lymb" auth design (node 1453:31318):
 * a 739×474 rounded card on a #111 page — narrow form on the left, a
 * dashboard preview on the right (hidden on small screens).
 */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#111111] p-4 font-sans text-white">
      <div
        className="flex w-full max-w-[739px] overflow-hidden rounded-[10px] shadow-[0px_0px_0px_1px_#0d1520,0px_0px_0px_2px_#0c0c0c]"
        style={{
          backgroundImage:
            "linear-gradient(190deg, #202427 9.72%, #232323 90.28%)",
        }}
      >
        {/* Left — form */}
        <div className="relative flex w-full items-center justify-center px-8 py-16 lg:w-[363px]">
          {/* window dots */}
          <div className="absolute left-5 top-5 flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4e4e4e]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#4e4e4e]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#4e4e4e]" />
          </div>

          <div className="w-full max-w-[274px]">{children}</div>
        </div>

        {/* Right — dashboard preview */}
        <div className="hidden p-2.5 lg:block">
          <div className="relative h-[454px] w-[354px] overflow-hidden rounded-lg">
            <Image
              src="/assets/images/auth.png"
              alt="Suite dashboard preview"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
