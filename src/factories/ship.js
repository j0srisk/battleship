const shipFactory = (length, shipName) => {
  const name = shipName;
  const hit = [];
  const placed = false;
  const hitShip = (position) => {
    hit.push(position);
  };
  const isSunk = () => hit.length === length;
  return {
    length, name, hit, placed, hitShip, isSunk,
  };
};

export default shipFactory;
