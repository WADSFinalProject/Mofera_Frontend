import React, { useEffect, useState } from "react";
import "../../style/App.css";
import { useNavigate } from "react-router-dom";
import { Dropdown } from 'primereact/dropdown';
import NavigationBar from "../../components/Navbar.jsx";

function AddMachine() {
  const [weight, setWeight] = useState(0);
  const [date, setDate] = useState(new Date());
  const [isMobile, setIsMobile] = React.useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const navigate = useNavigate();

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 600);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBack = () => navigate("/dashboard");

  const handleEdit = () => navigate("/editmachine");

  const machines = [
    { label: 'Drying', value: 'drying' },
    { label: 'Flouring', value: 'flouring' },
];

  return (
    <div>
      {isMobile && (
        <>
          <div className="overflow-auto h-[calc(100vh-6rem)] md:h-auto bg-quaternary min-h-screen flex flex-col items-center overflow-auto resize-none pb-24">
            <img src={"src/assets/common/addCurveLeft.svg"} className="w-screen absolute"/>
            <img src={"src/assets/common/addCurveRight.svg"} className="w-screen absolute"/>

            <button onClick={handleBack} className="relative -top-5 -left-40 text-gray-600 text-sm font-semibold z-10 mt-8 md-flex">
                    <img src={"src/assets/history/back.svg"} alt="back" className="w-8 mt-8 " />
            </button>
            <h1 className="text-3xl font-bold text-green-900 z-10 relative -top-14 -bottom-20">Machine</h1>

            <div className="content flex flex-col items-center">
            <div class="inline-flex">
              <button class="bg-green-600 text-white font-medium py-2 px-16 rounded-l-2xl">
                Add
              </button>
              <button onClick={handleEdit} class="bg-white text-gray-800 font-medium py-2 px-16 rounded-r-2xl">
                Edit
              </button>
            </div>

              <div>
                <p className="items-center p-3 font-semibold text-green-700 mt-4">
                  Add a New Machine
                </p>
              </div>

              <div className="total-dried-leaves-daily bg-white p-4 rounded-xl shadow-md z-50">
                <div className="weight flex-column items-center">
                <span className="text-gray-500 p-2">Machine Type:</span>
                    <Dropdown
                        value={selectedMachine}
                        onChange={(e) => setSelectedMachine(e.value)}
                        optionLabel="label"
                        options={machines}
                        placeholder="Select a machine"
                        className="bg-green-700 bg-opacity-20 text-green-800 rounded-lg px-4 py-1 mr-2"
                    />

                <br/>   

                <span className="text-gray-500 p-2 mt-5">Weight Capacity:</span>
                  <input
                    type="number"
                    value={weight}
                    onChange={handleWeightChange}
                    className="bg-green-700 bg-opacity-20 rounded-lg px-2 py-1 mr-2 mt-4"
                  />
                </div>
                
                <button className="bg-green-700 hover:bg-green-700 text-white font-bold py-2 px-12 rounded-2xl mt-4">
                  Add
                </button>
              </div>

              <img src={"src/assets/centra/topcurve.svg"} className="w-screen absolute mt-52"/>
              <img src={"src/assets/centra/midcurve.svg"} className="w-screen absolute mt-72"/>
              <img src={"src/assets/centra/botcurve.svg"} className="w-screen absolute mt-80"/>
              <img src={"src/assets/centra/mascotCent.svg"} className="absolute mr-80 mt-52 z-50 -rotate-6"/>

            </div>
          </div>
          
          <NavigationBar/>
        </>

      )}

    </div>
  );
}

export default AddMachine;