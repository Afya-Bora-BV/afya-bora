import { Icon, IIconProps } from "native-base";
import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";

function SvgComponent({ size, color, ...rest }: SvgProps & IIconProps) {
	return (
		<Icon viewBox="0 0 49 48" size={size}>
			<Svg
				width={49}
				height={48}
				viewBox="0 0 49 48"
				fill="none"
				{...rest}
			>
				<Rect x={0.008} width={48} height={48} rx={10} fill="#D4FAFF" />
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M18.445 35h10.566a3.442 3.442 0 003.437-3.438.86.86 0 10-1.718 0 1.72 1.72 0 01-1.72 1.72H18.446a1.72 1.72 0 01-1.718-1.72V16.438a1.72 1.72 0 011.718-1.718h10.566a1.72 1.72 0 011.719 1.719v10.828a.86.86 0 101.718 0V16.438A3.441 3.441 0 0029.011 13H18.445a3.441 3.441 0 00-3.437 3.438v15.125A3.441 3.441 0 0018.445 35zm6.171-7.746a2.215 2.215 0 01-1.721.825 2.216 2.216 0 01-1.525-.609l-2.745-2.635a.86.86 0 111.19-1.24l2.743 2.633a.484.484 0 00.368.132.487.487 0 00.339-.168l4.235-5.917a.86.86 0 011.398 1l-4.253 5.941-.029.038z"
					fill="#2AD3E7"
				/>
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
