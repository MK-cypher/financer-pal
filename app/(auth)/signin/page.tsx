import Form from "../components/Form";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Signin",
  description: "",
};

export default async function page() {
  return (
    <main className="flex justify-center items-center min-h-lvh">
      <Form signin={true} />
    </main>
  );
}
