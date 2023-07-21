import { ICompetition } from "../containers/DetailsPageContainer";
import { apiCall } from "./apiConfig";

interface IGetCompetitions {
  sportId: number;
  continentId?: number;
  page?: number;
  fetchAll?: boolean;
}

const getCompetitions = async (reqObject: IGetCompetitions) => {
  let url = `http://localhost:2000/competition`;
  try {
    const response = await apiCall(url, reqObject);
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

const convertToCSV = (data: { [key: string]: any }[]) => {
  const csvArray = [];
  const headers = Object.keys(data[0]);
  csvArray.push(headers.join(","));

  data.forEach((item) => {
    const row = headers.map((key: string) => item[key]);
    csvArray.push(row.join(","));
  });

  return csvArray.join("\n");
};

const downloadCSV = (jsonData: ICompetition[]) => {
  const csvData = convertToCSV(jsonData);
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.csv";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const CompetitionsService = {
  getCompetitions,
  downloadCSV,
};
