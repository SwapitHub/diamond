import React, { useState } from 'react'
import Slider from 'react-slider';

const colorOptions = ['J', 'I', 'H', 'G', 'F', 'E', 'D'];

const clarityOptions = ['SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF', 'FL'];

const cutOptions=['Fair','Good','Very Good','Ideal','Super Ideal'];

const min = 0
const max = colorOptions.length - 1;

const claritymin = 0;
const claritymax = clarityOptions.length - 1;

const cutmin = 0;
const cutmax = cutOptions.length - 1;

const ColorClarityCut = () => {

    const [selectedLetterIndex, setSelectedLetterIndex] = useState([min, max]);
    const[selectedclarityIndex,setselectedclarityIndex]=useState([claritymin,claritymax]);
    const[selectedcutIndex,setselectedcutIndex]=useState([cutmin,cutmax]);

    return (
        <>
            <div className="container">
                <h1>This is the Color clarity page</h1>
                <div className="main-content-p">
                <p>COLOR</p>
                    <Slider
                        min={min}
                        max={max}
                        step={1}
                        value={selectedLetterIndex}
                        onChange={setSelectedLetterIndex}
                        trackStyle={{ backgroundColor: '#007BFF' }}
                    />
                    <h1>{`${colorOptions[selectedLetterIndex[0]]}`}</h1>
                </div>

                <div className="main-content-p">
                <p>CLARITY</p>
                    <Slider
                        min={claritymin}
                        max={claritymax}
                        step={1}
                        value={selectedclarityIndex}
                        onChange={setselectedclarityIndex}
                        trackStyle={{ backgroundColor: '#007BFF' }}
                    />
                    <h1>{`${clarityOptions[selectedclarityIndex[0]]}`}</h1>
                </div>
                
                <div className="main-content-p">
                <p>Cut</p>
                    <Slider
                        min={cutmin}
                        max={cutmax}
                        step={1}
                        value={selectedcutIndex}
                        onChange={setselectedcutIndex}
                        trackStyle={{ backgroundColor: '#007BFF' }}
                    />
                    <h1>{`${cutOptions[selectedcutIndex[0]]}`}</h1>
                </div>
            </div>
        </>
    )
}
export default ColorClarityCut
