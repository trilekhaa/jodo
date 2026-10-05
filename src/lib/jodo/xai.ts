import { mergeAnalyses } from "./analyze";
import type { AnalyzeInput } from "./analyze";
import type { IdeaAnalysis } from "./types";

const SYSTEM = `You analyze product ideas for JODO, a talent-idea collaboration platform.
Return ONLY compact JSON with this shape:
{
  "problem": string,
  "goal": string,
  "domains": string[],
  "subDomains": string[],
  "technologies": string[],
  "capabilities": string[],
  "constraints": string[],
  "dependencies": string[],
  "roles": [{"id": string, "title": string, "skills": string[], "priority": "high"|"medium"|"low", "reason": string, "hidden": boolean}],
  "hiddenRequirements": [{"id": string, "title": string, "reason": string, "relatedRole": string, "skills": string[]}]
}
Rules:
- Roles are people needed to complete the idea, not jobs to fill for hire.
- hiddenRequirements are things the author did not explicitly mention.
- Do not invent companies or named people.
- Keep lists short and specific.`;

function extractJson(text: string): Partial<IdeaAnalysis> | null {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced?.[1] ?? trimmed;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    return JSON.parse(raw.slice(start, end + 1)) as Partial<IdeaAnalysis>;
  } catch {
    return null;
  }
}

export async function enhanceAnalysis(
  input: AnalyzeInput,
  local: IdeaAnalysis,
): Promise<IdeaAnalysis> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return local;
  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.2,
        max_tokens: 1100,
        messages: [
          { role: "system", content: SYSTEM },
          {
            role: "user",
            content: `Title: ${input.title}\nDescription: ${input.description}\nDomain hint: ${input.domainHint || "none"}\nConstraints: ${input.constraints || "none"}\nTimeline: ${input.timeline || "none"}`,
          },
        ],
      }),
    });
    if (!res.ok) return local;
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const remote = extractJson(body.choices?.[0]?.message?.content ?? "");
    return mergeAnalyses(local, remote);
  } catch {
    return local;
  }
}
