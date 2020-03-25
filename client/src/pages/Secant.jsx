import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Button, Table } from 'antd';
import { CalculatorOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Layout, Input, InputNumber } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import axios from 'axios'
const { Content } = Layout;
const { parse, abs } = require("mathjs");
const { Column } = Table;

function Secant() {
    let [x0, setx0] = useState(0)
    let [x, setx] = useState(0)
    const [fx, setfx] = useState()
    const [data, setdata] = useState();
    const temp = []
    const [body5, setFX] = useState("")
    const [x_secants1, setX1] = useState(0)
    const [x_secants0, setX0] = useState(0)
    useEffect(() => {
        axios.get("http://localhost:4000/api/users/secants").then(res => {
            setFX(res.data.data[0].body5)
            setX1(res.data.data[0].x_secants1)
            setX0(res.data.data[0].x_secants0)
        })
    }, [])
    const codesecant = () => {
        const f = (fx, value) => parse(fx).evaluate({ x: value })
        const ff = (x0, x) => ((f(fx, x0) - f(fx, x)) / (x0 - x))
        const e = (x, x0) => abs((x - x0) / x)
        var x1
        var i = 0
        while (e(x, x0) > 0.000001) {
            x1 = ff(x0, x)
            x0 = x
            x = x0 - (f(fx, x0) / x1)
            temp.push({
                i: i,
                x: x.toFixed(6),
                fx: f(fx, x).toFixed(6),
                error: e(x, x0).toFixed(6)
            });
            i++
        }
        setx(x.toFixed(6))
        setdata(temp)
    }
    return (
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280, }} >
            <p>Secant</p>
            <p>fx<Input fx onChange={event => setfx(event.target.value)} style={{ width: "200px" }} /></p>
            <p>X1<InputNumber onChange={value => setx(value)} /></p>
            <p>X0<InputNumber onChange={value => setx0(value)} /></p>
            <Button onClick={codesecant} ><CalculatorOutlined />Calculator</Button>
            <button onClick={() => {
                setfx(body5)
                setX1(x_secants1)
                setx0(x_secants0)
            }}><DatabaseOutlined />EX {body5} <br/>x0   {x_secants0} <br/> x1   {x_secants1}  </button>
            <Table style={{ marginTop: 15 }} dataSource={data}>
                <Column title="Iterations" dataIndex="i" />
                <Column title="X" dataIndex="x" />
                <Column title="Y" dataIndex="fx" />
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
export default Secant;