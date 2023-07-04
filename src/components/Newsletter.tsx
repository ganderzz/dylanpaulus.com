import { useState } from "preact/hooks";

export const Newsletter = () => {
  const [result, setResult] = useState<{
    type: "error" | "data";
    payload: any;
  } | null>(null);

  const subscribe = async (e: any) => {
    e.preventDefault();

    const email = e.target.email_address.value;

    try {
      const response = await fetch(
        `https://api.convertkit.com/v3/forms/4969570/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            email,
            api_key: "hJ1mszvajxKczmRZaPf7Bg",
          }),
        }
      );

      if (response.status < 300) {
        setResult({ type: "data", payload: await response.json() });
      }
    } catch (error) {
      setResult({ type: "error", payload: error });
    }
  };

  if (result?.type === "data") {
    return (
      <div class="text-black dark:text-white flex flex-col items-center">
        <h2>💌</h2>
        <h4 class="m-0">Thanks for subscribing!</h4>
        <p>You'll receive a confirmation email soon.</p>
      </div>
    );
  }

  return (
    <form
      class="text-black dark:text-white mt-10 py-10 w-full border-t-2 border-b-2 dark:border-slate-700 border-slate-100"
      onSubmit={subscribe}>
      <div class="flex flex-col items-center">
        <div class="text-center lg:text-left">
          <h4 class="m-0 mb-1">📧 Subscribe to Get Updates</h4>
          <p>
            Get updates when I post new articles! No spam. Unsubscribe at any
            time.
          </p>
        </div>

        {result?.type === "error" ? (
          <div class="bg-red-100 text-red-900 px-4 py-2 mb-2">
            There was an error subscribing to the newsletter. Please try again
            later.
          </div>
        ) : null}

        <div class="flex flex-col md:flex-row mt-2">
          <input
            class="bg-white rounded px-4 py-2 shadow-sm text-black"
            name="email_address"
            style="border: 1px solid rgba(0, 0, 0, 0.3);"
            aria-label="Email Address"
            placeholder="Email Address"
            required={true}
            type="email"
          />
          <button
            type="submit"
            class="ml-0 mt-2 md:ml-2 md:mt-0 px-6 py-2 bg-[#5755c9] hover:bg-[#4543a5] dark:bg-[#b3e3ff] dark:hover:bg-[#85afc8] transition-colors dark:text-black text-white rounded">
            Subscribe
          </button>
        </div>
      </div>
    </form>
  );
};
