import React from "react";
import "./SingleCard.css";

const SingleCard = (props) => {
  const { card, handelChoice, flipped, disabled } = props;

  const handleClick = () => {
    !disabled && handelChoice(card);
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/img/cover.png"
          onClick={handleClick}
          alt="cover"
        />
      </div>
    </div>
  );
};

export default SingleCard;
