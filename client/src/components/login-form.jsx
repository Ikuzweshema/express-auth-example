import { Card, CardBody } from "@nextui-org/card";
import { Button, CardHeader, Input, Link } from "@nextui-org/react";
import { Link as NavLink } from "react-router-dom";

export default function LoginForm({
  error,
  formData,
  handleSubmit,
  handleChange,
  isLoading,
}) {
  return (
    <div className={"flex flex-col  items-center justify-center pt-20"}>
      <Card className={"w-[35vw] p-10 mt-5 cursor-pointer"}>
        <CardHeader className={"px-4 pt-2 flex items-center justify-center"}>
          <img src={"/logo.png"} width={130} height={150} />
        </CardHeader>
        <CardBody>
          {error && (
            <div className={"text-xl text-danger px-2 pb-2"}>{error}</div>
          )}
          <form onSubmit={handleSubmit} className={"flex flex-col gap-4"}>
            <Input
              type={"text"}
              name={"email"}
              label={"Email"}
              value={formData.username}
              placeholder={"Enter your Email"}
              onChange={handleChange}
            />
            <Input
              type={"password"}
              name={"password"}
              label={"Password"}
              value={formData.password}
              placeholder={"Enter your Password"}
              onChange={handleChange}
            />
            <center>
              {" "}
              <Button
                type={"submit"}
                size={"md"}
                className={"w-48 disabled:cursor-not-allowed"}
                color={"primary"}
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </center>
          </form>
        </CardBody>
        <div className={"flex justify-center items-center gap-2"}>
          Don't have account{" "}
          <Link showAnchorIcon className={"text-primary"}>
            <NavLink to={"/register"}>Register</NavLink>
          </Link>
        </div>
      </Card>
    </div>
  );
}
