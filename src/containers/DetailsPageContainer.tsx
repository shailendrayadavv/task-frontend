import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CompetitionsService } from "../services/competitions";
import { CompetitionsItem } from "../component/CompetitionItem";
import { ContinentsService } from "../services/continent";
import Download from "react-json-to-csv";

export interface ICompetition {
  id: number;
  name: string;
  dateModified: Date;
  sportId: number;
  sport: string;
  continentId: number;
  continent: string;
  url: string;
  gender: string;
  ageGroup: string;
}

interface IContinent {
  id: number;
  name: string;
}

export const DetailsContainer = () => {
  const [seachParams] = useSearchParams();
  const sportId = Number(seachParams.get("id"));
  const sportName = seachParams.get("sport");
  const [competitions, setCompetitions] = useState<ICompetition[]>([]);
  const [allFetched, setAllFetched] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsloading] = useState(false);
  const [continentList, setContinentList] = useState<IContinent[]>([]);
  const [continent, setContinent] = useState(0);

  const downloadCsv = () => {
    CompetitionsService.getCompetitions({ sportId, fetchAll: true }).then(
      (response) => {
        const allCompetitions = response;
        CompetitionsService.downloadCSV(allCompetitions);
      }
    );
  };
  useEffect(() => {
    if (page === 0) {
      setPage(1);
      return;
    }
    setIsloading(true);
    if (!allFetched) {
      CompetitionsService.getCompetitions({
        sportId,
        page,
        continentId: continent,
      }).then((response) => {
        const newCompetitions = response as ICompetition[];
        if (newCompetitions.length < 10) {
          setAllFetched(true);
        }
        setCompetitions([...competitions, ...newCompetitions]);
        setIsloading(false);
      });
    }
  }, [page]);

  useEffect(() => {
    ContinentsService.getContinents().then((response) => {
      const newContinents = response as IContinent[];
      setContinentList([...newContinents]);
    });
  }, []);

  useEffect(() => {
    setCompetitions([]);
    setAllFetched(false);
    setPage(0);
  }, [continent]);

  const handleClick = () => {
    if (!allFetched) {
      setPage(page + 1);
    }
  };
  return (
    <div id="detailsContainer">
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <>{sportName}</>
        <div className="custom-select" style={{ width: "200px" }}>
          <select
            value={continent}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setContinent(Number(e.target.value));
            }}
          >
            <option value="0">Select Continent</option>
            {continentList.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <button onClick={downloadCsv}>Download csv</button>
      </div>
      <div className="">
        <table id="commonTable">
          <tr>
            <th>name</th>
            <th>ageGroup</th>
            <th>gender</th>
            <th>continent</th>
          </tr>
          {competitions.map((competition) => (
            <CompetitionsItem details={competition} key={competition.id} />
          ))}
        </table>
      </div>
      <button
        disabled={allFetched || isLoading || !competitions.length}
        onClick={() => handleClick()}
      >
        Show more
      </button>
    </div>
  );
};
