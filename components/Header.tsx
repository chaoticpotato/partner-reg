import Image from "next/image";
import Link from "next/link";
import { SignInIcon } from "@phosphor-icons/react/ssr";
import CustomLink from "./CustomLink";

export default function Header() {
  return (
    <header className="bg-myOrange text-black rounded-b-2xl border-b border-myBlack">
      <div className="bg-black text-white rounded-b-2xl">
        <div className="wrapper h-[44px] flex gap-2 items-center">
          <div className="inline-flex font-medium">
            <Link href="#" className="tab-link isActive">
              For business
            </Link>
            <div className="bg-[#545454] mx-6 w-px" />
            <Link href="#" className="tab-link">
              For drivers
            </Link>
          </div>
          <CustomLink
            href="/list"
            className="rounded h-7 px-3 text-sm ml-auto border-white"
          >
            <span>Partners</span>
          </CustomLink>
          <Link
            href="#"
            className="hidden sm:inline-flex items-center gap-2 border border-white h-7 rounded pl-3 pr-2 text-sm"
          >
            <span>Partner login</span>
            <SignInIcon size={16} weight="bold" />
          </Link>
        </div>
      </div>
      <div>
        <div className="wrapper py-3 flex items-center">
          <Link href="/" className="block">
            <div className="relative h-7 lg:h-8 aspect-[126/32] hover:shadow-xl transition-all">
              <Image src="/Logomark.svg" alt="Bumper Logomark" fill priority />
            </div>
          </Link>
          <span className="mr-auto mx-2 font-bold text-sm lg:text-base">
            for business
          </span>
          <CustomLink
            href="/register"
            className="rounded h-7 lg:h-8 px-3 text-sm lg:text-base"
          >
            Register
          </CustomLink>
        </div>
      </div>
    </header>
  );
}
