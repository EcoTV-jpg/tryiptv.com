import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group flex min-h-11 items-center gap-3" aria-label="TryIPTV homepage">
      <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg border border-primary/25 bg-primary/[0.07] transition-colors group-hover:bg-primary/[0.12]">
        <Image src="/brand-logo-square.png" alt="" width={28} height={28} loading="eager" className="h-7 w-7 object-contain" />
      </span>
      <strong className="font-headline text-lg font-semibold">
        Try<span className="text-primary">IPTV</span>
      </strong>
    </Link>
  );
}
