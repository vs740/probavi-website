"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "Does Probavi store our infrastructure data?",
    answer:
      "PROBAVI is architected to minimize data residency. Evidence is verified in-place and reduced to cryptographic proofs and control attestations—raw infrastructure data is not retained outside your environment unless you explicitly opt in.",
  },
  {
    question: "How does the LLM avoid hallucinations in compliance reporting?",
    answer:
      "Every finding produced by the fine-tuned LLM is constrained and re-validated by a deterministic mathematical rule engine. Conclusions that cannot be reproduced from machine-verifiable logic are never surfaced in a report.",
  },
  {
    question: "How long does deployment take?",
    answer:
      "Typical integrations with AWS, Azure, CI/CD pipelines, and identity providers are live within days. Continuous monitoring begins immediately once connectors are authorized.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-border bg-surface">
      <div className="mx-auto w-full max-w-3xl px-6 py-20 md:px-10 lg:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-steel">FAQ</p>
        <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Frequently asked questions
        </h2>

        <div className="mt-10 border border-border">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div
                key={faq.question}
                className="border-b border-border last:border-b-0"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 bg-surface px-6 py-5 text-left transition-colors hover:bg-background"
                  >
                    <span className="font-heading text-base font-medium text-foreground">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <Minus className="h-4 w-4 shrink-0 text-steel" aria-hidden="true" />
                    ) : (
                      <Plus className="h-4 w-4 shrink-0 text-steel" aria-hidden="true" />
                    )}
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="bg-background px-6 pb-6 pt-1"
                >
                  <p className="text-sm leading-6 text-muted">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
