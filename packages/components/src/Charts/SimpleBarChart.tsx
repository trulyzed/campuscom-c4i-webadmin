import { Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";
import { IChartConfig } from "~/Charts/IChartConfig";
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types";

interface ISimpleBarChart {
	config: IChartConfig;
	searchParams?: { [key: string]: any };
	searchFunc: IQuery
}

export function SimpleBarChart(props: ISimpleBarChart) {
	const [loading, setLoading] = useState(false);
	const [chartData, setChartData] = useState<any[]>();
	const [errorMessage, setErrorMessage] = useState("");
	useEffect(() => {
		setChartData([]);
		setErrorMessage("");
		if (props.searchFunc && props.searchParams) {
			setLoading(true);
			props.searchFunc({ params: props.searchParams }).then((response) => {
				if (
					response.success &&
					Array.isArray(response.data) &&
					response.data.length > 0
				) {
					const data = props.config.transFormerFunc(response.data);
					setChartData(data);
				} else if (
					props.searchParams &&
					Object.keys(props.searchParams).length > 0
				) {
					setErrorMessage("No Data Found for Given Search Parameters");
				}
				setLoading(false);
			});
		}
		// eslint-disable-next-line
	}, [props.searchParams]);

	let toRender: React.ReactNode = null;

	if (loading) {
		toRender = <Spin size="large" />;
	} else if (chartData && chartData.length > 0) {
		toRender = (
			<BarChart
				width={600}
				height={300}
				data={chartData}
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey={props.config.xField} />
				<YAxis yAxisId="left" orientation="left" stroke="#0085CA" />
				<Tooltip />
				<Legend />
				<Bar yAxisId="left" dataKey={props.config.yField} fill="#0057B8" />
			</BarChart>
		);
	} else if (chartData && chartData.length === 0) {
		toRender = <p>{errorMessage}</p>;
	}
	return (
		<Row justify="center" align="middle">
			{toRender}
		</Row>
	);
}
