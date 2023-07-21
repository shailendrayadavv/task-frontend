import axios from "axios";

export const apiCall = async (url: string, reqObject?: any) => {
  const response = await axios.get(url, { params: reqObject });
  return response;
};
