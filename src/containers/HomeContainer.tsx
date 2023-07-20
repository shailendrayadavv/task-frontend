import { SportsCard } from "../component/SportsCard";

const seasons = ["summer", "winter", "other"];
export const HomeContainer = () => {
  return (
    <div
      style={{
        margin: "40px",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        boxShadow: "2px 2px 2px 2px lightblue",
      }}
    >
      <h3 style={{ color: "gray" }}>Sports</h3>
      <div style={{ display: "flex", gap: "80px" }}>
        {seasons.map((season) => (
          <SportsCard id={season} key={season} />
        ))}
      </div>
    </div>
  );
};
