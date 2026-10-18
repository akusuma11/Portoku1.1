import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

import saraninVideo from "@/assets/img/portfolio/saranin.mp4";
import eviasiImage from "@/assets/img/portfolio/eviasi.png";
import plantifyImage from "@/assets/img/portfolio/plantify.png";
import unieventImage from "@/assets/img/portfolio/unievent.png";


const projects = [
  {
    title: "Plantify – Smart Plant Monitoring & Automatic Watering",
    description:
      "A smart plant monitoring mobile application integrated with IoT technology to monitor soil moisture and environmental conditions, automate watering schedules, and track plant growth through real-time sensor data.",
    src: plantifyImage,
    color: "#8FA66A",
    githubLink: "https://github.com/akusuma11/plantify-mobile",
    liveLink: "",
    type: "image",
  },
  {
    title: "UniEvent – Event Management System",
    description:
      "An event management platform designed to simplify event discovery, ticket reservations, and participant data management across Indonesia, particularly for events hosted at hotels and premium venues.",
    src: unieventImage,
    color: "#8C44E4",
    githubLink: "https://github.com/akusuma11/unievent",
    liveLink: "",
    type: "image",
  },
  {
    title: "Saranin.id – AI Product Recommendation",
    description:
      "An AI-powered supermarket product recommendation system that delivers personalized suggestions using shopping data and machine learning. The platform helps customers discover relevant products more efficiently while enabling retailers to understand shopping patterns through an integrated web application.",
    src: saraninVideo,
    color: "#FFE58A",
    githubLink: "https://github.com/KlikSaran",
    liveLink: "",
    type: "video",
  },
  {
    title: "Eviasi – Car Detailing & Modification Booking App",
    description:
      "A vehicle service booking application that simplifies car detailing, maintenance, and modification reservations. Eviasi enables customers to explore automotive services, schedule appointments, and discover vehicle care solutions through an intuitive interface.",
    src: eviasiImage,
    color: "#ED649E",
    githubLink: "https://github.com/akusuma11/eviasi",
    liveLink: "",
    type: "image",
  },
];

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    // Add specific styles for 1366x768 resolution
    const style = document.createElement("style");
    style.textContent = `
      @media screen and (width: 1366px) and (height: 768px),
             screen and (width: 1367px) and (height: 768px),
             screen and (width: 1368px) and (height: 769px) {
        .project-card {
          scale: 0.85;
          margin-top: -5vh;
        }
        .project-container {
          height: 90vh;
        }
      }
    `;
    document.head.appendChild(style);

    // Resolution check function
    const checkResolution = () => {
      const isTargetResolution =
        window.innerWidth >= 1360 &&
        window.innerWidth <= 1370 &&
        window.innerHeight >= 760 &&
        window.innerHeight <= 775;

      if (isTargetResolution) {
        document.documentElement.style.setProperty("--project-scale", "0.85");
        document.documentElement.style.setProperty("--project-margin", "-5vh");
      } else {
        document.documentElement.style.setProperty("--project-scale", "1");
        document.documentElement.style.setProperty("--project-margin", "0");
      }
    };

    checkResolution();
    window.addEventListener("resize", checkResolution);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("resize", checkResolution);
    };
  }, []);

  return (
    <ReactLenis root>
      <main className="bg-black" ref={container}>
        <section className="text-white w-full bg-slate-950">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
  key={project.title}
  i={i}
  url={project.src}
  type={project.type}
  title={project.title}
  color={project.color}
  description={project.description}
  progress={scrollYProgress}
  range={[i * 0.25, 1]}
  targetScale={targetScale}
  githubLink={project.githubLink}
  liveLink={project.liveLink}
/>
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}

function Card({
  i,
  title,
  description,
  url,
  type,
  color,
  progress,
  range,
  targetScale,
  githubLink,
  liveLink,
}) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
   
<div className="w-full md:w-[55%] h-[250px] md:h-[400px] lg:h-[450px] relative overflow-hidden bg-zinc-800">
  {type === "video" ? (
    <motion.video
      key={url}
      src={url}
      className="w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
    >
      Your browser does not support HTML video.
    </motion.video>
  ) : (
    <motion.img
      key={url}
      src={url}
      alt={title}
      className="w-full h-full object-cover"
      loading="lazy"
      decoding="async"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
      onError={(event) => {
        console.error("Gagal memuat gambar:", url);
        event.currentTarget.style.visibility = "hidden";
      }}
    />
  )}

  <motion.div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundColor: color,
      mixBlendMode: "overlay",
    }}
    initial={{ opacity: 0 }}
    whileHover={{ opacity: 0.3 }}
    transition={{ duration: 0.3 }}
  />

  <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/50 backdrop-blur-md text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
    Project {i + 1}
  </div>
</div>

          {/* Content section - full width on mobile, 45% on desktop */}
          <div className="w-full md:w-[45%] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div className="h-[1px] w-12 md:w-20 bg-gray-600" />
              </div>

              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4">
                {title}
              </h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed line-clamp-3 md:line-clamp-none max-w-md">
                {description}
              </p>
            </div>

            <div className="mt-4 md:mt-auto pt-4">
              <div className="w-full h-[1px] bg-gray-800 mb-4 md:mb-6" />

              <div className="flex items-center gap-4">
                {/* GitHub Link */}
                <motion.a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span
                    className="text-xs md:text-sm font-medium"
                    style={{ color }}
                  >
                    Code
                  </span>
                </motion.a>

                {/* Live Link */}
                <motion.a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <span
                    className="text-xs md:text-sm font-medium"
                    style={{ color }}
                  >
                    Live
                  </span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Add PropTypes validation
Card.propTypes = {
  type: PropTypes.oneOf(["image", "video"]).isRequired,
  i: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  progress: PropTypes.object.isRequired,
  range: PropTypes.array.isRequired,
  targetScale: PropTypes.number.isRequired,
  githubLink: PropTypes.string.isRequired,
  liveLink: PropTypes.string.isRequired,
};
