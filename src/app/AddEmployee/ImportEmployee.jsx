import { useState } from "react";
import { Form, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const ImportEmployee = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  const onFinish = async () => {
    try {
      if (!file) {
        message.error("Please select a file to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/auth/importuser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response as needed
      console.log(response.data);

      // Reset form and file state
      form.resetFields();
      setFile(null);

      message.success("Employees imported successfully!");
    } catch (error) {
      console.log(error.response.data);
      message.error("Failed to import employees. Please try again.");
    }
  };

  const beforeUpload = (file) => {
    const allowedTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const isAllowedType = allowedTypes.includes(file.type);

    if (!isAllowedType) {
      message.error("Only CSV and XLSX file types are allowed.");
    }

    setFile(file);
    return false; // Prevent file upload
  };

  return (
    <div>
      <h4>Please upload employee sheet (e.g: example.csv or example.xlsx)</h4>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="file"
          label="Upload File"
          rules={[
            {
              required: true,
              message: "Please select a file to upload.",
            },
          ]}
        >
          <Upload beforeUpload={beforeUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Import Employees
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ImportEmployee;
