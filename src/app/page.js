"use client";
import Image from "next/image";
import { useState } from "react";
import TimeCapsule from "@/components/TimeCapsule";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const targetDate = new Date("2024-12-31T24:00:00");
  const [currentCarruselIndex, setCurrentCarruselIndex] = useState(0);
  const content = [
    {
      imageSrc: "/gato-transparente.png",
      imageAlt: "Gato transparente",
      width: 130,
      height: 180,
      text: "Holiii :3 (presiona al gato)",
    },
    {
      imageSrc: "/gato-transparente.png",
      imageAlt: "Gato transparente",
      width: 130,
      height: 180,
      text: "Ya falta poco para que termine el año, un año lleno de retos y momentos bonitos 😊. Aunque también hubo cosas feas, cosas las cuales lamento haber causado y me parten el corazón cada vez que las recuerdo. Por suerte, eres alguien muy valiente, admiro cómo siempre encuentras la manera de superar las adversidades y estoy seguro de que lograrás cosas maravillosas :D",
    },
    {
      imageSrc: "/gato2.png",
      imageAlt: "Gato diciendo algo",
      width: 180,
      height: 180,
      text: "Desde el instante en que te conocí sentí al instante en mi corazón un profundo amor hacia ti. Tus ojos, tu cabello, tu forma de actuar, tu valentía y esa alegría que siempre contagias atraparon mi corazón :3.",
    },
    {
      imageSrc: "/gato3.png",
      imageAlt: "Gato con carta",
      width: 150,
      height: 180,
      text: "Cada vez que te veo es un tesoro para mí, mi día se vuelve feliz y cualquier preocupación que tenía desaparece.",
    },
    {
      imageSrc: "/gato5.png",
      imageAlt: "Gato con beso",
      width: 170,
      height: 180,
      text: "Gracias por todas las cosas bonitas que hemos vivido, gracias por todas las sonrisas que me has regalado, por enseñarme a creer en mí mismo, por darme la confianza que tanto necesitaba y por mostrarme cómo superar las batallas del día a día. Pero, sobre todo, gracias por enseñarme lo que significa ser realmente feliz.",
    },
  ];

  const carouselImages = [
    {
      imageSrc: "/grado.jpg",
      imageAlt: "recuerdo",
      width: 300,
      height: 200,
    },
    {
      imageSrc: "/ramo.jpg",
      imageAlt: "recuerdo",
      width: 300,
      height: 200,
    },
    {
      imageSrc: "/cartagena.jpg",
      imageAlt: "recuerdo",
      width: 300,
      height: 200,
    },
    {
      imageSrc: "/cole.jpg",
      imageAlt: "recuerdo",
      width: 300,
      height: 200,
    },
    {
      imageSrc: "/gio.jpg",
      imageAlt: "recuerdo",
      width: 300,
      height: 200,
    },
  ];
  const handleMessageSubmit = async (message, sender) => {
    try {
      const response = await fetch(`/api/${sender}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
  
      if (response.ok) {
        console.log("Mensaje enviado correctamente");
      } else {
        console.error("Error al enviar el mensaje");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
  };

  const handleCarruselNext = () => {
    setCurrentCarruselIndex(
      (prevIndex) => (prevIndex + 1) % carouselImages.length
    );
  };

  const handleCarruselPrev = () => {
    setCurrentCarruselIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const currentImage = carouselImages[currentCarruselIndex];

  const currentContent = content[currentIndex];

  return (
    <div className="relative w-full justify-center overflow-hidden min-h-screen bg-pastel-pink font-[family-name:var(--font-geist-sans)] p-8 sm:p-20">
      {/* Corazones en efecto parallax con grid */}
      <div className="absolute ml-2 inset-0 grid grid-cols-6 grid-rows-6 ">
        {Array.from({ length: 36 }).map((_, index) => (
          <div
            key={index}
            className={`animate-float ${
              index % 3 === 0
                ? "bg-heart w-10 h-10"
                : index % 3 === 1
                ? "bg-heart2 w-14 h-14"
                : "bg-heart3 w-12 h-12"
            } bg-no-repeat`}
            style={{
              animationDelay: `${(index % 5) * 0.5}s`,
              gridColumn: (index % 6) + 1,
              gridRow: Math.floor(index / 6) + 1,
            }}
          ></div>
        ))}
      </div>

      <main className="flex flex-col w-full gap-8 row-start-2 items-center sm:items-start">
        <div className="card w-full text-center relative">
          {/* Flores en las esquinas */}
          <div className="flower flower-top-left">
            <img src="/flor.png" alt="Flores" />
          </div>

          <div className="flower flower-bottom-right">
            <img src="/flor.png" alt="Flores" />
          </div>

          <p className="text-lg font-semibold text-pastel-blue drop-shadow-md w-full">
            Un pequeño espacio solo para ti
          </p>
          <p className="mt-4 text-sm text-pastel-purple drop-shadow-md text-center text-wrap">
            Espero que cuando veas esto estés bien. <br />
            Hice esto porque te amo muuuucho :3, <br /> y también porque tenía
            mucho tiempo libre jsjsj.
          </p>
          <div className="mt-6 flex justify-center flex-col">
            <span className="bg-pastel-purple/30 px-4 py-2 rounded-full text-pastel-blue text-sm">
              Para la razon de mi sonrisa: Andrea Ferro
            </span>

            <span className="bg-pastel-purple/30 px-4 py-2 rounded-full text-pastel-blue font-bold text-sm">
              💕 Nunca te olvides de ser feliz 💕
            </span>
          </div>
        </div>

        <div className="flex justify-center w-full items-center">
          <div
            className="w-full flex items-center z-10 justify-center"
            onClick={handleNext}
          >
            <Image
              src={currentContent.imageSrc}
              alt={currentContent.imageAlt}
              width={currentContent.width}
              height={currentContent.height}
              priority
            />
          </div>

          <div className="card w-full text-center relative">
            <p className="text-sm  text-pastel-blue drop-shadow-md text-center self-center">
              {currentContent.text}
            </p>
            <div className="flower flower-top-right">
              <img src="/flor.png" alt="Flores" />
            </div>
            <div className="flower flower-bottom-left">
              <img src="/flor.png" alt="Flores" />
            </div>
          </div>
        </div>

        <div className="z-10">
          <div className="card mb-5 w-full text-center relative">
            <p className="text-sm  text-pastel-blue drop-shadow-md text-center self-center">
              Nos conocemos desde hace mucho, han habido errores, meses que
              nisiquiera nos deciamos un hola, sin embargo hice este espacio
              para que recordaramos varios momentos, para asi tener un dulce
              recuerdo de cada uno :D (pasame imagenes jsjs)
            </p>
            <div className="flower flower-top-right">
              <img src="/flor.png" alt="Flores" />
            </div>
            <div className="flower flower-bottom-left">
              <img src="/flor.png" alt="Flores" />
            </div>
          </div>
          <div className="w-full flex items-center z-1 justify-center">
            <Image
              src="/memories.png"
              alt="gato musicaa"
              width={300}
              height={180}
              priority
            />
          </div>
        </div>
        {/* Carrusel de imágenes */}
        <div className="relative w-full my-10">
          <div className="flex justify-center items-center">
            {/* Contenedor de la imagen */}
            <div className="w-full max-w-4xl overflow-hidden flex justify-center">
              <Image
                src={currentImage.imageSrc}
                alt={currentImage.imageAlt}
                width={currentImage.width}
                height={currentImage.height}
                className="rounded-lg shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105"
              />
            </div>
          </div>

          {/* Controles */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
            <button
              className="bg-pastel-purple text-white p-2 rounded-full shadow-lg hover:bg-pastel-pink"
              onClick={handleCarruselPrev}
            >
              ❮
            </button>
            <button
              className="bg-pastel-purple text-white p-2 rounded-full shadow-lg hover:bg-pastel-pink"
              onClick={handleCarruselNext}
            >
              ❯
            </button>
          </div>
        </div>

        <div className="flex justify-center w-full items-center">
          <div className="card w-full text-center relative">
            <p className="text-sm  text-pastel-blue drop-shadow-md text-center self-center">
              Se que te gusta la musica asi que te hice una playlist, puse
              canciones que me gustan mucho y queria dedicartelas con todo mi
              cariño :3
            </p>
            <div className="flower flower-top-right">
              <img src="/flor.png" alt="Flores" />
            </div>
            <div className="flower flower-bottom-left">
              <img src="/flor.png" alt="Flores" />
            </div>
          </div>

          <div className="w-full flex items-center z-10 justify-center">
            <Image
              src="/gatom.png"
              alt="gato musicaa"
              width={currentContent.width}
              height={currentContent.height}
              priority
            />
          </div>
        </div>

        <div className="w-full z-10 flex gap-10 flex-wrap-reverse">
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/track/1nULBrlzWatdcjA2ZctIMv?utm_source=generator&theme=0"
            className="w-full"
            height="152"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <div className="card self-center w-full text-center relative">
            <p className="text-sm  text-pastel-blue drop-shadow-md text-center self-center">
              Esta es especial ❤️
            </p>
            <div className="flower flower-top-left">
              <img src="/flor.png" alt="Flores" />
            </div>

            <div className="flower flower-bottom-right">
              <img src="/flor.png" alt="Flores" />
            </div>
          </div>
        </div>

        <iframe
          style={{ borderRadius: "12px" }}
          className="z-10"
          src="https://open.spotify.com/embed/playlist/1lVDAtbjRjtPywTigFgZVd?utm_source=generator"
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />

        <div className="z-10 flex">
          <div className="card mb-5 w-full text-center relative">
            <p className="text-sm  text-pastel-blue drop-shadow-md text-center self-center">
              Como dije, estamos a pocos dias de finalizar el año, entonces hice
              una mini capsula del tiempo, aqui podemos ir colocando mensajes,
              solo se podran leer hasta 1 de enero a las 00:00 😉
            </p>
            <div className="flower flower-top-right">
              <img src="/flor.png" alt="Flores" />
            </div>
            <div className="flower flower-bottom-left">
              <img src="/flor.png" alt="Flores" />
            </div>
          </div>
          <div className="w-full flex items-center z-1 justify-center">
            <Image
              src="/mensaje.png"
              alt="gato musicaa"
              width={200}
              height={180}
              priority
            />
          </div>
        </div>

        <div className="z-20 w-full">
          <TimeCapsule
            targetDate={targetDate}
            onSubmitMessage={handleMessageSubmit}
          />
        </div>
      </main>
      <footer className="text-center mt-10 card text-pastel-purple">
        <p>Porque tu haces que todo valga la pena, te amoo ❤️</p>
      </footer>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .bg-heart {
          background-image: url("/heart.svg");
          background-size: contain;
        }
        .bg-heart2 {
          background-image: url("/corazon2.svg");
          background-size: contain;
        }
        .bg-heart3 {
          background-image: url("/kurumi.svg");
          background-size: contain;
        }
      `}</style>
    </div>
  );
}
