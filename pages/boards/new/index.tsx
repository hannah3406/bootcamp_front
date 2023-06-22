import { withAuth } from "../../../src/commons/hoc";
import BoardWrite from "../../../src/components/units/board/write/BoardWrite.container";

const New = () => {
  return <BoardWrite isEdit={false} />;
};
export default withAuth(New);
