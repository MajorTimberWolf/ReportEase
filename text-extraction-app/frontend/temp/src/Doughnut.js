import * as React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);


function Doughnuts(props) {


    const labels = ["Robbery", "Murder", "Assault"];
    const Xdata = [1200, 248, 349];

    const data = {
        labels: labels,
        datasets: [{
            label: [],
            data: Xdata,
            borderColor: ["#111827"],
            backgroundColor: [
                'rgba(3, 80, 194, 1)', 'rgba(11, 152,255, 1)', 'rgba(156, 217, 255, 1)',
                'rgba(224, 0, 0, 0.7)', 'rgb(255, 128, 128)', 'rgb(200, 200, 200)',
                'rgba(0, 105, 0, 0.8)', 'rgba(0, 130, 0, 0.8)', 'rgba(0, 185, 0, 0.8)',
                'rgba(255, 175, 0, 0.8)', 'rgba(255, 149, 0, 0.83)', 'rgb(128, 128, 255)',
                'rgba(255, 124, 0, 0.83)', 'rgba(255, 124, 0, 0.83)', 'rgba(255, 118, 117, 0.83)',
                'rgba(255, 100, 100, 0.83)', 'rgba(255, 75, 70, 0.83)'
            ],
            hoverOffset: 16,
            borderRadius: 10
        }]
    };




    const options = {
        // maintainAspectRatio: false,
        responsive: true,
        aspectRatio: 1.25,
        // maintainAspectRatio: false,
        plugins: {
            legend: {
                display: props.legendDisp
            }
        }
    }

    return (
        <div>
            <div className="Doughnut">
                <Doughnut data={data} options={options}>
                </Doughnut>
            </div>
        </div>
    );
};


export default Doughnuts;


Doughnuts.defaultProps = {
    legendDisp: true,
    counter: 6
};