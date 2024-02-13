import React, { useState } from "react";
import axios from "axios";
import Bargraph from "./Bargraph";
import Doughnut from "./Doughnut";
import bgHome from "./Assets/bgHome.png";
import SupportCenterSection from "./SupportCenterSection";
import FAQs from "./FAQs.js";
import Footer from "./Footer.js";
import "./App.css";
import { NavLink } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";
import Navbar from "./Navbar.js";

function Homepage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [ipcSuggestions, setIpcSuggestions] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generate, setGenerate] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setLoading(true);
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
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }

    setUploading(false);
    setLoading(false);
    setGenerate(true);
  };

  return (
    <>
      <Navbar />
      <div className="main min-h-lvh">
        

        <div className="grid grid-cols-4 px-36 pt-20">
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
                {uploading ? "Uploading..." : "Upload"}
              </div>
            </div>

            <p className="mt-2 ml-2 text-md text-slate-200 font-light ">
              Your file can take some time to scan.
            </p>
            {generate ? (
              <div>
                <NavLink
                  to="/data"
                  state={{
                    result: result,
                    ipcSuggestions: ipcSuggestions,
                  }}
                >
                  <div className="inline-block mx-2 mt-8 px-10 py-2.5 text-sm font-medium text-white bg-blue-600 hover:cursor-pointer  rounded active:text-blue-500 hover:bg-red-500  hover:text-blue-600 focus:outline-none">
                    Generate Report
                  </div>
                </NavLink>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <div className="col-span-2">
            <img
              src={bgHome}
              className="pt-32 object-fill w-240 "
              alt="Insert"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            {" "}
            <ProgressBar size={12} />{" "}
          </div>
        ) : (
          <div></div>
        )}

        <div id="analytics" className="px-36">
          <div className="mt-20 mb-6">
            <h1 className="text-left text-slate-200 text-3xl font-normal">
              Crime-Analytics Based on CCTNS Data
            </h1>
            <h1 className="text-left text-slate-400 text-md font-light">
              Finding Patterns...
            </h1>
          </div>

          <div  className="pb-8 grid gap-2 xl:grid-cols-2 md:grid-cols-1">
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
        <FAQs />
        <Footer />
      </div>
    </>
  );
}

export default Homepage;