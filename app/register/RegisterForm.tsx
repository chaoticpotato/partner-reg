"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { InputField } from "@/components/InputField";

import {
  UserIcon,
  BuildingIcon,
  EnvelopeSimpleIcon,
  DeviceMobileCameraIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";

import { saveDealerships } from "../lib/actions";
import { IFormData, schema } from "./schema";
import Link from "next/link";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    watch,
    reset,
  } = useForm<IFormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    /* defaultValues: {
      pay_later: false,
      pay_now: false,
    }, */
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const onValid = async (data: IFormData) => {
    setIsSubmitting(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const result = await saveDealerships(formData);
      if (result.success) {
        setIsRegistered(true);
        reset();
      } else {
        toast.error("An error has occured. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return !isRegistered ? (
    <form onSubmit={handleSubmit(onValid)} className="space-y-6 lg:space-y-8">
      <InputField
        icon={UserIcon}
        label="Name"
        {...register("name")}
        error={errors?.name?.message}
        isValid={!errors.name && watch("name")?.length > 0}
      />
      <InputField
        icon={BuildingIcon}
        label="Company"
        {...register("company")}
        error={errors.company?.message}
        isValid={!errors.company && watch("company")?.length > 0}
      />
      <InputField
        icon={DeviceMobileCameraIcon}
        label="Mobile phone number"
        {...register("mobile_phone")}
        error={errors.mobile_phone?.message}
        placeholder="10 digits, starts with 07xx"
        isValid={!errors.mobile_phone && watch("mobile_phone")?.length > 0}
      />
      <InputField
        icon={EnvelopeSimpleIcon}
        label="Email address"
        {...register("email_address")}
        error={errors.email_address?.message}
        placeholder="example@somewhere.com"
        isValid={!errors.email_address && watch("email_address")?.length > 0}
      />
      <button
        type="submit"
        className="cta-button w-full justify-center"
        disabled={isSubmitting || (isSubmitted && !isValid)}
      >
        <span>Register</span>
        <ArrowRightIcon size={24} />
      </button>
      <div className="text-base/normal flex items-center justify-center gap-1 -mt-2">
        <span>Already registered?</span>
        <Link href={"#"} className="text-myGreenDark">
          Login
        </Link>
      </div>
    </form>
  ) : (
    <div className="p-7 bg-myGreen/30 border border-myGreen rounded-3xl mt-0 -m-6 flex items-center justify-between">
      <div>
        <h2 className="text-xl text-green-700 mb-1 font-semibold">
          You are successfully registered.
        </h2>
        <p>You can find yourself on the list.</p>
      </div>
      <Link href="/list" className="myLink pl-5 pr-4 rounded-xl"><span>Show me</span><ArrowRightIcon size={20} /></Link>
    </div>
  );
}
