import { Card, CardBody } from "@nextui-org/card";
import { Button, CardHeader, Input, Link } from "@nextui-org/react";

export default function VerifyForm({
  code,
  handleSubmit,
  handleChange,
  handleSendNewCode,
  error,
  resendMessage,
  timeLeft,
  isDisabled,
  isLoading,
  isRequesting,
}) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return (
    <div className={"flex flex-col  w-full  items-center justify-center pt-20"}>
      <Card className={"w-full max-w-lg p-10 mt-5 cursor-pointer"}>
        <CardHeader className={"px-4 pt-2 flex items-center justify-center"}>
          <img src={"/logo.png"} width={130} height={150} />
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className={"flex flex-col gap-3"}>
            <div>
              {resendMessage ? "" : "  An OTP code has been Sent to your Email"}
            </div>

            {resendMessage && (
              <div className={"text-md text-success px-2 pb-2"}>
                {resendMessage}
              </div>
            )}
            <div className={"text-yellow-600"}>The OTP Expires In 1hour</div>
            {error && (
              <div className={"text-md text-danger px-2 pb-2"}>{error}</div>
            )}
            <Input
              type={"number"}
              name={"code"}
              label={"Code"}
              value={code}
              onChange={handleChange}
              placeholder={"Enter code"}
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
                {isLoading ? "Verifying.." : "Verify"}
              </Button>
            </center>
          </form>
        </CardBody>
        <div className={"flex justify-center items-center gap-2"}>
          Dont see code
          <Link showAnchorIcon className={"text-primary"}>
            {!isDisabled ? (
              <button type={"button"} onClick={handleSendNewCode}>
                {isRequesting ? "Requesting..." : "Get anew one"}
              </button>
            ) : (
              <div className={"cursor-default"}>
                Request a new in {minutes}:
                {seconds < 10 ? `0${seconds}` : seconds} min
              </div>
            )}
          </Link>
        </div>
      </Card>
    </div>
  );
}
