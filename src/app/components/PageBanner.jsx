import Image from "next/image";

export default function PageBanner({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
}) {
  return (
    <section className="relative overflow-hidden bg-[#0b2f1f]">
      <div className="relative min-h-[320px] sm:min-h-[360px] lg:min-h-[420px]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,12,0.34)_0%,rgba(4,20,12,0.58)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,220,79,0.1),transparent_45%)]" />

        <div className="relative z-10 flex h-full min-h-[320px] items-center justify-center px-4 py-16 text-center sm:min-h-[360px] sm:px-6 lg:min-h-[420px]">
          <div className="max-w-4xl" data-aos="fade-up">
            <p className="font-subheading text-[12px] font-semibold uppercase tracking-[0.45em] text-[#e8f2d0] sm:text-sm">
              {eyebrow}
            </p>

            <h1 className="mt-4 font-heading text-5xl leading-tight text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.3)] sm:text-6xl lg:text-[4.75rem]">
              {title}
            </h1>

            {description ? (
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-white/82 sm:text-lg">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
