import { Col, Row } from "antd";
import React, { useState } from "react";
import { IconButton } from "~/Form/Buttons/IconButton";
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews";

export const SettingsActionButtons = (props: {
	updateVisibleColumns: () => void;
	updateHiddenColumns: () => void;
	reload: () => void;
}) => {
	const [mobileView, setMobileView] = useState(false);
	useDeviceViews((deviceViews: IDeviceView) => {
		setMobileView(deviceViews.mobile);
	});

	return (
		<Row gutter={8} justify="space-around">
			<Col
				xs={8}
				sm={8}
				md={24}
				style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }}
			>
				<IconButton
					toolTip="Deactivate"
					iconType={mobileView ? "down" : "right"}
					onClick={props.updateVisibleColumns}
				/>
			</Col>
			<Col
				xs={8}
				sm={8}
				md={24}
				style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }}
			>
				<IconButton
					toolTip="Activate"
					iconType={mobileView ? "up" : "leftCircle"}
					onClick={props.updateHiddenColumns}
				/>
			</Col>
			<Col
				xs={8}
				sm={8}
				md={24}
				style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }}
			>
				<IconButton
					toolTip="Default"
					iconType="reload"
					onClick={props.reload}
				/>
			</Col>
		</Row>
	);
};
