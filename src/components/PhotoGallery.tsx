import { useState } from "preact/hooks";

type Image = { src: string; alt?: string };

type Props = {
  images: Image[];
};

export const PhotoGallery = ({ images }: Props) => {
  const [selectedImage, setSelectedImage] = useState(null as Image | null);

  return (
    <section class="full-bleed">
      <div
        style={{ gridAutoRows: 192 }}
        class="grid gap-2 3xl:grid-cols-7 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2"
      >
        {images.map((image) => (
          <img
            src={image.src}
            alt={image.alt || ""}
            class="relative rounded-lg shadow cursor-pointer transform-gpu hover:scale-105 transition-all"
            style={{ maxHeight: 192 }}
            onClick={() => setSelectedImage(image)}
            loading="lazy"
          />
        ))}
      </div>

      {selectedImage !== null ? (
        <div class="relative z-10 fadeIn animated" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div
            aria-hidden="true"
            class="fixed inset-0 bg-slate-700 bg-opacity-60 transition-opacity"
            onClick={() => setSelectedImage(null)}
          />

          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-600 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-7xl">
                <button
                  class="text-black dark:text-white hover:text-gray-700 border-0 pl-2 cursor-pointer transition-colors"
                  onClick={() => setSelectedImage(null)}
                >
                  X Close
                </button>

                <div class="sm:flex sm:items-start">
                  <img src={selectedImage.src} alt={selectedImage.alt || ""} loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};
