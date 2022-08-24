import { IClaims } from "../../types/interfaces/claims";
import columns from "../claims/columns";
import TableData from "../TableDatas";

const ListFrequency = ({ claims }: { claims: IClaims[] }) => {
  return (
    <div className="container_create_sales">
      <TableData data={claims} columns={columns({ after: () => {} })} />
    </div>
  );
};

export default ListFrequency;
