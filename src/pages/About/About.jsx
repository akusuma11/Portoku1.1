import HeroImg from "@/assets/images/ftkuuu.png";
import OlovaLogo from "@/assets/images/olova.png";

export default function About() {
  return (
    <>
      <section id="about" className="py-16 md:py-12  text-white bg-[#04081A]">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl text-white">
            Full-Stack Developer, UI/UX Enthusiast, Tech Creator, Problem Solver
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative mb-6 sm:mb-0">
              <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl p-px from-zinc-300 to-transparent">
                <img
                  src={HeroImg}
                  className="rounded-[15px] shadow block"
                  alt="payments illustration"
                  width={1207}
                  height={929}
                />
              </div>
            </div>

            <div className="relative space-y-4">
              <p className="text-white">
                Hello! I'm a passionate Full-Stack Developer and Informatics Engineering graduate focused on building modern, functional, and user-friendly digital experiences. I enjoy turning ideas into web applications by combining frontend development, backend development, database management, and thoughtful UI/UX design.{" "}
              </p>
              <p className="text-white">
               My technical interests include JavaScript, Vue.js, PHP, Laravel, MySQL, Flutter, and Figma. I enjoy working across the development process, from designing interfaces and building responsive frontend experiences to developing backend systems and connecting applications with databases.
               </p>
              <div className="pt-6">
                <blockquote className="border-l-4 border-gray-300 pl-4">
                  <p className="text-white">
                    I'm a lifelong learner who enjoys exploring new technologies, solving problems, and turning ideas into practical digital solutions. I believe good software is not only about how it works, but also about how easily and comfortably people can use it. My goal is to keep growing as a Full-Stack Developer while creating applications that are useful, reliable, and enjoyable to use.
                    </p>
                  <div className="mt-6 space-y-3">
                    <cite className="block font-medium text-white">
                      Andhung Gusti,
                    </cite>
                    {/* <div className="flex items-center gap-2">
                      <img
                        className="h-5 w-fit"
                        src={OlovaLogo}
                        alt="Olova Logo"
                        height="20"
                        width="auto"
                      />
                      <span className="text-white">OlovaJS</span>
                    </div> */}
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
