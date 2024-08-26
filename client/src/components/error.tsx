import { Card, CardBody } from "@nextui-org/card";
import { Button, CardHeader, Input, Link } from "@nextui-org/react";

export default function Error() {
  function handleReload() {
    window.location.reload();
  }
  return (
    <div className="dark text-foreground bg-background h-[100vh]">
      <div className={"flex flex-col   items-center justify-center pt-20"}>
        <Card className={"w-[45vw] p-14 mt-5 cursor-pointer"}>
          <CardHeader className={"px-4 pt-2 flex items-center justify-center"}>
            <img src={"/error.png"} width={130} height={150} />
          </CardHeader>
          <CardBody>
            <div className={"flex flex-col gap-3"}>
                <span>
                   Oops! Something went wrong  We're working on fixing this issue
                </span>
              <center>

                <Button
                  type={"submit"}
                  size={"md"}
                  className={"w-48"}
                  color={"primary"}
                  onClick={handleReload}
                >
                  Retry
                </Button>
              </center>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
