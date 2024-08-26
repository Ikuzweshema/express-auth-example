import { Card, CardBody } from "@nextui-org/card";
import { CardHeader, Link} from "@nextui-org/react";
import {Link as NavLink} from "react-router-dom";

export default function NotFound() {
  return (
    <div className="dark text-foreground bg-background h-[100vh]">
      <div className={"flex flex-col   items-center justify-center pt-20"}>
        <Card className={"w-[45vw] p-14 mt-5 cursor-pointer"}>
          <CardHeader className={"px-4 pt-2 flex items-center justify-center"}>
            <img src={"/404.png"} width={150} height={160} />
          </CardHeader>
          <CardBody>
            <div className={"flex flex-col gap-3"}>
              <span>
                Oops! Its Like You are lost This Page Doesn't Exist
              </span>
              <center>
                <Link showAnchorIcon className={"text-primary"}>
                  <NavLink to={"/"}>Home</NavLink>
                </Link>
              </center>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
