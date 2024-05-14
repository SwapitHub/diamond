import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';

export const Accordion = () => {
    const [selected, setSelected] = useState(null);
    
    const toggle = (i) => {
        if (selected === i) {
            setSelected(null);
        } else {
            setSelected(i);
        }
    }

    return (
        <section className='Accordion-main Accordion' id='Accordion'>
            <div className='container'>
                <div className="faq">
                    <div className='accordion'>
                        <div className='item'>
                            <div className='title' onClick={() => toggle(1)}> {/* Pass the index 1 as an example */}
                                <Link to="/">my name</Link>
                                <span>{selected === 1 ? <BiUpArrow/> : <BiDownArrow/>}</span>
                            </div>

                            <div className={selected === 1 ? 'content-show' : 'content'}>
                                <Link to="/">name1</Link>
                                <div className='mobile-nav'>
                                    <Link to="/">name1</Link>
                                    <Link to="/">name1</Link>
                                    <Link to="/">name1</Link>
                                </div>
                            </div>                            
                        </div>

                        <div className='item'>
                            <div className='title' onClick={() => toggle(2)}> {/* Pass the index 1 as an example */}
                                <Link to="/">my name</Link>
                                <span>{selected === 2 ? <BiUpArrow/> : <BiDownArrow/>}</span>
                            </div>

                            <div className={selected === 2 ? 'content-show' : 'content'}>
                                <Link to="/">name2</Link>
                                <div className='mobile-nav'>
                                    <Link to="/">name2</Link>
                                    <Link to="/">name2</Link>
                                    <Link to="/">name2</Link>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
