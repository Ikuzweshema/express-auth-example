import { useSession } from "../hooks/use-session";
import Nav from "./navbar.jsx";
import { useNavigate } from "react-router-dom";
import { Snippet } from "@nextui-org/react";
export default function Dashboard() {
 const { session } = useSession();

  const navigate = useNavigate();
  if (session.status === "unauthenticated") {
    return navigate("/");
  }
  console.log(session);
  return (
    <div className="dark text-foreground bg-background h-[100vh]">
      <div className={"flex flex-col gap-4 p-5"}>
        <Nav />
        <div className={"flex flex-col  items-center justify-center pt-20 "}>
          <Snippet
            className={"w-86 p-5"}
            color={"secondary"}
            variant={"bordered"}
            symbol={""}
          >
            <pre>{JSON.stringify(session.user, null, 2)}</pre>
          </Snippet>
        </div>
      </div>
    </div>
  );
}
