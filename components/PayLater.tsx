import { payLaterGoodies } from "@/app/static/payLater";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import CustomLink from "./CustomLink";

interface ICoolListItem {
  title: string;
  desc: string;
  order: number;
}

function CoolListItem({ title, desc, order }: ICoolListItem) {
  return (
    <li className="flex gap-2 mb-6 last:mb-0">
      <div className="number size-6 shrink-0 border border-myBlack rounded-full text-center text-sm/none py-1 font-bold bg-myOrange">
        {order}
      </div>
      <div className="text-base/normal">
        <h3 className="font-bold">{title}</h3>
        <p>{desc}</p>
      </div>
    </li>
  );
}

/*  */

export default function PayLater() {
  return (
    <section className="wrapper py-10 sm:py-14 lg:py-18 flex items-center">
      <div className="left space-y-6 flex-[12]">
        <div>
          <div className="relative h-[19px] aspect-[126/32]">
            <Image src="/Logomark.svg" alt="Bumper Logomark" fill />
          </div>
          <h2 className="text-[50px] leading-[52px] lg:text-[58px] lg:leading-[60px] font-oswald font-bold">
            PAYLATER
          </h2>
        </div>
        {/* mobile only */}
        {/* TODO :: tablet view */}
        <div className="block sm:hidden relative w-2/3 mx-auto aspect-[1474/2040]">
          <Image
            src="/payLater-visual@2x.webp"
            alt="Bumper Paylater: No risk to your business and customers"
            fill
          />
        </div>
        {/* mobile only */}
        <p className="text-lg/normal lg:text-myXl">
          Give customers more flexibility at checkout, online and in store. Let
          them spread the cost with interest-free monthly payments.
        </p>
        <div className="text-myOrange text-[28px] leading-[40px] lg:text-my2xl font-bold tracking-tight">
          <p>No risk to your business.</p>
          <p>No worries for your customers.</p>
        </div>
        <p className="text-base/normal font-bold">It&apos;s as simple as:</p>
        <ul className="pb-6">
          {payLaterGoodies.map((item, i) => (
            <CoolListItem
              title={item.title}
              desc={item.description}
              order={i + 1}
              key={item.title}
            />
          ))}
        </ul>
        <CustomLink
          href="/register"
          className="h-12 sm:h-14 text-base/normal lg:text-myXl pl-7 pr-3.5 lg:px-10"
        >
          <span>Register your interest</span>
          <ArrowRightIcon size={24} weight="bold" />
        </CustomLink>
      </div>
      <div className="flex-1 hidden sm:block" />
      <div className="flex-[10] hidden sm:block">
        <div className="relative w-full aspect-[1474/2040]">
          <Image
            src="/payLater-visual@2x.webp"
            alt="Bumper Paylater: No risk to your business and customers"
            fill
          />
        </div>
      </div>
    </section>
  );
}
