const shipFactory = (length, shipName) => {
  const name = shipName;
  let hit = [];
  let placed = false;
  const hitShip = (position) => {
    hit.push(position);
  };
  const isSunk = () => {
    return hit.length === length;
  };
  return { length, name, hit, placed, hitShip, isSunk };
};


export default shipFactory;