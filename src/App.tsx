import { useDispatch, useSelector } from "react-redux";
import type { TAppDispatch, TRootState } from "./store";
import Partition from "./components/Partitions";

export default function App() {
	const partitionState = useSelector((state: TRootState) => state.partition);

	const dispatch = useDispatch<TAppDispatch>();

	return (
		<section className="w-screen h-screen flex">
			<Partition
				node={partitionState}
				dispatch={dispatch}
				totalPartitions={partitionState.totalPartitions}
			/>
		</section>
	);
}
