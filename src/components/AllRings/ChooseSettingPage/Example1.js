import React, { useState } from 'react';

function Example1() {
    const [activeCards, setActiveCards] = useState([]);

    const cardStyle = {
        display: 'inline-block',
        margin: '10px',
        fontSize: '24px',
        cursor: 'pointer',
        border: '1px solid black',
        padding: '100px'
    };

    const activeStyle = {
        color: 'red'
    };

    const toggleCard = async (id) => {
        const isActive = activeCards.includes(id);
        const apiUrl = isActive
            ? `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/remove_wishlist_item/${id}`
            : 'http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/add_to_wishlist?user_id=28&product_type=ghemstone&gemstone_id=Stock1607097&gemstone_price=6025';

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const updatedActiveCards = isActive
                ? activeCards.filter(cardId => cardId !== id)
                : [...activeCards, data.data.id];
            setActiveCards(updatedActiveCards);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div className="card" style={cardStyle} onClick={() => toggleCard(1)}>
                <i className={`fa fa-heart${activeCards.includes(1) ? ' active' : ''}`} style={activeCards.includes(1) ? activeStyle : {}}></i>
            </div>
            <div className="card" style={cardStyle} onClick={() => toggleCard(2)}>
                <i className={`fa fa-heart${activeCards.includes(2) ? ' active' : ''}`} style={activeCards.includes(2) ? activeStyle : {}}></i>
            </div>
            <div className="card" style={cardStyle} onClick={() => toggleCard(3)}>
                <i className={`fa fa-heart${activeCards.includes(3) ? ' active' : ''}`} style={activeCards.includes(3) ? activeStyle : {}}></i>
            </div>
            <div className="card" style={cardStyle} onClick={() => toggleCard(4)}>
                <i className={`fa fa-heart${activeCards.includes(4) ? ' active' : ''}`} style={activeCards.includes(4) ? activeStyle : {}}></i>
            </div>
        </div>
    );
}

export default Example1;
