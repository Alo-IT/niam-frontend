import { Button, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
  return (
    <>
      <Title>Add System</Title>
      <Form>
        <Form.Item>
          <Input />
        </Form.Item>
      </Form>
    </>
  );
}
