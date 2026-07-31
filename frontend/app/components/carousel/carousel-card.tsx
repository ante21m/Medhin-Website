import Image from "next/image";

export default function CarouselCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      <Image src={image} alt={title} width={600} height={400} />
      <div className="p-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
