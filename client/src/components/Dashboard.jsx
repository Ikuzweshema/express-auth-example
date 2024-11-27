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
    <div className="dark text-foreground bg-background h-screen">
      <div className={"flex flex-col gap-4 p-5 w-full h-full"}>
        <Nav />
        <div className={"flex flex-col w-full  items-center justify-center pt-10 "}>
          <Snippet
            className={"w-full  h-full max-w-xl p-5"}
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
