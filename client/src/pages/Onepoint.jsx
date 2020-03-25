import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Button, Table } from 'antd';
import { CalculatorOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Layout, Input, InputNumber } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import axios from 'axios'
const { Content } = Layout;
const { parse } = require("mathjs");
const { Column } = Table;

function Onepoint() {
    let [x0, setx0] = useState(0)
    const [fx, setfx] = useState()
    const [data, setdata] = useState();
    const [x, setx] = useState(0)
    const temp = []
    const [body3, setFX] = useState("")
    const [x_onepoint, setX0] = useState(0)
    useEffect(() => {
        axios.get("http://localhost:4000/api/users/onepoint").then(res => {
            setFX(res.data.data[0].body3)
            setX0(res.data.data[0].x_onepoint)
        })
    }, [])
    const codeonepoint = () => {
        const f = (fx, value) => parse(fx).evaluate({ x: value })
        const e = (x, x0) => Math.abs((x - x0) / x)
        var x
        var i = 0
        while (i <= 1 || e(x, x0) > 0.000001) {
            if (i > 0) {
                x0 = x
            }
            x = f(fx, x0)
            temp.push({
                i: i,
                x: x.toFixed(6),
                fx: x0.toFixed(6),
                error: e(x, x0).toFixed(6)
            });
            i++
        }
        setx(x.toFixed(6))
        setdata(temp)
    }
    return (
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280, }} >
            <p>Onepoint</p>
            <p>fx <Input fx onChange={event => setfx(event.target.value)}style={{ width: "200px" }} /></p>
            <p>X0<InputNumber onChange={value => setx0(value)} /></p>
            <Button onClick={codeonepoint} ><CalculatorOutlined />Calculator</Button>
            <button onClick={() => {
                setfx(body3)
                setx0(x_onepoint)
            }}><DatabaseOutlined />FX  {body3} <br/> x0   {x_onepoint} <br/> </button>
            <Table style={{ marginTop: 15 }} dataSource={data}>
                <Column title="Iterations" dataIndex="i"/>
                <Column title="X" dataIndex="x" />
                <Column title="Y" dataIndex="fx" />
                <Column title="Error" dataIndex="error"/>
            </Table>
            <LineChart
                width={950}
                height={400}
                data={data}
                margin={{ top: 30, bottom: 10 }}
                style={{ backgroundColor: "#fff" }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fx" />
                <YAxis
                    type="number"
                    dataKey="x"
                    domain={["auto", "auto"]}
                    allowDataOverflow="true"
                />
                <Tooltip />
                <Legend />
                <Line type="linear" dataKey="x" stroke="#8884d8" />
            </LineChart>
        </Content>
    )
}
export default Onepoint;