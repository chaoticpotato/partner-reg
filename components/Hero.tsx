import Image from "next/image";
import Header from "./Header";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import CustomLink from "./CustomLink";

export default function Hero() {
  return (
    <div className="hero relative bg-[url(/hero_bg.webp)] bg-[25%_50%] lg:bg-center bg-cover">
      <div className="relative z-1">
        <Header />
        <section className="wrapper text-white pt-8 sm:pt-9 lg:pt-11 pb-7 sm:pb-10 lg:pb-13">
          <div className="h-6 sm:h-7 lg:h-8 aspect-[343/32] relative">
            <Image src="/TrustPilot.webp" alt="TrustPilot Excellent" fill />
          </div>

          <h1 className="pt-6 pb-1 lg:pt-8 lg:pb-4 font-oswald text-[38px] leading-[38px] lg:text-[77px] lg:leading-[80px] font-bold">
            BECOME A BUMPER APPROVED DEPENDABLE DEALERSHIP
          </h1>
          <p className="text-base/normal lg:text-myXl max-w-2xl">
            Join our network of 3,000+ garages and dealerships who already offer
            Bumper to their customers.
          </p>
          <div className="mt-6 mb-3">
            <CustomLink href="/register" className="h-12 sm:h-11 pl-4 pr-3">
              <span>Register your interest</span>
              <ArrowRightIcon size={20} weight="bold" />
            </CustomLink>
          </div>
          <span className="text-base/normal">
            Already registered?{" "}
            <Link href={"#"} className="text-myGreenDark">
              Login
            </Link>
          </span>
        </section>
      </div>
      <div className="inset-0 absolute mix-blend-multiply bg-mySmoke/80 pointer-events-none" />
    </div>
  );
}
