const shipFactory = (length) => {
  let hit = [];
  const hitShip = (position) => {
    hit.push(position);
  };
  const isSunk = () => {
    return hit.length === length;
  };
  return { length, hit, hitShip, isSunk };
};


export default shipFactory;