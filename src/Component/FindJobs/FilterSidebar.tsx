import { Divider, RangeSlider } from "@mantine/core"
import { dropdownData } from "../../assets/Data/JobsData"
import MultiInput from "./MultiInput"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateFilter } from "../../Slices/FilterSlice";

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([0, 100]);
  const handleChange = (event: any) => {
    dispatch(UpdateFilter({ salary: event }));
  }

  return (
    <div className="flex flex-col px-5 py-4 shadow-md rounded-lg sm:px-3 sm:py-2">
      {
        dropdownData.filter(item => item.title === "Job Type" || item.title === "Experience").map((item, index) => (
          <React.Fragment key={index}>
            <div className="mb-4">
              <MultiInput {...item} alwaysOpen />
            </div>
            <Divider my="xs" size="xs" />
          </React.Fragment>
        ))
      }
      <div className="mb-4">
        <div className="flex justify-between">
          <div>Salary </div>
          <div>&#8377;{value[0]}lpa - &#8377;{value[1]}lpa</div>
        </div>
        <RangeSlider onChangeEnd={handleChange} size="xs" color="blue.4" max={100} value={value} labelTransitionProps={{
          transition: 'skew-down',
          duration: 150,
          timingFunction: 'linear',
        }} onChange={setValue} />
      </div>
    </div>
  )
}

export default FilterSidebar
