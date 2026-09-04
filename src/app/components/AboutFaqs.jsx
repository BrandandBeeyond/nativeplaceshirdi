"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "What is the minimum age required to make a booking?",
    answer:
      "The primary guest making the booking must be at least 18 years old and must present valid identification at check-in.",
  },
  {
    question: "Can outside visitors meet us during our stay?",
    answer:
      "Outside visitors are allowed only with prior approval from the management and in line with resort policies.",
  },
  {
    question: "Is the resort suitable for senior citizens?",
    answer:
      "Yes, the resort is peaceful and comfortable for senior citizens, with a calm environment and easy access around the property.",
  },
];

export default function AboutFaqs() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="overflow-hidden px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6 text-center">
          <div>
            <p className="font-subheading text-[12px] font-semibold uppercase tracking-[0.4em] text-[#6b8444]">
              FAQs
            </p>
            <h2 className="mt-3 font-heading text-4xl leading-tight text-[#20342b] sm:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const open = index === activeIndex;

            return (
              <article
                key={faq.question}
                className={`rounded-[28px] border border-[#ece2cf] bg-white/90 px-5 shadow-[0_18px_45px_rgba(40,55,35,0.08)] transition-all duration-300 sm:px-8 ${
                  open ? "py-5 sm:py-8" : "py-4 sm:py-5"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 text-left"
                  aria-expanded={open}
                >
                  <span className="text-[16px] font-medium leading-7 text-[#20342b] sm:text-[20px]">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 sm:h-14 sm:w-14 ${
                      open ? "bg-[#a7ca5c] text-white" : "bg-[#f1f1f1] text-[#6e6e6e]"
                    }`}
                  >
                    {open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </span>
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-out ${
                    open ? "grid-rows-[1fr] pt-4 sm:pt-6" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-5xl text-[15px] leading-7 text-[#56615a] sm:text-[17px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
