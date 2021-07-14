import { Icon, IIconProps } from "native-base";
import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";

function SvgComponent({ size, color, ...rest }: SvgProps & IIconProps) {
	return (
		<Icon viewBox="0 0 44 44" size={size}>
			<Svg
				width={44}
				height={44}
				viewBox="0 0 44 44"
				fill="none"
				{...rest}
			>
				<Rect width={44} height={44} rx={10} fill="#FFE2DE" />
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M22 12c-3.627 0-6.568 3.01-6.568 6.723v2.49c0 .844-.253 1.425-.858 2.161l-.241.282-.34.387-.174.204a8.192 8.192 0 00-.076.094c-.486.61-.743 1.17-.743 1.852 0 1.62 1.912 2.674 4.983 3.136l.482.066.5.057.256.025.524.042.541.034c.366.019.742.031 1.128.038l.586.005.586-.005c.386-.007.762-.02 1.128-.038l.54-.034.525-.042.256-.025.5-.057.482-.066C29.088 28.867 31 27.812 31 26.193c0-.683-.257-1.241-.743-1.852l-.158-.192-.538-.615c-.702-.814-.993-1.417-.993-2.321v-2.49C28.568 15.01 25.628 12 22 12zm0 1.826c2.642 0 4.784 2.192 4.784 4.897v2.49c0 1.342.422 2.295 1.274 3.334l.786.91.03.037c.25.315.342.514.342.699 0 .228-.351.489-.99.731l-.254.09-.28.088-.305.084-.33.082-.354.077c-.122.025-.248.05-.377.073l-.4.067-.422.062-.444.056-.463.048-.239.022-.493.037-.51.028-.53.02-.546.01-.279.002-.28-.002-.545-.01-.53-.02-.51-.028-.493-.037-.473-.045a22.345 22.345 0 01-.23-.025l-.443-.056-.421-.062-.4-.067a19.668 19.668 0 01-.192-.036l-.366-.075a13.145 13.145 0 01-.174-.04l-.33-.08-.305-.085-.28-.088-.253-.09c-.64-.242-.991-.503-.991-.731 0-.185.091-.384.342-.699l.112-.134.539-.617c.963-1.117 1.44-2.104 1.44-3.53v-2.49c0-2.705 2.141-4.897 4.783-4.897zm-2.315 16.433c.725.055 1.495.084 2.315.084.82 0 1.59-.029 2.315-.084C23.998 31.296 23.06 32 22 32s-1.998-.705-2.315-1.74z"
					fill="#FF6F5B"
				/>
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
