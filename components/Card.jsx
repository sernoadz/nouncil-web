import Image from 'next/image'

export default function Card({ title, image, alt, children }) {
  return (
    <>
      <div className="rounded-2xl bg-white px-10 pb-10 pt-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-nouns text-3xl md:text-4xl">{title}</h2>
          <img className="rendering-pixelated w-24 md:w-32 h-auto" src={image} alt={alt} width="32" height="34" />
        </div>
        {children}
      </div>
    </>
  )
}
