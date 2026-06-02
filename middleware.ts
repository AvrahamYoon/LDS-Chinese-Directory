import { NextResponse, type NextRequest } from "next/server";

const AI_CRAWLER_USER_AGENTS = [
  "AI2Bot",
  "Ai2Bot-Dolma",
  "Amazonbot",
  "anthropic-ai",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "ChatGPT-User",
  "Claude-Web",
  "ClaudeBot",
  "cohere-ai",
  "DataForSeoBot",
  "Diffbot",
  "FacebookBot",
  "FriendlyCrawler",
  "Google-Extended",
  "GPTBot",
  "ImagesiftBot",
  "img2dataset",
  "Kangaroo Bot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "OAI-SearchBot",
  "omgili",
  "omgilibot",
  "PanguBot",
  "PerplexityBot",
  "PetalBot",
  "Scrapy",
  "Timpibot",
  "YouBot"
];

const aiCrawlerPattern = new RegExp(
  AI_CRAWLER_USER_AGENTS.map((agent) =>
    agent.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  ).join("|"),
  "i"
);

function addCrawlerProtectionHeaders(response: NextResponse) {
  response.headers.set("X-Robots-Tag", "noai, noimageai");
  return response;
}

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";

  if (aiCrawlerPattern.test(userAgent)) {
    return addCrawlerProtectionHeaders(
      new NextResponse("AI crawler access is not permitted.", {
        status: 403,
        headers: {
          "Content-Type": "text/plain; charset=utf-8"
        }
      })
    );
  }

  return addCrawlerProtectionHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"
  ]
};
