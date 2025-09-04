import clsx from "clsx";
import Link from "next/link";
import { ComponentProps } from "react";

interface ICustomLink extends ComponentProps<typeof Link> {
  className?: string;
}

export default function CustomLink({ className, ...rest }: ICustomLink) {
  return (
    <Link className={clsx("myLink", className)} {...rest} />
  );
}
