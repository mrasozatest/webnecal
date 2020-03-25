import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Input, InputNumber } from 'antd';
import { CalculatorOutlined, DatabaseOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import axios from 'axios';
const { Content } = Layout;
const { parse } = require("mathjs");
const { Falsecolumn } = Table;

function False() {
    let [xl, setxl] = useState(0)
    let [xr, setxr] = useState(0)
    const [fx, setfx] = useState()
    const [data, setdata] = useState();
    const temp = []
    const [x, setx] = useState(0)
    const [xl_falses, setXL] = useState(0)
    const [xr_falses, setXR] = useState(0)
    const [body2, setFX] = useState("")

    useEffect(() => {
        axios.get("http://localhost:4000/api/users/falses").then(res => {
            setFX(res.data.data[0].body2)
            setXL(res.data.data[0].xl_falses)
            setXR(res.data.data[0].xr_falses)
        })
    }, [])
    const codefalse = () => {
        const f = (fx, value) => parse(fx).evaluate({ x: value })
        const e = (xm, xm0) => Math.abs((xm - xm0) / xm)
        const fxm = (xl, xr) => ((xl * f(fx, xr)) - (xr * f(fx, xl))) / (f(fx, xr) - f(fx, xl))
        var xm = fxm(xl, xr)
        var xmo = xm
        var i = 0
        while (i <= 1 || e(xm, xmo) > 0.000001) {
            xmo = xm
            xm = fxm(xl, xr)
            if (f(fx, xm) * f(fx, xl) > 0) {
                xl = xm
            } else {
                xr = xm
            }
            temp.push({
                i: i,
                xm: xm.toFixed(6),
                fxm: f(fx, xm).toFixed(6),
                error: e(xm, xmo).toFixed(6)
            });
            i++
        }
        setx(xm.toFixed(6))
        setdata(temp)
    }
    return (
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280, }} >
            <p>Falseposition</p>
            <p>fx<Input fx onChange={event => setfx(event.target.value)}style={{ width: "200px" }} /></p>
            <p>XL<InputNumber XL onChange={value => setxl(value)} /></p>
            <p>XR<InputNumber XR onChange={value => setxr(value)} /></p>
            <Button onClick={codefalse} ><CalculatorOutlined />Calculator</Button>
            <button onClick={() => {
                setfx(body2)
                setxl(xl_falses)
                setxr(xr_falses)
            }}><DatabaseOutlined />EX {body2} <br /> xl   {xl_falses} <br /> xr   {xr_falses} </button>
            <Table style={{ marginTop: 15 }} dataSource={data}>
                <Falsecolumn title="Iterations" dataIndex="i" />
                <Falsecolumn title="X" dataIndex="xm" />
                <Falsecolumn title="Y" dataIndex="fxm" />
                <Falsecolumn title="Error" dataIndex="error" />
            </Table>
            <LineChart
                width={950}
                height={400}
                data={data}
                margin={{ top: 30, bottom: 10 }}
                style={{ backgroundColor: "#fff" }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="" />
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
    )
}
export default False;