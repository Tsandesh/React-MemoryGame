import "./App.css";
import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
  {
    src: "https://raw.githubusercontent.com/Tsandesh/React-MemoryGame/main/public/img/chiru.jpeg",
    matched: false,
  },
  {
    src: "https://raw.githubusercontent.com/Tsandesh/React-MemoryGame/main/public/img/susil.jpeg",
    matched: false,
  },
  {
    src: "https://raw.githubusercontent.com/Tsandesh/React-MemoryGame/main/public/img/Bikram.jpg",
    matched: false,
  },
  {
    src: "https://raw.githubusercontent.com/Tsandesh/React-MemoryGame/main/public/img/Thapa.jpg",
    matched: false,
  },
  {
    src: "https://raw.githubusercontent.com/Tsandesh/React-MemoryGame/main/public/img/gandu.jpg",
    matched: false,
  },
  {
    src: "https://raw.githubusercontent.com/Tsandesh/React-MemoryGame/main/public/img/amrit.jpeg",
    matched: false,
  },
  {
    src: "https://raw.githubusercontent.com/Tsandesh/React-MemoryGame/main/public/img/Joe.jpg",
    matched: false,
  },
  {
    src: "https://raw.githubusercontent.com/Tsandesh/React-MemoryGame/main/public/img/pudel.png",
    matched: false,
  },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  };

  //handle a Choice
  const handelChoice = (card) => {
    choiceOne && choiceOne !== card ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  //reset choices and increase turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  //start new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handelChoice={handelChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns :{turns}</p>
    </div>
  );
}

export default App;
