import React, { useState, useEffect, createContext, useContext } from "react";
import "../../../style/App.css";
import NavigationBar from "../../../components/centra/CentraNavbar";
import AddWetLeaves from "./AddWetLeaves";
import WashWetLeaves from "./WashWetLeaves";
import DryWetLeaves from "./DryWetLeaves";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getWetLeaves } from "../../../../api/centraAPI"

import frameAdd from "../../../../src/assets/AddPage/frameAdd.svg";
import backArrow from "../../../../src/assets/common/backarrow.svg";

function WetLeavesManager() {
  const [currentSection, setCurrentSection] = useState("add");
  const [isMobile, setIsMobile] = useState(false);
  const [wetLeaves, setWetLeaves] = useState([])
  const nav = useNavigate();
  const navigate = useNavigate();

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 600);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isMobile) {
        navigate('/warningpage');
      } 
    }, 750);

    return () => clearTimeout(timeout);
  }, [isMobile, navigate]);

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  const handleBack = () => {
    nav("/centradashboard");
  }

  return (
    <div>
        {isMobile && (
          <>
            <div className="overflow-auto h-[calc(100vh-6rem)] md:h-auto bg-quaternary min-h-screen flex flex-col items-center overflow-auto resize-none pb-36">
              <img src={frameAdd} className="fixed w-screen z-0"></img>
              <div className="flex pt-16 gap-11 pr-20 z-10">
                {currentSection === "add" ? (
                    <img src={backArrow} onClick={handleBack}></img>
                  ) : (
                    <img src={backArrow} onClick={() => handleSectionChange("add")}></img>
                  )}
                <p className="font-bold text-primary text-3xl">Wet Leaves</p>
              </div>

              <br></br>

              <div className="bg-white w-2/3 rounded-full z-20">
                <div className="flex text-s  font-medium p-1 relative">
                  <motion.div
                    layout
                    className={`absolute h-5/6 w-1/3 bg-tertiary rounded-full ${
                      currentSection === "add" ? "mx-auto" : currentSection === "wash" ? "left-1/3" : "right-1"
                    }`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  {["add", "wash", "dry"].map((section) => (
                    <div
                      key={section}
                      className={`w-24 p-1 cursor-pointer text-center z-40 ${
                        currentSection === section ? "text-white" : ""
                      }`}
                      onClick={() => handleSectionChange(section)}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </div>
                  ))}
                </div>
              </div>

              <br></br>

              <AnimatePresence mode="wait">
                {currentSection === "add" && (
                  <motion.div
                    key="add"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AddWetLeaves />
                  </motion.div>
                )}
                {currentSection === "wash" && (
                  <motion.div
                    key="wash"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <WashWetLeaves />
                  </motion.div>
                )}
                {currentSection === "dry" && (
                  <motion.div
                    key="dry"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DryWetLeaves />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <NavigationBar />
          </>
        )}
    </div>
  );
}

export default WetLeavesManager;
