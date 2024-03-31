import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

const FailureAlert = ({ error }) => {
  return (
    <Alert color="failure" className="md:p-0.5 p-lg capitalize md:rounded-xs rounded-xxs">
      <div className="item-center leading-none">
        <HiInformationCircle className="text-red-500 mr-1" size={24} />
        <span className="md:text-base text-sm md:font-bold font-semibold">Error:</span> &nbsp;
        <span className="md:text-sm text-xs md:font-medium font-light item-center lowercase leading-none">{error}</span>
      </div>
    </Alert>
  );
};

export default FailureAlert;
