import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { addEvidence, updateProfile } from "@/lib/jodo/actions";
import { useMyProfile } from "@/lib/jodo/use-profile";
import { AppShell } from "@/components/jodo/shell";
import { AVATAR_KEYS, MonoAvatar } from "@/components/jodo/avatar";
import { Card, Chip, ConfidenceMark, SectionTitle } from "@/components/jodo/bits";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import type { Availability, SkillConfidence } from "@/lib/jodo/types";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const { user, authPending, data: profile, isPending } = useMyProfile();
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [avatarKey, setAvatarKey] = useState("orbit");
  const [bio, setBio] = useState("");
  const [availability, setAvailability] = useState<Availability>("available");
  const [years, setYears] = useState(0);
  const [skillName, setSkillName] = useState("");
  const [skills, setSkills] = useState<{ name: string; domain: string; confidence: SkillConfidence }[]>([]);
  const [domains, setDomains] = useState("");
  const [interests, setInterests] = useState("");
  const [evSkill, setEvSkill] = useState("");
  const [evTitle, setEvTitle] = useState("");
  const [evDetail, setEvDetail] = useState("");
  const [evType, setEvType] = useState("project");

  useEffect(() => {
    if (!profile) return;
    setName(profile.name);
    setAvatarKey(profile.avatarKey);
    setBio(profile.bio);
    setAvailability(profile.availability);
    setYears(profile.experienceYears);
    setSkills(profile.skills.map((s) => ({ name: s.name, domain: s.domain, confidence: s.confidence })));
    setDomains(profile.domains.join(", "));
    setInterests(profile.interests.join(", "));
  }, [profile]);

  const save = useMutation({
    mutationFn: () =>
      updateProfile({
        data: {
          name,
          avatarKey,
          bio,
          availability,
          experienceYears: years,
          skills,
          domains: domains.split(",").map((s) => s.trim()).filter(Boolean),
          interests: interests.split(",").map((s) => s.trim()).filter(Boolean),
          pastProjects: (profile?.pastProjects ?? []).map((p) => ({
            title: p.title,
            description: p.description,
            skills: p.skills,
            year: p.year,
          })),
        },
      }),
    onSuccess: () => qc.invalidateQueries(),
  });

  const evidence = useMutation({
    mutationFn: () =>
      addEvidence({
        data: { skillName: evSkill, type: evType, title: evTitle, detail: evDetail },
      }),
    onSuccess: () => {
      setEvTitle("");
      setEvDetail("");
      void qc.invalidateQueries();
    },
  });

  if (authPending || isPending) return <div className="min-h-dvh bg-canvas" />;
  if (!user) return <RedirectToSignIn />;
  if (profile && !profile.onboardingComplete) return <Navigate to="/onboarding" />;
  if (!profile) return <div className="min-h-dvh bg-canvas" />;

  return (
    <AppShell profile={profile}>
      <div className="flex flex-wrap items-end gap-5">
        <MonoAvatar name={name || profile.name} avatarKey={avatarKey} avatarUrl={profile.avatarUrl} size={88} />
        <div>
          <SectionTitle kicker="Capability profile" title={profile.name} />
          <p className="text-ink-soft">Edits change future matching. Evidence upgrades confidence. Verified only happens with real verification data.</p>
        </div>
      </div>

      <form
        className="mt-8 max-w-2xl space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate();
        }}
      >
        <div>
          <Label>Avatar</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {AVATAR_KEYS.map((key) => (
              <button key={key} type="button" onClick={() => setAvatarKey(key)}>
                <MonoAvatar name={name} avatarKey={key} size={44} className={avatarKey === key ? "ring-2 ring-brand" : ""} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Years</Label>
            <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
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
          <Label>Skills</Label>
          <div className="flex gap-2">
            <Input value={skillName} onChange={(e) => setSkillName(e.target.value)} placeholder="Add skill" />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (!skillName.trim()) return;
                setSkills([...skills, { name: skillName.trim(), domain: "", confidence: "self_declared" }]);
                setSkillName("");
              }}
            >
              Add
            </Button>
          </div>
          <ul className="mt-3 space-y-2">
            {skills.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-2 rounded-2xl bg-blush/50 px-3 py-2">
                <span className="flex items-center gap-2">
                  {s.name} <ConfidenceMark confidence={s.confidence} />
                </span>
                <button type="button" className="text-sm text-brand" onClick={() => setSkills(skills.filter((x) => x.name !== s.name))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Label>Domains (comma separated)</Label>
          <Input value={domains} onChange={(e) => setDomains(e.target.value)} />
        </div>
        <div>
          <Label>Interests (comma separated)</Label>
          <Input value={interests} onChange={(e) => setInterests(e.target.value)} />
        </div>
        <Button type="submit" disabled={save.isPending}>
          {save.isPending ? "Saving…" : "Save profile"}
        </Button>
      </form>

      <div className="mt-12 max-w-2xl">
        <SectionTitle title="Add evidence" />
        <Card>
          <div className="space-y-3">
            <Input value={evSkill} onChange={(e) => setEvSkill(e.target.value)} placeholder="Skill this evidence supports" />
            <Input value={evTitle} onChange={(e) => setEvTitle(e.target.value)} placeholder="Title" />
            <Textarea className="min-h-20" value={evDetail} onChange={(e) => setEvDetail(e.target.value)} placeholder="What can someone inspect?" />
            <select className="h-11 w-full rounded-[14px] bg-canvas-deep px-3" value={evType} onChange={(e) => setEvType(e.target.value)}>
              <option value="project">Project</option>
              <option value="certification">Certification</option>
              <option value="portfolio">Portfolio</option>
              <option value="previous_work">Previous work</option>
            </select>
            <Button
              type="button"
              variant="outline"
              disabled={!evSkill || !evTitle || evidence.isPending}
              onClick={() => evidence.mutate()}
            >
              Attach evidence
            </Button>
            <p className="text-sm text-ink-soft">This upgrades a matching skill from self-declared to evidence-supported. It does not mark it verified.</p>
          </div>
        </Card>
        <div className="mt-4 grid gap-3">
          {profile.evidence.map((e) => (
            <Card key={e.id}>
              <ConfidenceMark confidence={e.status === "verified" ? "verified" : "evidence_supported"} />
              <p className="mt-1 font-display text-xl">{e.title}</p>
              <p className="text-sm text-ink-soft">
                {e.skillName} · {e.type.replaceAll("_", " ")}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
