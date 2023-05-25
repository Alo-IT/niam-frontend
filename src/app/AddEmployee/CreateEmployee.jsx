"use client";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import urls from "../urls";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useOrgContext } from "../global/contexts/OrgContext";
import Title from "antd/es/typography/Title";

export default function CreateEmployee() {
  const { boomed, orgValidity, handleBoomout } = useOrgContext();
  const [successMessage, setSuccessMessage] = useState("");
  const [employees, setEmployees] = useState([
    { firstName: "", lastName: "", email: "", password: "" },
  ]);

  const handleEmployeeChange = (index, field, value) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index][field] = value;
    setEmployees(updatedEmployees);
  };

  const onFinish = async (values) => {
    let isValid = true;

    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (
        !value.firstname ||
        !value.lastname ||
        !value.email ||
        !value.password
      ) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      console.log("Please provide valid inputs");
      return;
    }

    const formData = employees.map((employee) => ({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      password: employee.password,
    }));

    console.log("Sending data....", formData);

    try {
      const response = await axios.post(
        urls.baseURL + "/auth/importuser",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setSuccessMessage("Employee added successfully!");
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        setSuccessMessage("Failed to add employee. Please try again.");
      } else {
        console.log(error);
        setSuccessMessage("Failed to add employee. Please try again.");
      }
    }
  };

  return (
    <>
      <h1>Please Fillup Employee Information</h1>
      <Form style={{ width: "40vw" }} onFinish={onFinish}>
        {employees.map((employee, index) => (
          <div key={index}>
            <h1>Add Employee {index + 1}</h1>
            <Form.Item label="First Name" name={`firstname-${index}`}>
              <Input
                placeholder="Jogn"
                value={employee.firstName}
                onChange={(e) =>
                  handleEmployeeChange(index, "firstName", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label="Last Name" name={`lastname-${index}`}>
              <Input
                placeholder="Doe"
                value={employee.lastName}
                onChange={(e) =>
                  handleEmployeeChange(index, "lastName", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label="Email" name={`email-${index}`}>
              <Input
                placeholder="xyz@orgdomain.com"
                value={employee.email}
                onChange={(e) =>
                  handleEmployeeChange(index, "email", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label="Password" name={`password-${index}`}>
              <Input.Password
                placeholder="Input Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                value={employee.password}
                onChange={(e) =>
                  handleEmployeeChange(index, "password", e.target.value)
                }
              />
            </Form.Item>
          </div>
        ))}
        <Button
          type="primary"
          style={{
            backgroundColor: "orange",
            margin: "0 30px 30px 0",
            fontWeight: 700,
          }}
          onClick={() =>
            setEmployees([
              ...employees,
              { firstName: "", lastName: "", email: "", password: "" },
            ])
          }
        >
          Add Another Employee
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            backgroundColor: "green",
            fontWeight: 700,
          }}
        >
          Create Employees
        </Button>
      </Form>

      {successMessage && (
        <div>
          <Title level={4} style={{ color: "green" }}>
            {successMessage}
          </Title>
        </div>
      )}
      <Button
        type="primary"
        style={{
          position: "fixed",
          top: "25px",
          right: "220px",
        }}
        onClick={() => router.push("/OrgAdminDash")}
      >
        Go Back
      </Button>
      <Button
        type="primary"
        size="large"
        style={{
          background: "#F44336",
          color: "white",
          fontWeight: 500,
          padding: "10px 30px",
          margin: "0 0",
          lineHeight: "1.1em",
          position: "fixed",
          top: "20px",
          right: "40px",
        }}
        icon={<LogoutOutlined />}
        onClick={handleBoomout}
      >
        Log Out
      </Button>
    </>
  );
}
