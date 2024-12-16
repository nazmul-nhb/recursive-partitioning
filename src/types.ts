export type TOrientation = "vertical" | "horizontal" | null;

export interface IPartition {
	id: number;
	color: string;
	orientation: TOrientation;
	children: IPartition[] | [];
	totalPartitions: number;
}
