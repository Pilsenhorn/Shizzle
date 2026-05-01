import { getCollection } from "astro:content";
import { Resvg } from "@resvg/resvg-js";
import type { APIContext } from "astro";

const cache = new Map<string, Uint8Array>();
const MAX_CACHE = 50;

export async function getStaticPaths() {
  const concerts = await getCollection("concerts");

  return concerts.map((concert) => ({
    params: { slug: concert.id },
  }));
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 3).trim()}...`;
}

function createOgSvg({
  city,
  venue,
  date,
  support,
}: {
  city: string;
  venue: string;
  date: string;
  support?: string;
}) {
  const meta = support ? `${date} - ${support}` : date;

  return `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0B0F12"/>
          <stop offset="100%" stop-color="#1A2329"/>
        </linearGradient>
        <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#E7FF5F"/>
          <stop offset="100%" stop-color="#FF6B35"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <circle cx="1060" cy="90" r="180" fill="#E7FF5F" opacity="0.08"/>
      <circle cx="100" cy="575" r="230" fill="#FF6B35" opacity="0.09"/>
      <rect x="60" y="60" width="1080" height="510" rx="34" fill="none" stroke="#FFFFFF" stroke-opacity="0.16"/>
      <rect x="60" y="60" width="220" height="8" rx="4" fill="url(#accent)"/>

      <text x="86" y="118" fill="#FFFFFF" opacity="0.68" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" letter-spacing="5">
        SHIZZLE LIVE
      </text>

      <text x="86" y="325" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="92" font-weight="800">
        ${escapeHtml(truncate(city, 24))}
      </text>

      <text x="91" y="384" fill="#FFFFFF" opacity="0.82" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="500">
        ${escapeHtml(truncate(venue, 44))}
      </text>

      <text x="86" y="526" fill="#FFFFFF" opacity="0.76" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="600">
        ${escapeHtml(truncate(meta, 62))}
      </text>

      <text x="982" y="526" fill="#FFFFFF" opacity="0.44" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700">
        shizzle.cz
      </text>
    </svg>
  `;
}

export async function GET({ params }: APIContext) {
  const slug = params.slug;

  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  const cached = cache.get(slug);
  if (cached) {
    return new Response(cached, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const concerts = await getCollection("concerts");
  const concert = concerts.find((c) => c.id === slug);

  if (!concert) {
    return new Response("Not found", { status: 404 });
  }

  const city = concert.data.city ?? "";
  const venue = concert.data.venue ?? "";
  const support = concert.data.support ?? "";

  const date = new Date(concert.data.date).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  try {
    const svg = createOgSvg({ city, venue, date, support });
    const png = new Resvg(svg).render().asPng();

    if (cache.size > MAX_CACHE) {
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) {
        cache.delete(firstKey);
      }
    }

    cache.set(slug, png);

    return new Response(png, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("OG generation error:", err);
    return new Response("OG generation failed", { status: 500 });
  }
}
