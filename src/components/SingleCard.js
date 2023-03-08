import React from "react";

const SingleCard = (props) => {
  const card = props.card;
  const handelChoice = props.handelChoice;

  const handleClick = () => {
    handelChoice(card);
  };

  return (
    <div className="card">
      <div>
        <img className="front" src={card.src} alt="front img" />
        <img
          className="back"
          src="/img/cover.png"
          alt="back img"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;
