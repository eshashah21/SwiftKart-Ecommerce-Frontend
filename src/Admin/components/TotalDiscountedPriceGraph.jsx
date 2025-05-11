import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../State/Order/Action";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TotalDiscountedPriceGraph = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!Array.isArray(orders) || orders.length === 0) {
        return <p>No data available</p>;
    }

    const labels = orders.map((order) => new Date(order.createdAt).toLocaleDateString());
    const values = orders.map((order) => order.totalDiscountedPrice);

    const data = {
        labels,
        datasets: [
            {
                label: "Total Sales Over Time",
                data: values,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
            },
        ],
    };

    return (
        <div>
            <h2 style={{ textAlign: "center", fontSize: "1.5rem" }}>Total Sales Graph</h2>
            <Line
                data={data}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { position: "top" },
                    },
                    scales: {
                        x: {
                            title: { display: true, text: "Date" },
                        },
                        y: {
                            title: { display: true, text: "Total Sales" },
                            beginAtZero: true,
                        },
                    },
                }}
            />
        </div>
    );
};

export default TotalDiscountedPriceGraph;
