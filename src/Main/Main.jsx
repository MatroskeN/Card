import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import './Main.css';
import { DatePicker } from 'antd';
import axios from "axios";

const { RangePicker } = DatePicker;

const Main = () => {

    const onFinish = async (values) => {
        console.log('Success:', values);
        let res = await axios.post('http://localhost:8080', values);
        console.log(res.data)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);

    };
    const monthFormat = 'MM/YYYY';
    return (
        <div className={'root'}>
            <Form
                name="basic"
                labelCol={{
                    span: 10,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Card number"
                    name="number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your card number',
                        },
                        {
                            min: 16,
                        },
                        {
                            pattern: /^(?:\d*)$/,
                            message: "Value should contain just number",
                        },
                        {
                            whitespace:true,
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Expiration date"
                    name="expiration"
                    rules={[
                        {
                          required: true,
                          message: 'Please input your card expiration date'
                        },
                    ]}
                >
                    <DatePicker format={monthFormat} picker="month" />
                </Form.Item>
                <Form.Item
                    label="CVV"
                    name="cvv"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your CVV',
                        },
                        {
                            max: 3,
                            min: 3,
                        },
                        {
                            pattern: /^(?:\d*)$/,
                            message: "Value should contain just number",
                        },
                        {
                            whitespace:true,
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: 'Please input amount',
                        },
                        {
                            pattern: /^(?:\d*)$/,
                            message: "Value should contain just number",
                        },
                        {
                            whitespace:true,
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    shouldUpdate
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    {({ getFieldsValue }) => {
                        const { number, expiration, cvv, amount } = getFieldsValue();
                        const formIsComplete = !!number && !!expiration && !!cvv && !!amount;
                        return (
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={!formIsComplete}
                            >
                                Оплатить
                            </Button>
                        );
                    }}
                </Form.Item>
            </Form>
        </div>
    );
};

export default Main;