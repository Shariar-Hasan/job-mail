"use client";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface FormValues {
  email: string;
  topics: string[];
}

export default function HomePage() {
  const [topics, setTopics] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: { email: "", topics: [] },
  });

  const selected = watch("topics");

  useEffect(() => {
    fetch("/api/subscription-configs")
      .then((res) => res.json())
      .then((data) => {
        setTopics(data.topics || []);
        setValue("topics", data.topics || []); // Select all by default
      });
  }, [setValue]);

  const onSubmit = async (data: FormValues) => {
    setSuccess(null);
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSuccess("Subscribed successfully!");
      reset({ email: "", topics });
    } else {
      setSuccess("Subscription failed. Please try again.");
    }
  };

  const allSelected = selected.length === topics.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Subscribe to Job Alerts
        </h1>
        <p className="text-center text-gray-500 mb-4">
          Get the latest jobs delivered to your inbox.
        </p>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /.+@.+\..+/,
                message: "Invalid email",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                placeholder="Your email"
                className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? "border-red-500" : "border-gray-300"
                  }`}
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Topics</label>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={() =>
                setValue("topics", allSelected ? [] : topics)
              }
              className="mr-2 accent-blue-600"
            />
            <span className="text-sm">Select All</span>
          </div>
          <Controller
            name="topics"
            control={control}
            rules={{
              validate: (v) =>
                v.length > 0 || "Select at least one topic",
            }}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {topics.map((topic) => (
                  <label
                    key={topic}
                    className="flex items-center text-gray-700"
                  >
                    <input
                      type="checkbox"
                      value={topic}
                      checked={field.value.includes(topic)}
                      onChange={() =>
                        field.value.includes(topic)
                          ? field.onChange(
                            field.value.filter((t: string) => t !== topic)
                          )
                          : field.onChange([...field.value, topic])
                      }
                      className="mr-2 accent-blue-600"
                    />
                    {topic}
                  </label>
                ))}
              </div>
            )}
          />
          {errors.topics && (
            <p className="text-red-500 text-sm mt-1">
              {errors.topics.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>

        {success && (
          <div
            className={`text-center mt-2 text-lg font-medium ${success.includes("success")
                ? "text-green-600"
                : "text-red-600"
              }`}
          >
            {success}
          </div>
        )}
      </form>
    </main>
  );
}
