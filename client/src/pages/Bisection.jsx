import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Button, Table } from 'antd';
import { Layout, Input, InputNumber } from 'antd';
import { CalculatorOutlined, DatabaseOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import axios from 'axios';
const { Content } = Layout;
const { parse } = require("mathjs");
const { Column } = Table;

function Bisection() {

    let [xl, setxl] = useState(0)
    let [xr, setxr] = useState(0)
    const [fx, setfx] = useState("")
    const [data, setdata] = useState();
    const temp = []
    const [x, setx] = useState(0)

    const [xl_bisections, setXL] = useState(0)
    const [xr_bisections, setXR] = useState(0)
    const [body1, setFX] = useState("")


    useEffect(() => {
        axios.get("http://localhost:4000/api/users/bisection").then(res => {
            setFX(res.data.data[0].body1)
            setXL(res.data.data[0].xl_bisections)
            setXR(res.data.data[0].xr_bisections)
        })
    }, [])


    const codebisection = () => {
        const f = (fx, value) => parse(fx).evaluate({ x: value })
        const e = (xm, xm0) => Math.abs((xm - xm0) / xm)
        const fxm = (xl, xr) => (xl + xr) / 2
        var xm
        var xm0
        var i = 0
        while (i <= 1 || e(xm, xm0) > 0.000001) {
            xm0 = xm
            xm = fxm(xl, xr)
            if (f(fx, xm) * f(fx, xl) > 0) {
                xl = xm
            }
            else {
                xr = xm
            }
            temp.push({
                i: i,
                xm: xm.toFixed(6),
                fxm: f(fx, xm).toFixed(6),
                error: e(xm, xm0).toFixed(6)
            });
            i++;
        }
        setx(xm.toFixed(6))
        setdata(temp)
    }
    return (
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280, }} >
            <p>Bisection</p>
            <p>fx<Input fx onChange={event => setfx(event.target.value)} style={{ width: "200px" }} /></p>
            <p>XL<InputNumber XL onChange={value => setxl(value)} /></p>
            <p>XR<InputNumber XR onChange={value => setxr(value)} /></p>
            <Button onClick={codebisection} ><CalculatorOutlined />Calculator</Button>
            <button onClick={() => {
                setfx(body1)
                setxl(xl_bisections)
                setxr(xr_bisections)
            }}><DatabaseOutlined />EX {body1} <br />xl    {xl_bisections}<br/> xr    {xr_bisections}</button>
            <Table style={{ marginTop: 15 }} dataSource={data}>
                <Column title="Iterations" dataIndex="i" />
                <Column title="X" dataIndex="xm" />
                <Column title="Y" dataIndex="fxm" />
                <Column title="Error" dataIndex="error" />
            </Table>
            <LineChart
                width={950}
                height={400}
                data={data}
                margin={{ top: 30, bottom: 10 }}
                style={{ backgroundColor: "#fff" }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="xm" />
                <YAxis
                    type="number"
                    dataKey="fxm"
                    domain={["auto", "auto"]}
                    allowDataOverflow="true"
                />
                <Tooltip />
                <Legend />
                <Line type="linear" dataKey="fxm" stroke="#8884d8" />
            </LineChart>
        </Content>
    );
}

export default Bisection;