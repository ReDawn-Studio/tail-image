"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Space, message } from "antd";
import styles from "./index.module.css";
import request from "@/app/util/request";
import { useRouter } from "next/navigation";

const { Item } = Form;
const { Password } = Input;

type FieldType = {
  username?: string;
  password?: string;
  email?: string;
};

const RegisterBoard = () => {
  const router = useRouter();
  // const [messageApi] = message.useMessage();

  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const res = await request.post("api/register", values);
    if (res.status === 200) {
      // messageApi.success("Success!");
      // const timer = setTimeout(() => {
      //   clearTimeout(timer);
      //   }, 1000);
      router.push("/");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

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

      <Item<FieldType>
        label={<div className={styles.text}>Email</div>}
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input className={styles.input} />
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
