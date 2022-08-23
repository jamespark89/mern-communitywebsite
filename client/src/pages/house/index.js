import { Link, useNavigate } from "react-router-dom"

export default function House() {
  const navigate = useNavigate()
  const houses = [
    {
      id: 1,
      address: "182 Flinder St",
      href: "#",
      imageSrc: "1.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$155",
      gender: "male",
      bedtype: "Single bed"
    },
    {
      id: 2,
      address: "511 Swanston St",
      href: "#",
      imageSrc: "2.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$135",
      gender: "female",
      bedtype: "Bunk bed"
    },
    {
      id: 3,
      address: "174Flinder St",
      href: "#",
      imageSrc: "3.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      gender: "male",
      bedtype: "Doulbe bed"
    },
    {
      id: 4,
      address: "15 Collins St",
      href: "#",
      imageSrc: "4.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      gender: "female",
      bedtype: "Single bed"
    },
    {
      id: 5,
      address: "35 Latrobe St",
      href: "#",
      imageSrc: "5.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      gender: "male",
      bedtype: "Single bed"
    },
    {
      id: 6,
      address: "17 Londsdale St",
      href: "#",
      imageSrc: "6.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      gender: "male",
      bedtype: "Single bed"
    }
    // More products...
  ]

  return (
    <>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex justify-end ">
            <button
              onClick={() => navigate("/house/new")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
            >
              New
            </button>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            House List
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {houses.map((house) => (
              <div
                key={house.id}
                className="group relative"
              >
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={house.imageSrc}
                    alt={house.imageAlt}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/house/${house.id}`}>
                        <span
                          aria-hidden="true"
                          className="absolute inset-0"
                        />
                        {house.address}
                      </Link>
                    </h3>
                    <div className="mt-1 text-sm text-gray-500">
                      {house.gender === "male" ? (
                        <span className="text-blue-500">
                          Male
                        </span>
                      ) : (
                        <span className="text-red-400">
                          Female
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {house.bedtype}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {house.price} / week
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
