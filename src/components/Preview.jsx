import React from "react";

const Preview = ({ code }) => {
  return (
    <iframe
      srcDoc={code}
      width="100%"
      height="100%"
      title="preview"
      frameBorder="0"
      sandbox="allow-scripts"
    ></iframe>
  );
};

export default Preview;
