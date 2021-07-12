import { Icon, IIconProps } from "native-base";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

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
					fillRule="evenodd"
					clipRule="evenodd"
					d="M4.458 9.723h1.698a.86.86 0 01.86.859v8.078a.86.86 0 01-.86.86H4.438A3.441 3.441 0 011 16.082V13.16c0-1.27.693-2.38 1.72-2.976a9.218 9.218 0 012.717-6.466A9.22 9.22 0 0112 1c1.934 0 3.788.59 5.361 1.704a9.258 9.258 0 013.346 4.357.86.86 0 11-1.612.597A7.594 7.594 0 0012 2.718c-3.982 0-7.255 3.095-7.542 7.005zm-.02 8.078h.859v-6.36h-.86a1.72 1.72 0 00-1.718 1.72v2.921a1.72 1.72 0 001.719 1.719z"
					fill="#7065E4"
				/>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M17.844 9.723h1.718A3.441 3.441 0 0123 13.16v2.922a3.441 3.441 0 01-3.438 3.438h-.859v.043a2.581 2.581 0 01-2.578 2.578h-2.621v-.028a1.718 1.718 0 110-1.664v-.027h2.621a.86.86 0 00.86-.86v-8.98a.86.86 0 01.859-.86zm1.718 8.078a1.72 1.72 0 001.72-1.719V13.16a1.72 1.72 0 00-1.72-1.719h-.859V17.801h.86z"
					fill="#7065E4"
				/>
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
