import { AiFillStar, AiOutlineStar } from "react-icons/ai";

/**
 * @brief
 * This returns the state of the stars filter ONLY
 */

const Rating = ({ rating, onClick, style }) => {
  return (
    <>
      {/* Array map for the amount of stars (rating) 
        If rating is more than the index, then the filled in star icon will appear
        Else, it will display the hollow star shape*/}
      {[...Array(5)].map((_, i) => (
        <span key={i} onClick={() => onClick(i)} style={style}>
          {rating > i ? (
            <AiFillStar fontSize="15px" />
          ) : (
            <AiOutlineStar fontSize="15px" />
          )}
        </span>
      ))}
    </>
  );
};

export default Rating;
