"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, createContext, useContext } from "react";
// import { useAuth } from "../global/contexts/AuthContext";

export default function OrgValidity() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orgDomain, setOrgDomain] = useState("");
  const router = useRouter();
  const [isDomainValid, setIsDomainValid] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`/api/niamadmin/searchorg`, {
        orgDomain,
      });

      if (!response.data.success) {
        setError(response.data.message);
        return;
      }

      setResponse(response.data);
      setIsDomainValid(true);
      console.log("Organization is valid");
      router.push("/Login");
    } catch (error) {
      setError(`Failed to validate domain: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="organizationDomainForm">
        <label htmlFor="organizationdomain">Organization domain</label>
        <input
          type="text"
          placeholder="organizationdomain.com"
          required
          value={orgDomain}
          onChange={(event) => setOrgDomain(event.target.value)}
        />
        <button className="submitButton" type="submit" value="submit">
          Proceed
        </button>
        {error && (
          <div>
            <p>{error}. Please input a valid domain</p>
          </div>
        )}
      </form>
    </>
  );
}
