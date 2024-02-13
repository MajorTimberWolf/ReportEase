import React from 'react'
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    const developers = [
      {
        name: "Varun",
        twitter: "https://twitter.com/Varunsingh2534",
        github: "https://github.com/varun-2538",
        linkedin: "https://www.linkedin.com/in/varun-singh-422a27206/",
      },
      {
        name: "Abhinav",
        twitter: "https://twitter.com/MajorTimbWlf21",
        github: "https://github.com/MajorTimberWolf",
        linkedin: "https://www.linkedin.com/in/abhinav-rajeev-kumar/",
      },
      {
        name: "Milind",
        twitter: "https://twitter.com/i_milindmishra",
        github: "https://github.com/imilindmishra",
        linkedin: "https://www.linkedin.com/in/milind-mishra-2a3b23257/",
      },
      {
        name: "Vidhi",
        twitter: "https://x.com/_vidhisingh?t=4tlz6w2QSacEUv6tLI1JlA&s=09",
        github: "https://github.com/vidhisingh14",
        linkedin: "https://www.linkedin.com/in/vidhi-singh-75963024a",
      },
    ];

    return (
      <div id="developers" className="bg-gray-900 text-white  py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-2 px-24 text-center md:text-left"></div>
        {/* Source Code Column */}
        <div className="w-1/2 m-auto text-center mb-2">
          <h3 className="text-xl font-bold pb-1">Source Code</h3>
          <div>
            <a
              href="https://github.com/Varun-2538/RJPOLICE_HACK_1212_Gallants_4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 w-3/4 m-auto"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          {developers.map((dev, index) => (
            <div className="w-fit" key={index}>
              <h3 className="flex text-xl justify-center items-center font-bold mb-2">
                {dev.name}
              </h3>
              <div className="flex justify-center md:justify-start items-center px-20 space-x-2">
                <a href={dev.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
                <a href={dev.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a
                  href={dev.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Footer
