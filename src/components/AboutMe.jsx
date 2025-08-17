import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Link } from "react-router-dom";

const AboutMe = () => {
  const [activeItem, setActiveItem] = useState(null);
  const handleItemClick = (itemId) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#f8f6f1] dark:bg-[#181818] py-12 px-2">
      <div className="w-full max-w-2xl bg-white dark:bg-[#232323] rounded-2xl shadow-xl border border-[#e5e2d8] dark:border-[#333] p-8 flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <img
            className="w-28 h-28 rounded-full border-4 border-[#bfa76a] shadow-md mb-4"
            src="/src/images/bgre.png"
            alt="Tabish"
          />
          <h1 className="text-3xl font-serif font-bold text-[#222] dark:text-[#f8f6f1] tracking-wide mb-1">
            Tabish Javed
          </h1>
          <p className="text-lg font-serif text-[#bfa76a] dark:text-[#e5c97b] mb-2">
            Frontend Web Developer
          </p>
          <p className="text-base text-gray-600 dark:text-gray-300 text-center max-w-md">
            Engineering student & aspiring software developer passionate about
            full-stack web development and problem-solving. Experienced in
            React.js, Javascript, Tailwind CSS, Redux, Material-UI, CSS, HTML,
            C++, Bootstrap, Typescript and real-world projects like CodeCompete, FoodZaika, PicLingo.
            5-month DSA at CodeHelp, 200+ coding problems solved.
          </p>
        </div>
        {/* Classic Sections */}
        <div className="w-full flex flex-col gap-4">
          {/* Skills */}
          <div className="border-b border-[#e5e2d8] dark:border-[#333] pb-4">
            <button
              className="w-full flex justify-between items-center py-2"
              onClick={() => handleItemClick("skills")}
            >
              <span className="text-lg font-serif font-semibold text-[#222] dark:text-[#f8f6f1]">
                Skills
              </span>
              {activeItem === "skills" ? (
                <BsChevronUp className="text-[#bfa76a]" />
              ) : (
                <BsChevronDown className="text-[#bfa76a]" />
              )}
            </button>
            {activeItem === "skills" && (
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  "React JS",
                  "JavaScript",
                  "Tailwind",
                  "Redux",
                  "Material-UI",
                  "Git",
                  "CSS3",
                  "HTML5",
                  "C++ & C",
                  "DSA",
                  "OOPS",
                  "DBMS",
                  "OS",
                  "Computer Network",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-1 rounded-full border border-[#bfa76a] text-[#bfa76a] bg-[#faf8f3] dark:bg-[#232323] font-serif text-sm mb-1"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* Socials */}
          <div className="border-b border-[#e5e2d8] dark:border-[#333] pb-4">
            <button
              className="w-full flex justify-between items-center py-2"
              onClick={() => handleItemClick("socials")}
            >
              <span className="text-lg font-serif font-semibold text-[#222] dark:text-[#f8f6f1]">
                Socials
              </span>
              {activeItem === "socials" ? (
                <BsChevronUp className="text-[#bfa76a]" />
              ) : (
                <BsChevronDown className="text-[#bfa76a]" />
              )}
            </button>
            {activeItem === "socials" && (
              <div className="flex gap-6 mt-2 justify-center">
                <Link
                  to="https://www.linkedin.com/in/tabish-javed/" target="_blank"
                  className="hover:opacity-80"
                  aria-label="LinkedIn"
                >
                  <img
                    className="w-8"
                    src="https://i.postimg.cc/ydvzTRdG/2504923.png" 
                  />
                </Link>
                <Link
                  to="https://github.com/tabish-27" target="_blank"
                  className="hover:opacity-80"
                  aria-label="GitHub"
                >
                  <img
                    className="w-8"
                    src="https://i.postimg.cc/DZbMSbGs/2504911.png" 
                    alt="GitHub"
                  />
                </Link>
                <Link
                  to="https://leetcode.com/u/Tabish_javed/" target="_blank"
                  className="hover:opacity-80"
                  aria-label="LeetCode"
                >
                  <img
                    className="w-8"
                    src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
                    alt="LeetCode"
                  />
                </Link>
                <a
                  href="mailto:tabishjaved2030@gmail.com?subject=Hello%20Tabish&body=Hi%20Tabish,%0A%0AI%20would%20like%20to%20connect%20with%20you.%0A%0ABest%20regards,"
                  className="hover:opacity-80"
                  aria-label="Email"
                >
                  <img
                    className="w-8"
                    src="https://i.postimg.cc/bNv1Lf6V/10829119.png"
                    alt="Email"
                  />
                </a>
              </div>
            )}
          </div>
          {/* Resume */}
          <div className="pb-2">
            <button
              className="w-full flex justify-between items-center py-2"
              onClick={() => handleItemClick("resume")}
            >
              <span className="text-lg font-serif font-semibold text-[#222] dark:text-[#f8f6f1]">
                Resume
              </span>
              {activeItem === "resume" ? (
                <BsChevronUp className="text-[#bfa76a]" />
              ) : (
                <BsChevronDown className="text-[#bfa76a]" />
              )}
            </button>
            {activeItem === "resume" && (
              <div className="flex flex-col items-center mt-2">
                <a
                  className="w-full flex justify-center"
                  href="/src/RESUME/RESUME.pdf"
                  download="RESUME.pdf"
                >
                  <button className="flex items-center gap-2 border border-[#bfa76a] text-[#bfa76a] font-serif px-6 py-2 rounded-lg hover:bg-[#faf8f3] dark:hover:bg-[#232323] transition-all duration-200">
                    <img
                      className="w-5"
                      src="https://i.postimg.cc/PqDG0cq1/1092004.png"
                      alt="Resume"
                    />{" "}
                    <span className="font-semibold text-base">
                      Download Resume
                    </span>
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
