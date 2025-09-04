"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

import Input from "@/components/form/Input";

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

import SuccessFrame from "./SuccessFrame";
import { prepareData } from "../lib/utils";
import CheckboxGroup from "@/components/form/CheckboxGroup";
import { WrenchIcon } from "@phosphor-icons/react/dist/ssr";
import Postcode from "@/components/form/Postcode";

export default function RegisterForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    watch,
    reset,
  } = useForm<IFormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      /*
      name: "Garage'n Stuff",
      company: "Bumper Tr",
      email_address: "info@bumber.co.uk",
      mobile_phone: "07413077351",
      */
      postcode: "",
      pay_options: [],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const onValid = async (data: IFormData) => {
    setIsSubmitting(true);
    /* console.log(data, 222);
    return; */

    const dataToSend = prepareData(data);

    try {
      const result = await saveDealerships(dataToSend);
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
      <Input
        icon={UserIcon}
        label="Name"
        {...register("name")}
        error={errors?.name?.message}
        isValid={!errors.name && watch("name")?.length > 0}
      />
      <Input
        icon={BuildingIcon}
        label="Company"
        {...register("company")}
        error={errors.company?.message}
        isValid={!errors.company && watch("company")?.length > 0}
      />
      <Input
        icon={DeviceMobileCameraIcon}
        label="Mobile phone number"
        {...register("mobile_phone")}
        error={errors.mobile_phone?.message}
        placeholder="10 digits, starts with 07xx"
        isValid={!errors.mobile_phone && watch("mobile_phone")?.length > 0}
      />
      <Input
        icon={EnvelopeSimpleIcon}
        label="Email address"
        {...register("email_address")}
        error={errors.email_address?.message}
        placeholder="example@somewhere.com"
        isValid={!errors.email_address && watch("email_address")?.length > 0}
      />

      <Controller
        name="postcode"
        control={control}
        render={({ field }) => (
          <Postcode
            value={field.value}
            onChange={field.onChange}
            placeholder="e.g. N61BA"
            error={errors.postcode?.message}
            isValid={!errors.postcode && watch("postcode")?.length > 0}
          />
        )}
      />

      <CheckboxGroup
        title="What services are you interested in?"
        desc="Please select the services you're interested in offering your
          customers"
        options={[
          { label: "PayLater", value: "pay_later" },
          { label: "PayNow", value: "pay_now" },
        ]}
        icon={WrenchIcon}
        error={errors.pay_options?.message}
        isValid={!errors.pay_options && watch("pay_options")?.length > 0}
        {...register("pay_options")}
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
    <SuccessFrame />
  );
}
