import { apiCall } from "./apiConfig";

interface IGetSports {
  season: string;
  page: number;
}

const getSports = async (reqObject: IGetSports) => {
  const { season, page } = reqObject;
  try {
    const url = `http://localhost:2000/sports?season=${season}&page=${page}`;
    const response = await apiCall(url);
    if (response.data?.length) {
      return response.data;
    } else {
      throw new Error("no data");
    }
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const SportsService = {
  getSports,
};
