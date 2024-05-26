"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Space } from "antd";
import styles from "./index.module.css";
import request from "@/app/util/request";

const { Item } = Form;
const { Password } = Input;

type FieldType = {
  username?: string;
  password?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
  console.log("Success:", values);
  const res = request.post('api/register', values)
  console.log('res', res)
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const RegisterBoard: React.FC = () => {
  return (
    <Form
      layout="vertical"
      name="register"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Item<FieldType>
        label={<div className={styles.text}>Username</div>}
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input className={styles.input} />
      </Item>

      <Item<FieldType>
        label={<div className={styles.text}>Password</div>}
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Password className={styles.input} />
      </Item>


      <Item className={styles.center}>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Item>
    </Form>
  );
};

export default RegisterBoard;
