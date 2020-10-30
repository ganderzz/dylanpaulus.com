import React from "react";
import H from "react-helmet";

const Helmet: any = H;

export default function Redirect({ pageContext }) {
  return (
    <Helmet>
      <meta http-equiv="refresh" content={`0;URL='${pageContext.to}'`} />
    </Helmet>
  );
}
