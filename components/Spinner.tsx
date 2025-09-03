import { CircleNotchIcon } from "@phosphor-icons/react/ssr";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center p-8">
      <CircleNotchIcon size={32} weight="bold" className="animate-spin text-myOrange" />
      <span className="ml-2 uppercase opacity-70 text-sm font-medium text-white">Loading</span>
    </div>
  )
}