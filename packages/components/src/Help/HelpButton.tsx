import React, { CSSProperties, useEffect, useState } from "react";
import { Button, Tooltip } from "antd";
import { HelpConfig } from "@packages/services/lib/HelpConfigs/HelpConfig";
import { IconButton } from "~/Form/Buttons/IconButton";

export function HelpButton(props: {
	helpKey?: string;
	skipIcon?: boolean;
	style?: CSSProperties;
}) {
	const [helpUrl, setHelpUrl] = useState<string>();

	useEffect(() => {
		if (props.helpKey)
			setHelpUrl((HelpConfig as { [key: string]: string })[props.helpKey]);
	}, [props.helpKey]);

	return (
		<>
			{props.helpKey &&
				helpUrl &&
				(props.skipIcon ? (
					<Tooltip title="Help">
						<Button
							style={props.style}
							type="link"
							shape="circle"
							onClick={() => window.open(helpUrl)}
						>
							Help
						</Button>
					</Tooltip>
				) : (
					<IconButton
						style={props.style}
						iconType="question"
						toolTip="Help"
						onClick={() => window.open(helpUrl)}
					/>
				))}
		</>
	);
}
