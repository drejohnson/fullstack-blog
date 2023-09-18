"use client";

import { type HTMLAttributes, type SyntheticEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FaGoogle } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button, buttonVariants } from "./ui/button";
import LoadingDots from "./loading-dots";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
  type: "login" | "register";
}

export function UserAuthForm({ className, type, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(
    e: SyntheticEvent<HTMLFormElement> & {
      currentTarget: {
        name: any;
        email: any;
        password: any;
      };
    }
  ) {
    e.preventDefault();
    setIsLoading(true);

    if (type === "login") {
      signIn("credentials", {
        redirect: false,
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
        // @ts-ignore
      }).then(({ error }) => {
        if (error) {
          setIsLoading(false);
          // toast.error(error);
          toast({
            variant: "destructive",
            description: error,
          });
        } else {
          router.refresh();
          router.push("/protected");
        }
      });
    } else {
      fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.currentTarget.name.value,
          email: e.currentTarget.email.value,
          password: e.currentTarget.password.value,
        }),
      }).then(async (res) => {
        setIsLoading(false);
        if (res.status === 200) {
          toast({
            variant: "success",
            description: "Account created! Redirecting to login...",
          });
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          const { error } = await res.json();
          toast({
            variant: "destructive",
            description: error,
          });
        }
      });
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <Link
        href={type === "login" ? "/register" : "/login"}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        {type === "login" ? "Register" : "Sign in"}
      </Link>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {type === "login" ? "Sign in" : "Create an account"}
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password below to{" "}
          {type === "login" ? "sign in" : "create your account"}
        </p>
      </div>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            {type === "register" ? (
              <div>
                <Label className="sr-only" htmlFor="name">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="your name"
                  type="name"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
            ) : null}
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="password"
                type="password"
                autoCapitalize="none"
                required
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && <LoadingDots />}
              Sign In with Email
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading}>
          {isLoading ? <LoadingDots /> : <FaGoogle className="mr-2 h-4 w-4" />}{" "}
          Sign in with Google
        </Button>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
