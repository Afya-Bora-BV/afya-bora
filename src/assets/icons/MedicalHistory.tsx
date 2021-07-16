import { Icon, IIconProps } from "native-base";
import * as React from "react";
import Svg, { SvgProps, Path, Circle, Ellipse } from "react-native-svg";

function SvgComponent({ size, color, ...rest }: SvgProps & IIconProps) {
	return (
		<Icon viewBox="0 0 20 20" size={size}>
			<Svg
				width={20}
				height={20}
				viewBox="0 0 20 20"
				fill="none"
				{...rest}
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M18.45 13.437c.396 0 .717-.32.717-.716v-7.59a2.868 2.868 0 00-2.865-2.865h-.931v-.717a.716.716 0 10-1.432 0v.717H10.68v-.717a.716.716 0 00-1.432 0v.717H6.025v-.717a.716.716 0 10-1.432 0v.717h-.895A2.868 2.868 0 00.833 5.13v11.172a2.868 2.868 0 002.865 2.865h12.604a2.868 2.868 0 002.865-2.865.716.716 0 00-1.433 0c0 .79-.642 1.432-1.432 1.432H3.698c-.79 0-1.432-.642-1.432-1.432V5.13c0-.79.642-1.432 1.432-1.432h.895v.716a.716.716 0 101.432 0v-.716h3.223v.716a.716.716 0 101.432 0v-.716h3.259v.716a.716.716 0 101.432 0v-.716h.931c.79 0 1.432.642 1.432 1.432v7.591c0 .396.32.716.716.716z"
					fill="#561BB3"
				/>
				<Circle cx={5.309} cy={8.353} fill="#561BB3" r={0.716} />
				<Circle cx={11.54} cy={8.353} fill="#561BB3" r={0.716} />
				<Circle cx={14.655} cy={8.353} fill="#561BB3" r={0.716} />
				<Circle cx={5.309} cy={11.468} fill="#561BB3" r={0.716} />
				<Circle cx={5.309} cy={14.583} fill="#561BB3" r={0.716} />
				<Circle cx={8.424} cy={8.353} r={0.716} fill="#561BB3" />
				<Circle cx={8.424} cy={11.468} fill="#561BB3" r={0.716} />
				<Circle cx={8.424} cy={14.583} fill="#561BB3" r={0.716} />
				<Circle cx={11.54} cy={11.468} r={0.716} fill="#561BB3" />
				<Circle cx={14.655} cy={11.468} r={0.716} fill="#561BB3" />
				<Circle cx={11.54} cy={14.583} r={0.716} fill="#561BB3" />
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
