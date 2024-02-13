import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';
import OrderTable from './OrderTable';
import AnalyticsReport from './AnalyticsReport';



export default function Dashboard() {
    const [analytics, setAnalytics] = React.useState([1, 1, 1, 1])
    return (
        <div className='body-main'>
            <div className='dashboard-main'>
                <h3>Dashboard</h3>
                <div className='dashboard-analytics-container'>

                    {analytics.map((value) => {
                        return (

                            <div className='dashboard-analytics-cards'>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Total Page Views
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        4,42,236
                                    </Typography>

                                    <Typography variant="body2" className="dashboard-analytics-typo">
                                        You made an extra <b style={{ color: "blue" }}>35,000</b> this year
                                    </Typography>
                                </CardContent>
                            </div>
                        );
                    })}

                </div>


                <div className='graph-container'>
                    <div>

                        <h3>Unique Visitor</h3>
                        <div className='line-graph'>
                            <LineGraph/>
                        </div>
                    </div>
                    <div>
                        <h3>Income Overview</h3>
                        <div className='bar-graph'>
                            <BarGraph/>
                        </div>
                    </div>
                </div>


                <div className='table-container'>
                    <div className='orders-container'>
                        <h3>Recent Orders</h3>
                        <div className='order-table'><OrderTable/></div>
                    </div>
                    <div className='report-container'>
                        <h3>Analytics Report</h3>
                        <div className='analytics-report'><AnalyticsReport/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
