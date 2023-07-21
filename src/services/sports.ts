import { apiCall } from "./apiConfig";

interface IGetSports {
  season: string;
  page?: number;
}

const getSports = async (reqObject: IGetSports) => {
  try {
    const url = `http://localhost:2000/sports`;
    const response = await apiCall(url, reqObject);
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
