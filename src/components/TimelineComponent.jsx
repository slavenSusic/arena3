import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import "./TimelineComponent.scss";
import g1 from "../assets/idea.svg"; 
import g2 from "../assets/arrow.svg"; 
import g3 from "../assets/progr.svg"; 
import g4 from "../assets/code.svg"; 
import g5 from "../assets/plane.svg"; 
import g6 from "../assets/hand.svg"; 






const fields = {
  title: "Naš put kroz",

  years_timeline: [
    {
      year: 2014,
      body: "Godine 2014. nastala je ideja o Digitalnoj Areni te su započele aktivnosti u IT i telekomunikacijskom sektoru.",
      pic: <img src={g2.src} alt="Godina 2014" />,
    },
    {
      year: 2018,
      body: "Osnivanje Iluminum ICT-a proširilo je njihove aktivnosti na područje IBM alata i sektora informacijsko-komunikacijske tehnologije.",
      pic: <img src={g2.src} alt="Godina 2018" />,
    },
    {
      year: 2021,
      body: "Udruživanje snaga sa Iluminum ICT-em, tvrtka raste na više od 50 zaposlenih te se ostvaruje zajednički prihod od više od 5 miliona €",
      pic: <img src={g6.src} alt="Year 2018" />,
    },
     {
      year: 2023,
      body: (
        <div>
          <p>
            u 2023. godini firma usprkos svim izazovima nezaustavljivo raste te širi svoje poslovanje
          </p>
        </div>
      ),
      pic: <img src={g4.src} alt="Year 2018" />,
    },
  ]
};

function TimelineComponent() {
  const [yearSelected, setYearSelected] = useState(2018); 
  const [isAnimating, setIsAnimating] = useState(false);
  const [keySelected, setKeySelected] = React.useState(0);
  const { title, years_timeline } = fields;

  const handleOnTimelineClick = (e, year, key) => {
    setYearSelected(year);
    setKeySelected(key);
  };
  useEffect(() => {
    setIsAnimating(true); // Set the flag to trigger the animation on every re-render
  }, [yearSelected]); // Add any state or prop that triggers a re-render
  const controls = useAnimation();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = () => {
    const element = document.querySelector(".wrapper");
    if (element) {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight * 0.7) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the next key
      const nextKey = keySelected < years_timeline.length - 1 ? keySelected + 1 : 0;
      setKeySelected(nextKey);
    }, 3000000); // Change year every 3 seconds

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, [keySelected, years_timeline]);

  useEffect(() => {
    setYearSelected(years_timeline[keySelected].year);
  }, [keySelected, years_timeline]);

  return (
    <motion.section
    className="wrapper mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8"
    initial="hidden"
    animate={controls}
    variants={{
      visible: { opacity: 1, x: 0, y:0 },
      hidden: { opacity: 0, x: 0, y:-"50rem" },
    }}
    // transition={{ type: "reveal", duration: 1.5 }}
  >
    <section className="wrapper">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-2xl whitespace-nowrap md:text-7xl font-bold mb-5 text-gray-800 dark:text-gray-100">
          Povijest digital arene
        </h1>
        <h3 className="text-xl mb-5 font-light text-gray-800 dark:text-gray-100">
          Povijest kojom se ponosimo
        </h3>
        <div className="text-center mb-10">
          <span className="inline-block w-1 h-1 rounded-full bg-green-500 ml-1"></span>
          <span className="inline-block w-3 h-1 rounded-full bg-green-500 ml-1"></span>
          <span className="inline-block w-40 h-1 rounded-full bg-green-500"></span>
          <span className="inline-block w-3 h-1 rounded-full bg-green-500 ml-1"></span>
          <span className="inline-block w-1 h-1 rounded-full bg-green-500 ml-1"></span>
        </div>
      </div>
      <div className="">
        <div className="arrows hi">
          <button
            onClick={() => {
              setKeySelected(
                keySelected > 0 ? keySelected - 1 : years_timeline.length - 1
              );
            }}
            aria-label="Left button"
          >
            {/* ⬅ */}
          </button>
        </div>

        <div className="content relative flex items-center justify-center">
          {years_timeline.map((item, key) => (
      <motion.div
      key={key}
      className={`tab bg-opacity-80 rounded-lg flex items-center justify-between dark:bg-gray-900 ${
        yearSelected === item.year && "selected"
      }`}
      initial={isAnimating ? { opacity: 0 } : { opacity: 1 }}
      animate={isAnimating ? { opacity: 1 } : { opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
              <h2 className="text-5xl flex max-w-lg mx-auto font-semibold mb-2 text-green-500 dark:bg-gray-900">
                {item.year}
              </h2>
              <motion.div
                className="flex flex-row-reverse w-full items-center justify-between md:gap-5 dark:bg-gray-900"
                initial={{ opacity: 0, y: -120 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.div
                  className="w-full text-left mb-10  text-xs md:text-2xl text-gray-700 dark:text-gray-100 dark:bg-gray-900"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {item.body}
                </motion.div>
                <motion.div
                  className="w-1/4 mb-10"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {item.pic}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
          <p className="absolute z-0 md:max-w-8xl text-[7rem] top-[14%] md:text-[14rem] lg:text-[20rem] md:top-[-50%]   dark:text-white/30 opacity-10 ">history</p>
          <div class="absolute inset-0 hidden h-max dark:block lg:my-auto">
                <div
                  aria-hidden="true"
                  class="grid grid-cols-2 -space-x-52 opacity-50 dark:opacity-70 2xl:mx-auto 2xl:max-w-6xl"
                >
                  <div
                    class="h-60 bg-gradient-to-br from-blue-200 to-green-400 blur-3xl dark:from-blue-800"
                  >
                  </div>
                  <div
                    class="h-72 rounded-full bg-gradient-to-r from-cyan-400 to-sky-300 blur-3xl dark:from-transparent dark:to-indigo-600"
                  >
                  </div>
                </div>
              </div>
        </div>
        
        <div className="arrows">
          
        </div>
      </div>
      <div className="timeline z-10 md:max-w-2xl lg:max-w-5xl mx-auto ">
        <ul>
          {years_timeline.map((item, key) => (
            <li key={key} className={item.year === yearSelected ? "active" : ""}>
              <a
                onClick={(e) => handleOnTimelineClick(e, item.year, key)}
                id={item.year}
              >
                <p className="text-sm md:text-2xl pb-11 md:pb-5">{item.year}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>

      
    </section>
    </motion.section>
  );
}

export default TimelineComponent;