"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrgValidity() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDomainValid, setIsDomainValid] = useState(false);
  const [organizationDomain, setOrganizationDomain] = useState();

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/organization/validate-domain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ organizationDomain }),
      });
      if (!response.ok) {
        setError(`Failed to validate domain`);
        return;
      }
      const data = await response.json();
      if (!data.success) {
        setError(data.message);
        return;
      }
      setResponse(data); // set response state here
      setIsDomainValid(true);
    } catch (error) {
      setError(`Failed to validate domain: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    // return <div>{error}</div>;
  }

  if (response && response.success) {
    return;
  }

  if (response && !response.success) {
    return <div>{response.message}</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="organizationDomainForm">
        <label htmlFor="organizationdomain">Organization domain</label>
        <input
          type="text"
          placeholder="organizationdomain.com"
          required
          value={organizationDomain}
          onChange={(event) => setOrganizationDomain(event.target.value)}
        />
        <select
          value={organizationDomain}
          onChange={(event) => setOrganizationDomain(event.target.value)}
        >
          <option value="">Select organization</option>
          <option value="aliio.inc">Aliio Inc.</option>
          <option value="www.sardarbikes.com">Sardar Bikes</option>
        </select>
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
