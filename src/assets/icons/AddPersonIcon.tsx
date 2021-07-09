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
					d="M22.925 19.6c.366.12.726.265 1.078.433a.716.716 0 11-.615 1.293 7.802 7.802 0 00-3.189-.757 4.88 4.88 0 01-.381 0c-3.636.088-6.785 2.696-7.528 6.266a.748.748 0 00.152.627.728.728 0 00.572.272h8.82a.716.716 0 010 1.433h-8.82a2.175 2.175 0 01-2.127-2.624 9.343 9.343 0 013.207-5.29 9.306 9.306 0 013-1.65 4.866 4.866 0 01-1.956-3.9 4.875 4.875 0 014.87-4.87 4.875 4.875 0 014.87 4.87 4.866 4.866 0 01-1.953 3.897zm-2.917-.465l.175.001a3.442 3.442 0 003.262-3.433 3.441 3.441 0 00-3.437-3.437 3.441 3.441 0 00-3.438 3.437 3.442 3.442 0 003.264 3.433l.174-.001z"
					fill="#7065E4"
				/>
				<Path
					d="M28.458 25.049h-1.97v-1.97a.716.716 0 10-1.431 0v1.97h-1.97a.716.716 0 000 1.432h1.97v1.97a.716.716 0 001.432 0v-1.97h1.97a.716.716 0 100-1.432z"
					fill="#7065E4"
				/>
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
