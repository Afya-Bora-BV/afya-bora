import { Icon, IIconProps } from "native-base";
import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";

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
				<G clipPath="url(#prefix__clip0)">
					<Path
						d="M15.555 16.844v1.718A3.441 3.441 0 0112.117 22H3.48a3.441 3.441 0 01-3.437-3.438V3.438A3.441 3.441 0 013.48 0h8.637a3.441 3.441 0 013.438 3.438v1.718a.86.86 0 11-1.72 0V3.438a1.72 1.72 0 00-1.718-1.72H3.48a1.72 1.72 0 00-1.718 1.72v15.124a1.72 1.72 0 001.718 1.72h8.637a1.72 1.72 0 001.719-1.72v-1.718a.86.86 0 111.719 0zm5.859-7.32l-1.925-1.925a.86.86 0 10-1.215 1.216l1.369 1.369H9.324a.86.86 0 100 1.718h10.319l-1.369 1.37a.859.859 0 101.215 1.214l1.925-1.924a2.15 2.15 0 000-3.038z"
						fill="#FF6F5B"
					/>
				</G>
				<Defs>
					<ClipPath id="prefix__clip0">
						<Path fill="#fff" d="M0 0h22v22H0z" />
					</ClipPath>
				</Defs>
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
