export async function generateFromAPI(prompt) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?prompt=${encodeURIComponent(prompt)}`, {
    method: "POST",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    },
  });

  if (res.status === 401) {
    return { error: "Credits expired or invalid key! Please recharge 🔋💸" };
  }

  if (!res.ok) {
    const err = await res.text();
    return { error: `Server error: ${err}` };
  }

  const data = await res.json();
  return { response: data.response };
}
