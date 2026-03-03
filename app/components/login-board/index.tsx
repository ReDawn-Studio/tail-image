"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import styles from "./index.module.css";
import request from "@/app/util/request";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store";

const LoginBoard = () => {
  const router = useRouter();
  const store = useStore();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await request.post("api/login", formData);
      if (res.data.status === 200) {
        store.user.setUserInfo({ ...res.data.data });
        localStorage.setItem('user', JSON.stringify({ ...res.data.data.userInfo }));
        router.push("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "登录失败，请检查用户名和密码");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formItem}>
        <Label htmlFor="username" className={styles.label}>Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="请输入用户名"
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formItem}>
        <Label htmlFor="password" className={styles.label}>Password</Label>
        <Input
          id="password"
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
        <div className={styles.checkboxRow}>
          <Checkbox
            id="remember"
            name="remember"
            checked={formData.remember}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, remember: Boolean(checked) }))
            }
          />
          <Label htmlFor="remember" className={styles.checkboxLabel}>
            Remember me
          </Label>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.formItem}>
        <Button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "登录中..." : "Sign In"}
        </Button>
      </div>
    </form>
  );
};

export default LoginBoard;
