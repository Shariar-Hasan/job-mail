"use client";
import Button from "@/components/small/Button";
import CheckboxGroup from "@/components/small/CheckboxGroup";
import tryCatch from "@/lib/tryCatch";
import { api } from "@/services/fetch/fetchService";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Option {
  label: string;
  value: string;
}

interface FormValues {
  email: string;
  topics: string[];
  stacks: string[];
  experience: string;
}

export default function HomePage() {
  const [topicOptions, setTopicOptions] = useState<Option[]>([]);
  const [stackOptions, setStackOptions] = useState<Option[]>([]);
  const [experienceOptions, setExperienceOptions] = useState<Option[]>([]);
  const [load, setLoad] = useState({
    fetching: true,
    subscribing: false,
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isDirty },
    reset,
  } = useForm<FormValues>({
    defaultValues: { email: "", topics: [], stacks: [], experience: "" },
  });

  useEffect(() => {
    setLoad((prev) => ({ ...prev, fetching: true }));
    fetch("/api/subscription-configs")
      .then((res) => res.json())
      .then((data) => {
        setTopicOptions((data.topics || []).map((t: string) => ({ label: t, value: t })));
        setStackOptions((data.stacks || []).map((s: string) => ({ label: s, value: s })));
        setExperienceOptions((data.experiences || []).map((e: string) => ({ label: e, value: e })));
      }).finally(() => {
        setLoad((prev) => ({ ...prev, fetching: false }));
      });

  }, [setValue]);


  const onSubmit = async (data: FormValues) => {
    toast.dismiss();
    setLoad((prev) => ({ ...prev, subscribing: true }));
    const { error } = await tryCatch(async () => {
      return api.post("/api/subscribe", data);
    });
    setLoad((prev) => ({ ...prev, subscribing: false }));
    if (error) {
      toast.error("Subscription failed. Please try again.");
    } else {
      toast.success("Subscribed successfully!");
      reset({ email: "", topics: [], stacks: [], experience: "" });
    }
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center p-2 md:p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8 space-y-8"
      >
        <h1 className="text-3xl font-bold text-center text-green-700 mb-2">Subscribe to Job Alerts</h1>
        <p className="text-center text-green-500 mb-4">Get the latest jobs delivered to your inbox.</p>

        {/* Email Field */}
        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required", pattern: { value: /.+@.+\..+/, message: "Invalid email" } }}
          render={({ field, fieldState }) => (
            <div>
              <label className="block text-gray-700 font-bold mb-1">Email</label>
              <input
                {...field}
                type="email"
                placeholder="Your email"
                className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 ${fieldState.error ? "border-red-500" : "border-gray-300"}`}
              />
              {fieldState.error && <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>}
            </div>
          )}
        />

        {/* Topics Field */}
        <Controller
          name="topics"
          control={control}
          rules={{ validate: (v) => v.length > 0 || "Select at least one topic" }}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              options={topicOptions}
              value={field.value}
              onChange={field.onChange}
              label="Topics of Interest"
              error={fieldState.error?.message}
              optionClass={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 '}
            />
          )}
        />

        {/* Stacks Field */}
        <Controller
          name="stacks"
          control={control}
          rules={{ validate: (v) => v.length > 0 || "Select at least one stack" }}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              options={stackOptions}
              value={field.value}
              onChange={field.onChange}
              label="Stack Preferences"
              error={fieldState.error?.message}
              optionClass={'grid grid-cols-2 md:grid-cols-3  gap-2 '}
            />
          )}
        />

        {/* Experience Field */}
        <Controller
          name="experience"
          control={control}
          rules={{ required: "Select your experience" }}
          render={({ field, fieldState }) => (
            <div>
              <label className="block text-gray-700 font-bold mb-1">Experience</label>
              <select
                {...field}
                className={`w-full border px-4 py-2 rounded text-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 ${fieldState.error ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="" className="text-gray-900">Select experience</option>
                {load.fetching ? (
                  Array.from({ length: 8 }).map((_, index) => (
                    <option key={index} className="bg-gray-300 animate-pulse text-gray-500">
                      Loading...
                    </option>
                  ))
                ) :
                  experienceOptions.map((exp) => (
                    <option key={exp.value} value={exp.value} className="text-gray-900">{exp.label}</option>
                  ))}
              </select>
              {fieldState.error && <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>}
            </div>
          )}
        />

        <Button
          type="submit"
          loading={load.subscribing}
          loadingText="Subscribing..."
          disabled={load.subscribing || !isDirty}
          className="w-full bg-green-600 text-white rounded px-4 py-2 cursor-pointer font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {load.subscribing ? "Subscribing..." : "Subscribe"}
        </Button>

      </form>
    </main>
  );
}
