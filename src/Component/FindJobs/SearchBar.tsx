import { Divider } from "@mantine/core";
import { dropdownData } from "../../assets/Data/JobsData";
import MultiInput from "./MultiInput";
import React from "react";

const SearchBar = () => {
  return (
    <div className="flex flex-wrap items-center gap-x-2 px-3 py-2 bg-cape-cod-900 shadow-sm rounded-full mx-4 ">
      {dropdownData
        .filter((item) => item.title === "Job Title" || item.title === "Location")
        .map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex-1 min-w-0 ">
              <MultiInput {...item} />
            </div>
            {index === 0 && (
              <Divider className="hidden sm:block" mr="xs" size="xs" orientation="vertical" />
            )}
          </React.Fragment>
        ))}
    </div>
  );
};

export default SearchBar;
