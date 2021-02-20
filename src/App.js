import { useState, useEffect } from "react";
import Animal from "./animals";
import Goldfish from "./images/goldfish.jpg";
import Eel from "./images/eel.jpg";
import Whale from "./images/whale.jpg";
import Porthole from "./Porthole";
import PortholeImage from "./images/porthole.png";
import BunkerMap from "./images/bunker-map.jpg";

function App() {
  const [watts, updateWatts] = useState(0);
  const startingAnimals = new Map();

  startingAnimals.set("Goldfish", new Animal("Goldfish", 20, 2, Goldfish));
  startingAnimals.set("Eels", new Animal("Eels", 50, 7, Eel));
  startingAnimals.set("Whales", new Animal("Whales", 70, 9, Whale));

  const [animals, updateAnimals] = useState(startingAnimals);

  useEffect(() => {
    const tick = setInterval(() => {
      let total = 0;

      animals.forEach((animal) => {
        total += animal.calculateWatts();
      });

      updateWatts(watts + total);
    }, 1000);

    return () => clearInterval(tick);
  });

  const animalsList = [...animals.values()];

  return (
    <div>
      <div className="container">
        <div className="columns">
          <div className="column col-4 text-center">
            <img src={BunkerMap} className="bunker-map mt-2" alt="bunker map" />
          </div>
          <div className="column col-4 text-center">
            <Porthole />
            <img className="porthole-img" src={PortholeImage} alt="porthole" />

            <div className="instructions">
              <h1> Ocean Watt </h1>
              <p>
                you have a bunker at the bottom of the ocean. you go there but
                once you get there the exit collapses and you can't get out! you
                need 50,000 watts to power a submarine at the base.
              </p>

              <h2>You have {watts} watts.</h2>

              <button onClick={() => updateWatts(watts + 1)} className="btn">
                Press the hand crank
              </button>
            </div>
          </div>
          <div className="column col-4 text-center">
            {animalsList.map((animal, index) => (
              <div
                key={`${index}${animal.name}`}
                className="mt-2 p-2 buy-item tile tile-centered"
              >
                <div className="tile-icon">
                  <img
                    width="100"
                    src={animal.picture}
                    className="img-fit-contain"
                    alt={animal.name}
                  />
                </div>
                <div className="tile-content">
                  <div className="tile-title">
                    {animal.name} - {animal.amount}
                  </div>
                  <small className="tile-subtitle text-gray">
                    {animal.cost} Watts - Swims for {animal.wattsPerSecond}{" "}
                    watts/second
                  </small>
                </div>
                <div className="tile-action">
                  <button
                    onClick={() => {
                      let updateAnimal = animals.get(animal.name);
                      updateAnimal.amount += 1;

                      animals.set(animal.name, updateAnimal);
                      updateAnimals(animals);

                      updateWatts(watts - animal.cost);
                    }}
                    disabled={watts < animal.cost}
                    className="btn btn-link"
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
