"use client";

import Image from "next/image";
import { Armchair, BedDouble, Flower2, Leaf, Trees } from "lucide-react";

const villaFeatures = [
  { icon: BedDouble, label: "2 Bedrooms" },
  { icon: Armchair, label: "Private Sit-out" },
  { icon: Trees, label: "Garden Views" },
];

const cottageFeatures = [
  { icon: BedDouble, label: "Comfortable Rooms" },
  { icon: Armchair, label: "Private Sit-out" },
  { icon: Leaf, label: "Nature Surroundings" },
];

function FeatureRow({ items }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0">
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className={`flex items-center gap-3 py-1 sm:px-6 ${
              index < items.length - 1 ? "sm:border-r sm:border-[#e0dccf]" : ""
            }`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef1df] text-[#768f54]">
              <Icon className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <span className="text-sm text-[#4f584e]">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function StayBlock({
  number,
  title,
  subtitle,
  description,
  image,
  imageAlt,
  buttonLabel,
  href,
  features,
  reverse = false,
}) {
  return (
    <div
      className={`grid overflow-hidden rounded-[18px] bg-[#faf6eb] shadow-[0_10px_35px_rgba(36,46,32,0.06)] lg:grid-cols-2 ${
        reverse ? "lg:[direction:rtl]" : ""
      }`}
    >
      <div
        className={`relative min-h-[420px] lg:min-h-[560px] ${
          reverse ? "lg:[direction:ltr]" : ""
        }`}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div
        className={`flex items-center px-6 py-10 sm:px-8 lg:px-10 xl:px-12 ${
          reverse ? "lg:[direction:ltr]" : ""
        }`}
      >
        <div className="w-full max-w-[520px]">
          
          <h3 className="mt-2 font-heading font-[500] text-5xl uppercase leading-[1.02] text-[#18352A] sm:text-[2.7rem]">
            {title}
          </h3>

          <div className="mt-4 h-px w-12 bg-[#d9d2c4]" />

          <p className="mt-5 max-w-[380px] font-subheading text-[1.45rem] leading-[1.08] text-[#2a302d] sm:text-[1.6rem]">
            {subtitle}
          </p>

          <p className="mt-6 max-w-[430px] text-[15px] leading-7 text-[#50574f]">
            {description}
          </p>

          <div className="mt-8">
            <FeatureRow items={features} />
          </div>

          <div className="mt-9">
            <a
              href={href}
              className="group inline-flex flex-col items-start gap-2 text-[16px] font-medium uppercase tracking-[0.18em] text-[#20342b] transition-colors duration-300 hover:font-semibold hover:text-[#4a6645]"
            >
              <span className="inline-flex items-center gap-4">
                {buttonLabel}
                <span className="text-2xl leading-none transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
              <span className="h-px w-0 bg-[#6b8444] transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VillasCottages() {
  return (
    <section id="stay-with-us" className="bg-[#fbf8ef] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center">
          <p className="font-subheading text-[12px] font-semibold uppercase tracking-[0.45em] text-[#6b8444] sm:text-sm">
            Stay With Us
          </p>

          <div className="mx-auto mt-3 flex items-center justify-center gap-4">
            <div className="w-[170px]">
              <Image
                src="/images/svg/nativeplacevector.png"
                width={220}
                height={60}
                alt="Villas and Cottages"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

          <h2 className="mt-4 font-heading text-5xl leading-tight text-[#20342b] sm:text-6xl lg:text-[4rem]">
            Comfort in Every Stay
          </h2>

          <p className="mx-auto mt-4 max-w-[760px] text-sm leading-7 text-[#5c6258] sm:text-base">
            Choose from our spacious 2 BHK Villas or charming Cottages, thoughtfully designed
            to bring you closer to nature and loved ones.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          <StayBlock
            number="01 / STAY"
            title="2 BHK VILLAS"
            subtitle="Spacious. Private. Surrounded by Nature."
            description="Thoughtfully designed 2 BHK Villas offering generous spaces, peaceful surroundings and the comfort of staying together."
            image="/images/villas/villa1.jpeg"
            imageAlt="2 BHK Villa"
            buttonLabel="Explore Villas"
            href="/villas"
            features={villaFeatures}
          />

          <div className="mx-auto mt-3 flex items-center justify-center gap-4">
            <div className="w-[170px]">
              <Image
                src="/images/svg/nativeplacevector.png"
                width={220}
                height={60}
                alt="Villas and Cottages"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

          <StayBlock
            number="02 / STAY"
            title="COTTAGES"
            subtitle="Cozy. Charming. Close to Nature."
            description="Our charming Cottages offer a peaceful escape surrounded by greenery, created for slow mornings, quiet evenings and meaningful time together."
            image="/images/cottages/cottage1.jpeg"
            imageAlt="Cottage"
            buttonLabel="Explore Cottages"
            href="/cottages"
            features={cottageFeatures}
            reverse
          />
        </div>
      </div>
    </section>
  );
}
