import { format } from "winston";

export const file = format.printf(
  ({ level, message, timestamp, ...params }) => {
    if (level === "error") {
      const textFromTheStackWithNoSpacing = params.stack.replace(
        /\n|\r|( {4})+/g,
        ""
      );

      return JSON.stringify({
        level,
        message,
        stack: textFromTheStackWithNoSpacing ?? "",
        timestamp,
      });
    }

    if (Object.keys(params).length > 0)
      return JSON.stringify({ level, message, ...params, timestamp });

    return JSON.stringify({ level, message, timestamp });
  }
);
