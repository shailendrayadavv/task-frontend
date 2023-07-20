export const getSportsBySeason = async (season: string, page: number = 1) => {
  try {
    const res = await fetch(
      `http://localhost:2000/sports?season=${season}?page=${page}`
    );
    const data = res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
