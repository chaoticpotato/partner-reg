import Header from "@/components/Header";
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import RegisterForm from "./RegisterForm";

export const metadata = {
  title: 'Register | Bumper',
  description: 'Sign up your dealership and offer your customers interest free finance on car repairs, services, accessories and parts by signing up to Bumper.',
};


export default function Register() {
  return (
    <main className="bg-mySmoke min-h-screen">
      <Header />
      <div className="wrapper max-w-[50rem] py-6 sm:py-9 lg:py-11.5">
        <div className="px-[3px] flex flex-col gap-3 lg:gap-5 mb-3 lg:mb-5">
          <Link href="/" className="block self-start"><ArrowLeftIcon size={36} className="block text-white -ml-1" /></Link>
          <h1 className="font-bold text-2xl/normal md:text-3xl/normal lg:text-my4xl text-white">
            Join our network
          </h1>
          <div className="text-white tracking-tight">
            <p>Offer <strong>PayLater</strong> to split servicing and repair work into monthly instalments - interest-free.</p>
            <p>Use <strong>PayNow</strong> to take secure payments online.</p>
          </div>
        </div>

        <section className="bg-white rounded-[30px] sm:rounded-[40px] px-4 py-6 sm:p-[36px] md:p-[45px] border border-myBlack">
          <div className="text-myXl mb-5">
            <h2 className="font-bold">Join our network</h2>
            <p>Free to join, no monthly fees</p>
          </div>
          <RegisterForm />
        </section>
      </div>
    </main>
  )
}
