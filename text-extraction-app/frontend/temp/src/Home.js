import React, { useState } from "react";
import axios from "axios";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
// import Pager from "./Pager";
import Bargraph from "./Bargraph";
import Doughnut from "./Doughnut";
import bgHome from "./Assets/bgHome.png";
import "./App.css";
import { useNavigate } from 'react-router-dom';


const faqs = [
  {
    question:
      " How does the AI model determine which IPC and CrPC charges to suggest?",
    answer:
      "The AI model analyzes the content of FIRs and CCTNS reports using natural language processing to identify relevant legal terms and contextual information. It then cross-references this data with a legal database to suggest the most applicable IPC and CrPC charges.",
  },
  {
    question:
      " Can the AI handle FIRs and CCTNS reports that are handwritten or in non-digital formats?",
    answer:
      "Yes, our AI model includes OCR (Optical Character Recognition) capabilities to convert non-digital documents into a machine-readable format before analysis.",
  },
  {
    question:
      "What level of accuracy does the AI model have in suggesting charges?",
    answer:
      "Our AI model is continuously trained on a wide range of legal documents to improve its accuracy. While it provides a high level of precision, we recommend all suggestions be reviewed by a legal professional.",
  },
  // Add more FAQ items here
];

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-700">
      <button
        className="flex justify-between items-center w-full py-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl text-white">{faq.question}</span>
        <span className="text-xl text-white">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="pb-5 text-white text-opacity-90">{faq.answer}</div>
      )}
    </div>
  );
};

const FAQSection = () => {
  return (
    <div className="bg-gray-900 px-36 py-10">
      <h2 className="text-3xl text-white mb-6">Frequently asked questions</h2>
      <div>
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} />
        ))}
      </div>
    </div>
  );
};

const SupportCenterSection = () => {
  return (
    <div className="bg-gray-900 text-white mt-22 mb-18 px-36 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-normal mb-4">About Us</h1>
        <p className="text-xl">
          Our project, conceived and developed for the Rajasthan Police
          Hackathon, stands as a testament to our commitment to public safety
          and judicial efficiency. We've poured our academic knowledge and
          youthful enthusiasm into building an AI model that simplifies legal
          processes and empowers law enforcement.
        </p>
      </div>
    </div>
  );
};

const FooterBase = () => {
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
    { name: "Vidhi", twitter: "#", github: "#", linkedin: "#" },
  ];

  return (
    <div className="bg-gray-900 text-white  py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-2 px-24 text-center md:text-left">
        {/* Source Code Column */}
        <div>
          <h3 className="text-xl font-bold mb-3">Source Code</h3>
          {/* Replace '#' with your source code link */}
          <a href="#" className="hover:text-gray-300">
            View on GitHub
          </a>
        </div>
        {/* Developer Columns */}
        {developers.map((dev, index) => (
          <div key={index}>
            <h3 className="text-xl font-bold mb-3">{dev.name}</h3>
            <div className="flex justify-center md:justify-start items-center px-20 space-x-2">
              <a href={dev.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href={dev.github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function Home() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [ipcSuggestions, setIpcSuggestions] = useState([]);
  const [uploading, setUploading] = useState(false);

  let navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/extract",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data.result);

      // After extracting text, send a request to get IPC suggestions from Flask
      const ipcResponse = await axios.post(
        "http://localhost:5000/suggest_ipc",
        { extracted_text: response.data.result }
      );

      // Ensure ipcResponse.data.ipc_suggestions is an array
      let suggestions = ipcResponse.data.ipc_suggestions;
      if (typeof suggestions === "string") {
        suggestions = suggestions
          .split(/\d+\./)
          .slice(1)
          .map((s) => s.trim())
          .filter((s) => s);
      }
      setIpcSuggestions(suggestions);

      navigate('/result', { state: { result: response.data.result, ipcSuggestions: suggestions } });


    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }

    setUploading(false);
  };

  return (
    <div className="main min-h-lvh">
      <div className="pt-4 px-36">
        <div
          className="text-left text-orange-400 text-2xl font-medium"
          style={{ fontFamily: "Chillax" }}
        >
          ReportEase
        </div>
      </div>

      <div className="grid grid-cols-4 px-36 pt-28">
        <div className="col-span-2 mb-12">
          <p className="text-7xl text-white font-semibold">
            Automated Legal Insights
          </p>
          <p className="pt-2 text-7xl text-white font-semibold"></p>

          <p className="pt-4 text-2xl text-slate-500 font-normal">
            Harnessing AI to decode legal complexities and empower judicial
            efficiency.{" "}
          </p>
          <p className="text-2xl text-slate-500 font-normal">
            We interpret legal documents and automate charge suggestions,
            streamlining the path to justice.
          </p>

          <div className="flex relative mt-6 rounded-md shadow-sm">
            <input
              type="file"
              accept=".pdf, .png, .jpg, .jpeg"
              className="bg-gray-500  mt-8 block w-1/2 rounded-md border-0 py-1.5 pl-7 pr-20 text-white placeholder:text-gray-500 sm:text-sm sm:leading-6 file:bg-gray-500 file:border-none  file:text-gray-100 file:cursor-pointer   file:-ml-4"
              onChange={handleFileChange}
            />
            <div
              className="inline-block mx-2 mt-8 px-10 py-2.5 text-sm font-medium text-white bg-blue-600 hover:cursor-pointer  rounded active:text-blue-500 hover:bg-red-500  hover:text-blue-600 focus:outline-none"
              onClick={handleUpload}
              disabled={uploading}
            >
              Upload
            </div>
          </div>

          <p className="mt-2 ml-2 text-md text-slate-200 font-light ">
            Your File can take some time to scan.
          </p>
        </div>

        <div className="col-span-2">
          <img src={bgHome} className="pt-32 object-fill w-240 " alt="Insert" />
        </div>
      </div>

      <div className="px-36">
        <div className="mt-20 mb-6">
          <h1 className="text-left text-slate-200 text-3xl font-normal">
            Crime-Analytics
          </h1>
          <h1 className="text-left text-slate-400 text-md font-light">
            Finding Patterns...
          </h1>
        </div>

        <div className="pb-8 grid gap-2 xl:grid-cols-2 md:grid-cols-1">
          <div className="p-4 w-full shadow-lg rounded-lg bg-gray-900">
            <Bargraph />
          </div>
          <div className="p-4  w-full shadow-lg rounded-lg bg-gray-900">
            <div className="m-auto w-2/3">
              <Doughnut />
            </div>
          </div>
        </div>
      </div>

      <SupportCenterSection />
      <FAQSection />
      <FooterBase />
    </div>
  );
}

export default Home;