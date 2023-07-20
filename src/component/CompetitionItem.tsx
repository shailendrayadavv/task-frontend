import { ICompetition } from "../containers/DetailsPageContainer";

interface IProps {
  details: ICompetition;
}
export const CompetitionsItem = ({ details }: IProps) => {
  return (
    <tr>
      <td>{details.name}</td>
      <td>{details.ageGroup}</td>
      <td>{details.gender}</td>
      <td>{details.continent}</td>
    </tr>
  );
};
