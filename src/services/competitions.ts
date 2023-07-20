import { apiCall } from "./apiConfig";

interface IGetCompetitions {
  sportId: number;
  continentId?: number;
  page: number;
}

const getCompetitions = async (reqObject: IGetCompetitions) => {
  const { sportId, page, continentId } = reqObject;
  let url = `http://localhost:2000/competition?sportId=${sportId}&page=${page}`;
  if (continentId) {
    url += `&continentId=${continentId}`;
  }
  try {
    const response = await apiCall(url);
    if (response?.data.length) {
      return response.data;
    } else {
      throw new Error("no data");
    }
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const CompetitionsService = {
  getCompetitions,
};
