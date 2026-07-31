import CarouselCard from "./carousel-card";

const data = [
  {
    title: "Emergency Care",
    description: "Immediate response and advanced facilities",
    image: "/images/slide1.jpg",
  },
  {
    title: "Qualified Doctors",
    description: "Experienced professionals you can trust",
    image: "/images/slide2.jpg",
  },
];

export default function Carousel() {
  return (
    <section className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto py-16 px-6">
      {data.map((item, i) => (
        <CarouselCard key={i} {...item} />
      ))}
    </section>
  );
}
