"use client";

import { useState, useEffect } from "react";

export default function TestPage() {
  const [testResult, setTestResult] = useState("Not started");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function testFetch() {
      try {
        setTestResult("Fetching...");
        const response = await fetch("/api/fred/series?seriesId=UNRATE");

        setTestResult(`Response status: ${response.status}`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const json = await response.json();
        setData(json);
        setTestResult("Success!");
      } catch (error) {
        setTestResult(`Error: ${error}`);
      }
    }

    testFetch();
  }, []);

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <h1 className="text-2xl mb-4">Direct Fetch Test</h1>

      <div className="space-y-4">
        <div>
          <strong>Test Status:</strong> {testResult}
        </div>

        {data && (
          <div>
            <strong>Data:</strong>
            <pre className="bg-gray-800 p-4 rounded mt-2 overflow-auto max-h-96">
              {JSON.stringify(data, null, 2).slice(0, 1000)}
            </pre>
            <div className="mt-2">
              <strong>Count:</strong> {data.count}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
