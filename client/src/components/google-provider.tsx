import { Button } from "@nextui-org/react";

export default function GoogleProvider() {
   function continueWithGoogle() {
    try {
      window.location.replace(`${import.meta.env.VITE_SEVER_URL}/api/google/sigin`);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <div className="w-full flex justify-center items-center p-3">
        <span className="text-base text-center font-semibold">-----OR-----</span>
      </div>
      <div className="w-full p-2">
        <Button size="lg" onClick={continueWithGoogle} className="w-full">
          <img className="w-10" src="/google.png"/>  Continue with Google
        </Button>
      </div>
    </div>
  );
}
