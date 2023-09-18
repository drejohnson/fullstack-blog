import { Metadata } from "next";
import { UserAuthForm } from "@/components/user-auth-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In",
};

export default function Login() {
  return (
    <>
      <UserAuthForm type="login" />
    </>
  );
}
