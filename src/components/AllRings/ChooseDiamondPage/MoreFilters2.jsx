import React, { useState } from 'react'
import Slider from 'react-slider';

const flurosenseOptions = ['very strong', 'strong', 'medium', 'faint', 'none'];
const polishOptions = ['Good', 'Very Good', 'Excellent'];
const SymmetryOptions = ['Good', 'Very Good', 'Excellent'];


const ratiomin = 0;
const ratiomax = 2.75;

const fluromin = 0;
const fluromax = flurosenseOptions.length - 1;

const polishmin = 0;
const polishmax = polishOptions.length - 1;

const Symmetrymin = 0;
const Symmetrymax = SymmetryOptions.length - 1;

const tablemin = 49.00;
const tablemax = 88.00;

const depthmin = 3.60;
const depthmax = 90.70;


const MoreFilters2 = () => {

    const [selectedratio, setSelectedRatio] = useState([ratiomin, ratiomax]);
    const [selectedfluro, setSelectedFluro] = useState([fluromin, fluromax]);
    const [selectedpolish, setSelectedPolish] = useState([polishmin, polishmax]);
    const [selectsymmetry, setSelectedSymmetry] = useState([Symmetrymin, Symmetrymax]);
    const [selectedtable, setSelectedTable] = useState([tablemin, tablemax]);
    const [selecteddepth, setSelectedDepth] = useState([depthmin, depthmax]);


    return (
        <>
            <div className="container">
                <h1>This is the Color clarity page</h1>
                <div className="main-content-p">
                <p>L:W Ratio</p>
                    <Slider
                        min={ratiomin}
                        max={ratiomax}
                        step={0.01}
                        value={selectedratio}
                        onChange={setSelectedRatio}
                    />
                    <h1>{`${selectedratio[0]}`}</h1>
                </div>

                <div className="main-content-p">
                <p>Flurosense</p>
                    <Slider
                        min={fluromin}
                        max={fluromax}
                        step={1}
                        value={selectedfluro}
                        onChange={setSelectedFluro}
                    />
                    <h1>{`${flurosenseOptions[selectedfluro[0]]}`}</h1>
                </div>

               
                <div className="main-content-p">
                <p>Polish</p>
                    <Slider
                        min={polishmin}
                        max={polishmax}
                        step={1}
                        value={selectedpolish}
                        onChange={setSelectedPolish}
                    />
                    <h1>{`${polishOptions[selectedpolish[0]]}`}</h1>
                </div>

               
                <div className="main-content-p">
                <p>Symmetry</p>
                    <Slider
                        min={Symmetrymin}
                        max={Symmetrymax}
                        step={1}
                        value={selectsymmetry}
                        onChange={setSelectedSymmetry}
                    />
                    <h1>{`${SymmetryOptions[selectsymmetry[0]]}`}</h1>
                </div>

                
                <div className="main-content-p">
                <p>Table%</p>
                    <Slider
                        min={tablemin}
                        max={tablemax}
                        step={0.01}
                        value={selectedtable}
                        onChange={setSelectedTable}
                    />
                    <h1>{`${selectedtable[0]}`}</h1>
                </div>

                
                <div className="main-content-p">
                <p>Depth %</p>
                    <Slider
                        min={depthmin}
                        max={depthmax}
                        step={0.01}
                        value={selecteddepth}
                        onChange={setSelectedDepth}
                    />
                    <h1>{`${selecteddepth[0]}`}</h1>
                </div>
            </div>
        </>
    )
}

export default MoreFilters2
