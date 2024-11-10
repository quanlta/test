import React from "react";
import IconFieldComponent  from "../../components_admin/fields/IconFieldComponent";
import  RevenueChartComponent  from "../../components_admin/charts/RevenueChartComponent";

export default function RevenueCardComponent() {

    return (
        <div className="mc-card">
            <div className="mc-revenue-card-header">
                <h5 className="mc-card-title">Revenue Report</h5>
                <IconFieldComponent 
                    icon="calendar_month" 
                    option={[
                        "Year 2021", 
                        "Year 2020", 
                        "Year 2019", 
                        "Year 2018", 
                        "Year 2017", 
                        "Year 2016", 
                        "Year 2015"
                    ]}  
                    classes="w-sm h-sm" 
                />
            </div>
            <div className="mc-revenue-card-group">
                <div className="mc-revenue-card-report">
                    <i className="material-icons blue">cases</i>
                    <h3><span>Invested</span> 3,387.67K</h3>
                </div>
                <div className="mc-revenue-card-report">
                    <i className="material-icons green">bookmarks</i>
                    <h3><span>Earnings</span> 2,856.35K</h3>
                </div>
                <div className="mc-revenue-card-report">
                    <i className="material-icons purple">layers</i>
                    <h3><span>Expenses</span> 1,994.12K</h3>
                </div>
            </div>
            <RevenueChartComponent />
        </div>
    );
}
