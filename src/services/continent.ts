import { apiCall } from "./apiConfig";

const getContinents = async () => {
  let url = `http://localhost:2000/continent`;
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

export const ContinentsService = {
  getContinents,
};
