import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SalesChartComponent() {
    const [theme, setTheme] = useState("light_mode");  // Quản lý theme với state nội bộ

    const dark = { border: "#39496b", frame: "#2f3f61", title: "#f0f0f0", text: "#d1d1d1", bg: "#1b2b4d" };
    const light = { border: "#d1d1d1", frame: "#f0f0f0", title: "#403e57", text: "#5e5d72", bg: "#ffffff" };

    const data = [
        { week: "Fri", sale: 2000 },
        { week: "Sat", sale: 3000 },
        { week: "Sun", sale: 2000 },
        { week: "Mon", sale: 2780 },
        { week: "Tue", sale: 1890 },
        { week: "Wed", sale: 2390 },
        { week: "Thu", sale: 3490 }
    ];

    // Lấy theme từ localStorage khi component được mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light_mode";
        setTheme(savedTheme);
    }, []);

    return (
        <ResponsiveContainer width="100%" aspect={1} maxHeight={220}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="35%" stopColor="#2351af" stopOpacity={0.70} />
                        <stop offset="75%" stopColor="#2351af" stopOpacity={0.3} />
                    </linearGradient>
                </defs>
                <CartesianGrid 
                    stroke={theme === "light_mode" ? light.border : dark.border}
                    strokeDasharray="1 3"
                />
                <XAxis hide={true} dataKey="week" />
                <Tooltip
                    cursor={false}
                    contentStyle={{
                        background: theme === "light_mode" ? light.bg : dark.bg,
                        borderRadius: "8px",
                        padding: "8px 15px 9px",
                        border: `1px solid ${theme === "light_mode" ? light.frame : dark.frame}`,
                        boxShadow: "0px 12px 25px 0px rgb(0 0 0 / 12%)",
                    }}
                    itemStyle={{
                        color: theme === "light_mode" ? light.text : dark.text,
                        fontSize: "14px",
                        fontWeight: "500",
                        padding: "2px 0px",
                        textTransform: "capitalize",
                    }}
                    labelStyle={{
                        color: theme === "light_mode" ? light.title : dark.title,
                        fontSize: "12px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                    }}
                />
                <Area 
                    type="natural" 
                    dataKey="sale" 
                    stroke="#2b77e5" 
                    strokeWidth="2" 
                    fill="url(#color)" 
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
