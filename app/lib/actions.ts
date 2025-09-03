"use server";

import { IDealership } from "./types";
import { revalidateTag } from "next/cache";

interface IApiResponse {
  success: boolean;
  data: IDealership[];
  error?: string;
}

function wait(secs: number) {
  return new Promise((resolve) => setTimeout(resolve, secs * 1000));
}

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://your-app.vercel.app"
    : "http://localhost:3000";

export async function getDealerships(
  config?: null | { delayInSecs: number }
): Promise<IApiResponse> {
  try {
    const res = await fetch(baseUrl + "/api/dealership", {
      next: {
        revalidate: 60,
        tags: ["dealerships_list"], // cache tag
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    await wait(config ? config.delayInSecs : 0);
    return data;
  } catch (error) {
    console.error("Failed to fetch dealerships:", error);
    return {
      success: false,
      data: [],
      error: "Failed to load dealerships_list",
    };
  }
}

export async function saveDealerships(data: FormData) {
  try {
    const formDataObj = {
      name: data.get("name") as string,
      company: data.get("company") as string,
      mobile_phone: data.get("mobile_phone") as string,
      email_address: data.get("email_address") as string,
      /* postcode: data.get("postcode") as string,
      pay_later: data.get("pay_later") as string,
      pay_now: data.get("pay_now") as string, */
    };

    // API endpoint'e POST request gönder
    const response = await fetch(baseUrl + "/api/dealership", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObj),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      revalidateTag("dealerships_list");

      return {
        success: true,
        message: "Data saved successfully!",
        data: result.data,
      };
    } else {
      throw new Error(result.error || "Failed to save data");
    }
  } catch (error) {
    console.error("Error saving dealerships:", error);

    return {
      success: false,
      message: "An error occurred while saving data",
      data: null,
    };
  }
}
