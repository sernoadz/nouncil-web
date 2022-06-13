export default function Card({ title, image, alt, children }) {
  return (
    <>
      <div className="rounded-2xl px-10 pt-5 pb-10 bg-white">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-nouns md:text-4xl text-3xl">{title}</h2>
          <img className="rendering-pixelated md:w-32 w-24 h-auto" src={image} alt={alt} width="32" height="34" />
        </div>
        {children}
      </div>
    </>
  )
}
