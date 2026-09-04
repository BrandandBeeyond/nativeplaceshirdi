import Image from "next/image";

const galleryItems = [
  "/images/common/gallery/dining.PNG",
  "/images/common/gallery/instapost.jpeg",
  "/images/common/gallery/instapost2.jpeg",
  "/images/common/gallery/instapost3.PNG",
  "/images/common/gallery/nature.jpeg",
  "/images/common/gallery/pool.jpeg",
];

export default function AboutGallery() {
  return (
    <section className="overflow-hidden px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 text-center sm:mb-10">
          <p className="font-subheading text-[12px] font-semibold uppercase tracking-[0.4em] text-[#6b8444] sm:text-sm">
            Gallery
          </p>
          <h2 className="mt-3 font-heading text-4xl leading-tight text-[#20342b] sm:text-5xl">
            A Glimpse of The Native Place
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {galleryItems.map((image) => (
            <article
              key={image}
              className="group relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#f5efdf] shadow-[0_18px_45px_rgba(40,55,35,0.1)] sm:rounded-[28px]"
              data-aos="fade-up"
            >
              <Image
                src={image}
                alt="The Native Place gallery"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#20342b]/35 to-transparent" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
