import { useState, createRef } from "react"

export default function Carousel({ images }) {
  // We will start by storing the index of the current image in the state.
  const [currentImage, setCurrentImage] = useState(0)

  // We are using react ref to 'tag' each of the images. Below will create an array of
  // objects with numbered keys. We will use those numbers (i) later to access a ref of a
  // specific image in this array.
  const refs = images?.reduce((acc, val, i) => {
    acc[i] = createRef()
    return acc
  }, {})

  const scrollToImage = (i) => {
    // First let's set the index of the image we want to see next
    setCurrentImage(i)
    // Now, this is where the magic happens. We 'tagged' each one of the images with a ref,
    // we can then use built-in scrollIntoView API to do eaxactly what it says on the box - scroll it into
    // your current view! To do so we pass an index of the image, which is then use to identify our current
    // image's ref in 'refs' array above.
    refs[i].current.scrollIntoView({
      //     Defines the transition animation.
      behavior: "smooth",
      //      Defines vertical alignment.
      block: "nearest",
      //      Defines horizontal alignment.
      inline: "start"
    })
  }

  // Some validation for checking the array length could be added if needed
  const totalImages = images?.length

  // Below functions will assure that after last image we'll scroll back to the start,
  // or another way round - first to last in previousImage method.
  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0)
    } else {
      scrollToImage(currentImage + 1)
    }
  }

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1)
    } else {
      scrollToImage(currentImage - 1)
    }
  }

  // Tailwind styles. Most importantly notice position absolute, this will sit relative to the carousel's outer div.
  const arrowStyle =
    "absolute text-white text-2xl z-10 bg-black h-10 w-10 rounded-full opacity-75 flex items-center justify-center"

  // Let's create dynamic buttons. It can be either left or right. Using
  // isLeft boolean we can determine which side we'll be rendering our button
  // as well as change its position and content.
  const sliderControl = (isLeft) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${
        isLeft ? "left-2" : "right-2"
      }`}
      style={{ top: "40%" }}
    >
      <span
        role="img"
        aria-label={`Arrow ${isLeft ? "left" : "right"}`}
      >
        {isLeft ? "◀" : "▶"}
      </span>
    </button>
  )

  return (
    // Images are placed using inline flex. We then wrap an image in a div
    // with flex-shrink-0 to stop it from 'shrinking' to fit the outer div.
    // Finally the image itself will be 100% of a parent div. Outer div is
    // set with position relative, so we can place our cotrol buttons using
    // absolute positioning on each side of the image.
    <div className="p-12 flex justify-center w-full items-center">
      <div className="relative w-full">
        <div className="carousel">
          {images?.length > 1 ? sliderControl(true) : null}
          <span className="bg-slate-400 px-2 rounded-lg text-white absolute right-0">
            {currentImage + 1}/{totalImages}
          </span>
          {images?.map((img, i) => (
            <div
              className="w-full max-h-96 flex flex-shrink-0"
              key={i}
              ref={refs[i]}
            >
              <img
                src={
                  process.env.REACT_APP_SERVER_URL +
                  "/images/" +
                  img
                }
                alt=""
                className="w-full object-contain"
              />
            </div>
          ))}

          {images?.length > 1 ? sliderControl() : null}
        </div>
      </div>
    </div>
  )
}
