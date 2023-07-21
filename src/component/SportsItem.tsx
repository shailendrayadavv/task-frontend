import { useNavigate } from "react-router-dom";
import { ISportsItem } from "./SportsCard";

interface IProps {
  details: ISportsItem;
}
export const SportsItem = ({ details }: IProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/competitions?sport=${details.name}&id=${details.id}`);
  };

  return (
    <div onClick={handleClick} id="sportsItem">
      <>{details.name}</>
    </div>
  );
};
