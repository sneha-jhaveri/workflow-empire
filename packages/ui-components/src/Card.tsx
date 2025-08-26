import React from "react";

export const Card = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => (
  <div>
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);
