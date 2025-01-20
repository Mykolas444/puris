import Button from "./Button";
import Link from "next/link";

const Card = ({ image, title, link }) => {

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl shadow-2xl drop-shadow-2xl hover:shadow-2xl bg-gradient-to-b from-white to-yellow-200 border p-6">
      {image && (
        <img className="h-64 w-64 object-cover mb-4" src={image} alt={title}/>)}
      <h1 className="text-2xl text-neutral-900 text-center font-bold mb-2">{title}</h1>
      <Link href={link}>
        <Button>Peržiūrėti</Button>
      </Link>
    </div>
  );
};

 

export default Card