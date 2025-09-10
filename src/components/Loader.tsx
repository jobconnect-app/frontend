import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loader = () => (
  <div className="flex items-center justify-center min-h-[120px] py-8">
    <FontAwesomeIcon icon={faSpinner} spin className="h-8 w-8 text-blue-600" />
  </div>
);

export default Loader;
