"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Space } from "antd";
import styles from "./index.module.css";

const { Item } = Form;
const { Password } = Input;

type FieldType = {
  email?: string;
  password?: string;
  code?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
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
        label={<div className={styles.text}>Email</div>}
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
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
        label={<div className={styles.text}>Code</div>}
        name="email"
        rules={[
          { required: true, message: "Please input your code from email!" },
        ]}
      >
        <Input
          className={styles.input}
          placeholder="Please input your code from email!"
          suffix={<Button type="link">Get Code</Button>}
        />
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
