import React from "react";
import ReactMarkdown from "react-markdown";

export default function PlanDisplay({response}: {response: string}) {
  return (
    <div className="mt-5">
      {response ? (
        <div className="markdown-content">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
