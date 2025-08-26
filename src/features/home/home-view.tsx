"use client"

import { useState } from "react"
import { Stocktable } from "./component/Stocktable";

export const HomeView = () =>{

    const [ sector , setSector ] = useState<string>("Financial");

    // Function to handle sector chang using radio input
    const handleSectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSector(e.target.value);
    }

    return(
        <div className="w-full h-full  p-[20px] flex flex-col gap-10">
            
            {/* Select Sector section */}
            <div className="flex gap-6 w-max h-max items-center">
                <span className="font-readex text-lg">Select Sector:</span>

                {/* first option */}
                <div className="flex items-center gap-4 w-max h-max">
                    <input type="radio" id="financial" value={"Financial"} checked={sector === "Financial"} onChange={handleSectorChange}/>
                    <label htmlFor="financial" className="font-readex">Financial</label>
                </div>

                {/* Second option */}
                <div className="flex items-center gap-4 w-max h-max">
                    <input type="radio" id="technical" value={"Technical"} checked={sector === "Technical"} onChange={handleSectorChange}/>
                    <label htmlFor="technical" className="font-readex">Technical</label>
                </div>

                {/* Third option */}
                <div className="flex items-center gap-4 w-max h-max">
                    <input type="radio" id="consumer" value={"Consumer"} checked={sector === "Consumer"} onChange={handleSectorChange}/>
                    <label htmlFor="consumer" className="font-readex">Consumer</label>
                </div>

                {/* Fourth option */}
                <div className="flex items-center gap-4 w-max h-max">
                    <input type="radio" id="power" value={"Power"} checked={sector === "Power"} onChange={handleSectorChange}/>
                    <label htmlFor="power" className="font-readex">Power</label>
                </div>

                {/* Fifh option */}
                <div className="flex items-center gap-4 w-max h-max">
                    <input type="radio" id="pipe" value={"Pipe Sector"} checked={sector === "Pipe Sector"} onChange={handleSectorChange}/>
                    <label htmlFor="pipe" className="font-readex">Pipe Sector</label>
                </div>

                {/* Sixth option */}
                <div className="flex items-center gap-4 w-max h-max">
                    <input type="radio" id="others" value={"Others"} checked={sector === "Others"} onChange={handleSectorChange}/>
                    <label htmlFor="others" className="font-readex">Others</label>
                </div>
            </div>

            {/* Table */}
            <Stocktable sector={sector} />

        </div>
    )
}