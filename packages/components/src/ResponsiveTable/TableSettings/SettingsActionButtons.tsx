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
		<Row gutter={[8, 8]}>
			<Col
				md={24}
				style={{ textAlign: "center" }}
			>
				<IconButton
					toolTip="Deactivate"
					iconType={mobileView ? "down" : "right"}
					onClick={props.updateVisibleColumns}
				/>
			</Col>
			<Col
				md={24}
				style={{ textAlign: "center" }}
			>
				<IconButton
					toolTip="Activate"
					iconType={mobileView ? "up" : "leftCircle"}
					onClick={props.updateHiddenColumns}
				/>
			</Col>
			<Col
				md={24}
				style={{ textAlign: "center" }}
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
