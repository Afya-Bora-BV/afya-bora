import { Icon, IIconProps } from "native-base";
import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";

function SvgComponent({ size, color, ...rest }: SvgProps & IIconProps) {
	return (
		<Icon viewBox="0 0 22 22" size={size}>
			<Svg
				width={22}
				height={22}
				viewBox="0 0 22 22"
				fill="none"
				{...rest}
			>
				<Circle cx={11} cy={5.457} r={0.859} fill="#7065E4" />
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M18.778 3.222A10.928 10.928 0 0011 0C8.062 0 5.3 1.144 3.222 3.222A10.928 10.928 0 000 11c0 2.938 1.144 5.7 3.222 7.778A10.928 10.928 0 0011 22c2.011 0 3.98-.548 5.692-1.585a.86.86 0 00-.89-1.47A9.264 9.264 0 0111 20.28c-5.118 0-9.281-4.163-9.281-9.281S5.882 1.719 11 1.719 20.281 5.882 20.281 11c0 1.83-.544 3.611-1.574 5.151a.86.86 0 001.43.956A10.957 10.957 0 0022 11c0-2.938-1.144-5.7-3.222-7.778z"
					fill="#7065E4"
				/>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M11 8.035a.86.86 0 00-.86.86v7.648a.86.86 0 001.72 0V8.895a.86.86 0 00-.86-.86z"
					fill="#7065E4"
				/>
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
