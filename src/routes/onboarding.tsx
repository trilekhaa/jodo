import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { saveOnboarding } from "@/lib/jodo/actions";
import { useMyProfile } from "@/lib/jodo/use-profile";
import { AVATAR_KEYS, MonoAvatar } from "@/components/jodo/avatar";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Chip } from "@/components/jodo/bits";
import type { Availability, SkillConfidence } from "@/lib/jodo/types";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

const SKILL_SUGGESTIONS = [
  "Machine Learning",
  "GIS",
  "React",
  "Agronomy",
  "Product design",
  "NLP",
  "Mobile",
  "IoT",
];
const DOMAIN_SUGGESTIONS = ["Agriculture", "AI / ML", "Health", "Climate", "Education", "Hardware"];
const INTEREST_SUGGESTIONS = ["food security", "climate tech", "tutoring", "farmer tools", "earth observation"];

function Onboarding() {
  const { user, authPending, data: profile, isPending } = useMyProfile();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [name, setName] = useState(profile?.name ?? user?.displayName ?? "");
  const [avatarKey, setAvatarKey] = useState(profile?.avatarKey ?? "orbit");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [availability, setAvailability] = useState<Availability>(profile?.availability ?? "available");
  const [years, setYears] = useState(profile?.experienceYears ?? 3);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<{ name: string; domain: string; confidence: SkillConfidence }[]>(
    profile?.skills.map((s) => ({ name: s.name, domain: s.domain, confidence: s.confidence })) ?? [],
  );
  const [domains, setDomains] = useState<string[]>(profile?.domains ?? []);
  const [interests, setInterests] = useState<string[]>(profile?.interests ?? []);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDetail, setProjectDetail] = useState("");
  const [projects, setProjects] = useState(profile?.pastProjects ?? []);

  const save = useMutation({
    mutationFn: () =>
      saveOnboarding({
        data: {
          name: name || user?.displayName || "Collaborator",
          avatarKey,
          bio,
          availability,
          experienceYears: years,
          skills,
          domains,
          interests,
          pastProjects: projects.map((p) => ({
            title: p.title,
            description: p.description,
            skills: p.skills,
            year: p.year,
          })),
        },
      }),
    onSuccess: async () => {
      await qc.invalidateQueries();
      navigate({ to: "/" });
    },
  });

  if (authPending || isPending) return <div className="min-h-dvh bg-canvas" />;
  if (!user) return <RedirectToSignIn />;
  if (profile?.onboardingComplete) return <Navigate to="/" />;

  function addSkill(nameIn: string) {
    const n = nameIn.trim();
    if (!n || skills.some((s) => s.name.toLowerCase() === n.toLowerCase())) return;
    setSkills([...skills, { name: n, domain: "", confidence: "self_declared" }]);
    setSkillInput("");
  }

  function toggle(list: string[], set: (v: string[]) => void, value: string) {
    set(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  }

  return (
    <main className="mx-auto min-h-dvh max-w-3xl px-4 py-10">
      <p className="font-display text-3xl font-semibold">JODO</p>
      <h1 className="mt-6 font-display text-5xl leading-tight font-semibold tracking-tight">
        What can you actually contribute?
      </h1>
      <p className="mt-3 text-ink-soft">This is a capability profile, not a résumé. Matching uses it.</p>

      <form
        className="mt-10 space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate();
        }}
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label>Avatar</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {AVATAR_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setAvatarKey(key)}
                className={avatarKey === key ? "rounded-full ring-2 ring-brand ring-offset-2 ring-offset-canvas" : ""}
              >
                <MonoAvatar name={name || "You"} avatarKey={key} size={52} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="bio">How you help teams</Label>
          <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="I take satellite scenes and turn them into maps people can act on." />
        </div>
        <div>
          <Label>Skills</Label>
          <div className="mb-3 flex flex-wrap gap-2">
            {SKILL_SUGGESTIONS.map((s) => (
              <Chip key={s} active={skills.some((x) => x.name === s)} onClick={() => addSkill(s)}>
                {s}
              </Chip>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Add a skill" />
            <Button type="button" variant="outline" onClick={() => addSkill(skillInput)}>
              Add
            </Button>
          </div>
          <ul className="mt-3 space-y-2">
            {skills.map((s) => (
              <li key={s.name} className="flex items-center justify-between rounded-2xl bg-blush/50 px-3 py-2">
                <span>{s.name}</span>
                <button type="button" className="text-sm text-brand" onClick={() => setSkills(skills.filter((x) => x.name !== s.name))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Label>Domains</Label>
          <div className="flex flex-wrap gap-2">
            {DOMAIN_SUGGESTIONS.map((d) => (
              <Chip key={d} active={domains.includes(d)} onClick={() => toggle(domains, setDomains, d)}>
                {d}
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <Label>Interests</Label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_SUGGESTIONS.map((d) => (
              <Chip key={d} active={interests.includes(d)} onClick={() => toggle(interests, setInterests, d)}>
                {d}
              </Chip>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="years">Years of experience</Label>
            <Input id="years" type="number" min={0} max={50} value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </div>
          <div>
            <Label>Availability</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["available", "limited", "unavailable"] as Availability[]).map((a) => (
                <Chip key={a} active={availability === a} onClick={() => setAvailability(a)}>
                  {a}
                </Chip>
              ))}
            </div>
          </div>
        </div>
        <div>
          <Label>A project you’ve already done</Label>
          <Input className="mb-2" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} placeholder="Title" />
          <Textarea className="min-h-20" value={projectDetail} onChange={(e) => setProjectDetail(e.target.value)} placeholder="What you actually built" />
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={() => {
              if (!projectTitle.trim()) return;
              setProjects([
                ...projects,
                { id: projectTitle, title: projectTitle, description: projectDetail, skills: skills.map((s) => s.name), year: new Date().getFullYear() },
              ]);
              setProjectTitle("");
              setProjectDetail("");
            }}
          >
            Add project
          </Button>
          <ul className="mt-3 space-y-2">
            {projects.map((p) => (
              <li key={p.id} className="rounded-2xl bg-canvas-deep px-3 py-2">
                <p className="font-medium">{p.title}</p>
                <p className="text-sm text-ink-soft">{p.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <Button type="submit" size="lg" disabled={save.isPending}>
          {save.isPending ? "Saving capability profile…" : "Enter JODO"}
        </Button>
      </form>
    </main>
  );
}
