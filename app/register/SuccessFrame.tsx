import CustomLink from "@/components/CustomLink";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";

export default function SuccessFrame() {
  return (
    <div className="p-5 sm:p-7 bg-myGreen/30 border border-myGreen rounded-3xl -mx-2 -mb-4 lg:-m-6 lg:mt-0 flex items-start gap-3 sm:gap-0 sm:items-center justify-between flex-col sm:flex-row">
      <div>
        <h2 className="text-xl text-green-700 mb-1 font-semibold" data-cy="success-title">
          You are successfully registered.
        </h2>
        <p>You can find yourself on the list.</p>
      </div>
      <CustomLink href="/list" className="pl-5 pr-4 rounded-xl" data-cy="success-list">
        <span>Show me</span>
        <ArrowRightIcon size={20} />
      </CustomLink>
    </div>
  );
}
