import React, { Component, useRef, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import Axios from "axios";
import { apiUrl } from "../../config.json";
import { LoadingOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AdminSignup = () => {
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  let btnRef = useRef();

  const onFinish = (values) => {
    setLoad(true);

    Axios({
      method: "post",
      url: `${apiUrl}/api/auth/signupadmin`,
      data: values,
    })
      .then((res) => {
        setLoad(false);
        btnRef.current.removeAttribute("disabled");
        if (res.data.success) {
          setError("Check your email to get the password generated by system");
        } else {
          setError(res.data.message);
        }
      })
      .catch((res) => {
        setLoad(false);
        btnRef.current.removeAttribute("disabled");
        setError(res.message);
      });

    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Enter your email"
        name="email"
        rules={[{ required: true, message: "Please input your email" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Enter your name"
        name="name"
        rules={[{ required: true, message: "Please input your name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button ref={btnRef} type="primary" htmlType="submit">
          Submit
        </Button>
        <p style={{ color: "blue" }}>{error}</p>
        {load && <LoadingOutlined />}
      </Form.Item>
    </Form>
  );
};

export default AdminSignup;
