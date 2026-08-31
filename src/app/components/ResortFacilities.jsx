"use client";

import Image from "next/image";
import { Wifi } from "lucide-react";

const amenities = [
  {
    icon: "/images/svg/natureview.webp",
    title: "Nature View Rooms",
  },
  {
    icon: "/images/svg/swimming.webp",
    title: "Swimming Pool",
  },
  {
    icon: "/images/svg/table-tennis.webp",
    title: "Indoor & Outdoor Games",
  },
  {
    icon: "/images/svg/kidsplay.png",
    title: "Kids Play Area & Family Zones",
  },
  {
    icon: "/images/svg/bonfire.webp",
    title: "Bonfire",
  },
  {
    icon: "/images/svg/event-hall.png",
    title: "Event Hall",
  },
  {
    icon: "/images/svg/wifi1.png",
    title: "High-Speed WiFi",
  },
  {
    icon: "/images/svg/farmtour.png",
    title: "Farm Tour",
  },
];

export default function ResortFacilities() {
  return (
    <section className="relative my-14">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center">
        

          <h3
            className="mb-5 text-center font-cormogarbobold text-[38.24px] leading-[42px] text-[#383938] md:text-[45px] md:leading-[50.4px]"
            data-split="title"
          >
            Resort Amenities
          </h3>

            <div className="mx-auto mt-3 flex items-center justify-center gap-4">
            <div className="w-[120px] sm:w-[170px]">
              <Image
                src="/images/svg/nativeplacevector.png"
                width={220}
                height={60}
                alt="Villas and Cottages"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
        

        <div className="mt-5 grid grid-cols-2 gap-10 text-center sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          {amenities.map(item => (
            <div className="flex flex-col items-center gap-4" key={item.title}>
              <div className="relative flex h-16 w-16 items-center justify-center md:h-20 md:w-20">
                {item.icon === "wifi" ? (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#f4f1e6] text-[#99b34d]">
                    <Wifi className="h-9 w-9" strokeWidth={1.8} />
                  </div>
                ) : (
                  <Image
                    src={item.icon}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                )}
              </div>

              <p className="font-cormogarbobold text-[13px] leading-[16px] text-[#383938] md:text-[18px] md:leading-[18.25px]">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
