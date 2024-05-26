"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import styles from "./index.module.css";

const { Item } = Form;
const { Password } = Input;

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginBoard: React.FC = () => {
  return (
    <Form
      layout="vertical"
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Item<FieldType>
        label={<div className={styles.text}>Email</div>}
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
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

      <Item<FieldType>
        name="remember"
        valuePropName="checked"
        className={styles.center}
      >
        <Checkbox>
          <div className={styles.text}>Remember me</div>
        </Checkbox>
      </Item>

      <Item className={styles.center}>
        <Button type="primary" htmlType="submit">
          Sign In
        </Button>
      </Item>
    </Form>
  );
};

export default LoginBoard;
