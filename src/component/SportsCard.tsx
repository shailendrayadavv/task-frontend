import { useEffect, useState } from "react";
import { SportsService } from "../services/sports";
import { SportsItem } from "./SportsItem";

interface IProps {
  id: string;
}

export interface ISportsItem {
  id: number;
  name: string;
  season: string;
  url: string;
}

export const SportsCard = ({ id }: IProps) => {
  const [sports, setSports] = useState<ISportsItem[]>([]);
  const [allFetched, setAllFetched] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    if (!allFetched) {
      SportsService.getSports({ season: id, page }).then((response) => {
        const newSports = response as ISportsItem[];
        if (!newSports.length) {
          setAllFetched(true);
        } else {
          setSports([...sports, ...newSports]);
        }
        setIsloading(false);
      });
    }
  }, [page]);

  const handleClick = () => {
    if (!allFetched) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    setSports([]);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        boxShadow: "2px 2px 2px 2px lightblue",
      }}
    >
      <>{id}</>
      <div>
        {sports.map((sport) => (
          <div key={sport.id}>
            <SportsItem details={sport} />
          </div>
        ))}
      </div>
      <button disabled={allFetched && !isLoading} onClick={() => handleClick()}>
        Show more
      </button>
    </div>
  );
};
