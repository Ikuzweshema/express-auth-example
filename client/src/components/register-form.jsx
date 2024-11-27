import { Card, CardBody } from "@nextui-org/card";
import { Button, CardHeader, Input, Link } from "@nextui-org/react";
import { Link as NavLink } from "react-router-dom";
import GoogleProvider from "./google-provider";

export default function RegisterForm({
  handleSubmit,
  handleChange,
  error,
  formData,
  isLoading,
}) {
  return (
    <div className={"w-full flex flex-col  items-center justify-center pt-4"}>
      <Card className={"w-full max-w-lg p-10 mt-5 cursor-pointer"}>
        <CardHeader className={"px-4 pt-2"}>
          <h4 className={"font-bold text-xl"}>Welcome to Auth app,</h4>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className={"flex flex-col gap-4"}>
            <Input
              type={"email"}
              name={"email"}
              label={"Email"}
              value={formData.email || ""}
              placeholder={"Enter your Email"}
              onChange={handleChange}
            />
            {error.email && (
              <div className={"text-danger text-medium"}>{error.email}</div>
            )}
            <Input
              type={"text"}
              name={"username"}
              label={"Username"}
              value={formData.username || ""}
              placeholder={"Enter your Username"}
              onChange={handleChange}
            />
            {error.username && (
              <div className={"text-danger text-medium"}>{error.username}</div>
            )}
            <Input
              type={"password"}
              name={"password"}
              label={"Password"}
              value={formData.password || ""}
              placeholder={"Enter your Password"}
              onChange={handleChange}
            />
            {error.password && (
              <div className={"text-danger text-medium"}>{error.password}</div>
            )}
            <Input
              type={"password"}
              name={"cpassword"}
              label={"Confirm Password"}
              value={formData.cpassword || ""}
              placeholder={"Enter your Password again"}
              onChange={handleChange}
            />
            {error.cpassword && (
              <div className={"text-danger text-medium"}>{error.cpassword}</div>
            )}
            <center>
              <Button
                type={"submit"}
                size={"md"}
                className={"w-48 disabled:cursor-not-allowed"}
                color={"primary"}
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? "Registering.." : "Register"}
              </Button>
            </center>
          </form>
          <GoogleProvider />
        </CardBody>
        <div className={"flex justify-center items-center gap-2"}>
          Already have an account?{" "}
          <Link showAnchorIcon className={"text-primary"}>
            <NavLink to={"/"}>Login</NavLink>
          </Link>
        </div>
      </Card>
    </div>
  );
}
