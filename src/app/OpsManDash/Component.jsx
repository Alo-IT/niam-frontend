import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
  return (
    <>
      <Title>Ops Manager Dashboard</Title>
      <Button type="primary" onClick={() => router.push("/AddSystem")}>
        Add System
      </Button>
    </>
  );
}
