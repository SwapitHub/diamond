import axios from "axios";
import { React, useState, useEffect, useContext } from "react";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import DOMPurify from "dompurify";
import { UserContext } from "../../App";

export const GemstoneFaq = () => {
    const [selected, setSelected] = useState(null);
    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }

        setSelected(i)
    }
    const {baseUrl} = useContext(UserContext)
    // diamond shape
    const [shapeData, setShapeData] = useState([]);
    // console.log(shapeData);
    useEffect(() => {
        axios
            .get(
                `${baseUrl}/faq`
            )
            .then((res) => {
                setShapeData(res.data.data);
                console.log(res.data.data);
            })
            .catch(() => {
                console.log("API error");
            });
    }, []);
    return (
        <section className="Accordian-main Accordian wedding-page" id="Accordian">
            <div className="container">
            <div class="heading-sec"><h2 class="heading-text">Gemstone FAQs</h2></div>
                <div className="faq">
                    <div className="accordinan">
                        {shapeData.map((faqItem, i) => {
                            return (
                                <div className="item">
                                    <div className="title" onClick={() => toggle(i)}>
                                        <p>{faqItem.question}</p>
                                        <span>
                                            {selected === i ? <BiUpArrow /> : <BiDownArrow />}
                                        </span>
                                    </div>

                                    <div className={selected === i ? "content-show" : "content"}>
                                        <div
                                            key={faqItem.id}
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(faqItem.answer),
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
