import { Form } from "antd";
import Title from "antd/es/typography/Title";

export default function OrgAdminList() {
  return (
    <>
      <Title level={4}>Org Admin List</Title>

      <Form>
        <Form.Item label="Organization Admins">
          {/* {orgs[0]?.org_admin?.map((admin) => (
            <div key={admin.id}>{admin.email}</div>
          ))} */}
        </Form.Item>
      </Form>
    </>
  );
}
