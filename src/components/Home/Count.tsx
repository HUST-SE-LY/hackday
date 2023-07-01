import { observer } from "mobx-react-lite";
import countStore from "../../stores/count";

const Count = observer(() => <div>count:{countStore.count}</div>);

export default Count;
