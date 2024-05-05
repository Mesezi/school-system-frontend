import { RiLoader4Fill } from "react-icons/ri";

export default function Loading() {
	return (
		<div className="min-h-[calc(100vh-80px)] grid place-items-center">
			<RiLoader4Fill className="h-[2rem] w-[2rem] text-green animate-spin text-white" />
		</div>
	);
}
