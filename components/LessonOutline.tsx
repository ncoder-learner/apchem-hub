"use client";

import { useEffect, useState } from "react";

interface LessonOutlineProps {
  articleId: string;
}

interface OutlineItem {
  id: string;
  title: string;
  description: string;
}

export function LessonOutline({ articleId }: LessonOutlineProps) {
  const [items, setItems] = useState<OutlineItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    const article = document.getElementById(articleId);
    if (!article) return;

    const sections = Array.from(article.querySelectorAll<HTMLElement>(":scope > .lesson-section"));
    const nextItems = sections.map((section, index) => {
      const summary = section.querySelector("summary");
      const title = summary?.querySelector("span.min-w-0")?.querySelector("span")?.textContent?.trim()
        || summary?.textContent?.replace(/[+−]/g, "").trim()
        || `Section ${index + 1}`;
      const description = summary?.querySelector("span.min-w-0 span:nth-child(2)")?.textContent?.trim() || "";
      const id = `lesson-section-${index + 1}`;
      section.id = id;
      return { id, title, description };
    });
    setItems(nextItems);
    if (nextItems[0]) setActiveId(nextItems[0].id);

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      const id = (visible.target as HTMLElement).id;
      setActiveId(id);
      setVisited((current) => current.includes(id) ? current : [...current, id]);
    }, { rootMargin: "-18% 0px -65% 0px", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [articleId]);

  function jumpTo(item: OutlineItem) {
    const target = document.getElementById(item.id);
    if (!target) return;
    let parent = target.parentElement;
    while (parent && parent.id !== articleId) {
      if (parent instanceof HTMLDetailsElement) parent.open = true;
      parent = parent.parentElement;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(item.id);
    setVisited((current) => current.includes(item.id) ? current : [...current, item.id]);
  }

  if (items.length === 0) {
    return <p className="px-3 py-2 text-xs text-ink-dim">Section navigation loads with the lesson.</p>;
  }

  return (
    <div className="lesson-outline mt-5 border-t border-border pt-4">
      <div className="mb-2 flex items-center justify-between gap-3 px-1">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-dim">In this lesson</p>
        <span className="text-xs tabular-nums text-ink-dim">{visited.length}/{items.length}</span>
      </div>
      <div className="mb-3 h-1 overflow-hidden rounded-full bg-border" aria-label={`${visited.length} of ${items.length} sections visited`}>
        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(visited.length / items.length) * 100}%` }} />
      </div>
      <nav aria-label="Lesson sections" className="lesson-outline-list flex max-h-[36vh] flex-col gap-1 overflow-y-auto pr-1 md:max-h-[48vh]">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => jumpTo(item)}
            aria-current={activeId === item.id ? "location" : undefined}
            className={`flex w-full items-start gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${activeId === item.id ? "bg-accent-soft text-accent" : "text-ink-dim hover:bg-white/[0.04] hover:text-ink"}`}
          >
            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold ${visited.includes(item.id) ? "border-accent/60 text-accent" : "border-border"}`}>
              {visited.includes(item.id) ? "✓" : index + 1}
            </span>
            <span className="min-w-0">
              <span className="block leading-snug">{item.title}</span>
              {item.description && <span className="mt-1 block text-xs leading-snug text-ink-dim">{item.description}</span>}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
