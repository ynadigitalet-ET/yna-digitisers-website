const pid = "6a3bc530b755bc1d4b9a55d7";
const urls = [
  `https://va.tawk.to/v1/widget/${pid}`,
  `https://va.tawk.to/v1/property/${pid}`,
  `https://embed.tawk.to/${pid}/widget`,
];

for (const url of urls) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const text = await res.text();
    console.log(url, res.status, text.slice(0, 200));
  } catch (e) {
    console.log(url, "err", e.message);
  }
}
