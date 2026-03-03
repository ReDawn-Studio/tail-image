"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import styles from "./index.module.css";
import request from "@/app/util/request";
import { useRouter } from "next/navigation";

const RegisterBoard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await request.post("api/register", formData);
      if (res.status === 200) {
        toast({ title: "注册成功", description: "欢迎加入！" });
        router.push("/");
      }
    } catch (error: any) {
      toast({
        title: "注册失败",
        description: error?.response?.data?.message || "请稍后再试",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formItem}>
        <Label htmlFor="register-username" className={styles.label}>
          Username
        </Label>
        <Input
          id="register-username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="请输入用户名"
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formItem}>
        <Label htmlFor="register-password" className={styles.label}>
          Password
        </Label>
        <Input
          id="register-password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="请输入密码"
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formItem}>
        <Label htmlFor="register-email" className={styles.label}>
          Email
        </Label>
        <Input
          id="register-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="请输入邮箱"
          required
          className={styles.input}
        />
      </div>

      <div className={styles.center}>
        <Button type="submit" disabled={loading}>
          {loading ? "提交中..." : "Sign Up"}
        </Button>
      </div>
    </form>
  );
};

export default RegisterBoard;
