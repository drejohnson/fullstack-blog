import { Metadata } from "next";
import { UserAuthForm } from "@/components/user-auth-form";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create Acount",
};

export default function Register() {
  return (
    <>
      <UserAuthForm type="register" />
    </>
  );
}
