import { requireSession } from "@/lib/session";
import UpdateForm from "./UpdateForm";

export default async function UpdatePage() {
  const { user } = await requireSession("/profile/update");
  return <UpdateForm name={user.name} />;
}
