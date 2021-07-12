import { Icon, IIconProps } from "native-base";
import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";

function SvgComponent({ size, color, ...rest }: SvgProps & IIconProps) {
	return (
		<Icon viewBox="0 0 41 40" size={size}>
			<Svg
				width={41}
				height={40}
				viewBox="0 0 41 40"
				fill="none"
				{...rest}
			>
				<Rect x={0.008} width={40} height={40} rx={10} fill="#fff" />
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M17.19 10.833h5.635a6.357 6.357 0 016.35 6.35v5.634a6.357 6.357 0 01-6.35 6.35H17.19a6.357 6.357 0 01-6.35-6.35V20a.716.716 0 011.432 0v2.817a4.923 4.923 0 004.918 4.917h5.634a4.923 4.923 0 004.917-4.917v-5.634a4.923 4.923 0 00-4.917-4.917H17.19c-1.288 0-2.511.51-3.418 1.384h1.355a.716.716 0 110 1.432H12.31a.718.718 0 01-.716-.716V11.55a.716.716 0 011.432 0v.84a6.328 6.328 0 014.164-1.557zm3.534 8.87v-3.928a.716.716 0 10-1.432 0V20c0 .19.075.372.21.506l2.816 2.817a.716.716 0 101.013-1.012l-2.607-2.608z"
					fill="#7065E4"
				/>
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
