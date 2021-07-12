import { Icon, IIconProps } from "native-base";
import * as React from "react";
import Svg, { SvgProps, Path, Circle } from "react-native-svg";

function SvgComponent({ size, color, ...rest }: SvgProps & IIconProps) {
	return (
		<Icon viewBox="0 0 24 24" size={size}>
			<Svg
				width={24}
				height={24}
				viewBox="0 0 24 24"
				fill="none"
				{...rest}
			>
				<Path
					d="M18.352 16.13a.86.86 0 00.859-.86V4.439A3.441 3.441 0 0015.773 1H7.438A3.441 3.441 0 004 4.438v15.125A3.441 3.441 0 007.438 23h8.335a3.441 3.441 0 003.438-3.438.86.86 0 10-1.719 0 1.72 1.72 0 01-1.719 1.72H7.438a1.72 1.72 0 01-1.72-1.72V4.438a1.72 1.72 0 011.72-1.718h8.335a1.72 1.72 0 011.72 1.719V15.27c0 .474.384.86.859.86z"
					fill="#7065E4"
				/>
				<Circle cx={11.605} cy={19.095} r={0.859} fill="#7065E4" />
				<Path
					d="M13.324 4.915a.86.86 0 00-.86-.86h-1.718a.86.86 0 000 1.72h1.719a.86.86 0 00.86-.86z"
					fill="#7065E4"
				/>
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
