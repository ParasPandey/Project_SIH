import React from 'react'

const FilterButtons = ({activeBtn,ApplyFilterOnInput}) => {
  return (
    <div className="filter_buttons">
    <button
      type="button"
      className={`btn btn${
        activeBtn === "5 Days" ? "" : "-outline"
      }-primary`}
      onClick={() => ApplyFilterOnInput("5-D")}
    >
      5 Days
    </button>
    <button
      type="button"
      className={`btn btn${
        activeBtn === "1 Month" ? "" : "-outline"
      }-primary`}
      onClick={() => ApplyFilterOnInput("1-M")}
    >
      1 Month
    </button>
    <button
      type="button"
      className={`btn btn${
        activeBtn === "3 Month" ? "" : "-outline"
      }-primary`}
      onClick={() => ApplyFilterOnInput("3-M")}
    >
      3 Month
    </button>
    <button
      type="button"
      className={`btn btn${
        activeBtn === "6 Month" ? "" : "-outline"
      }-primary`}
      onClick={() => ApplyFilterOnInput("6-M")}
    >
      6 Month
    </button>

    <button
      type="button"
      className={`btn btn${
        activeBtn === "1 Year" ? "" : "-outline"
      }-primary`}
      onClick={() => ApplyFilterOnInput("1-Y")}
    >
      1 Year
    </button>
    <button
      type="button"
      className={`btn btn${
        activeBtn === "5 Year" ? "" : "-outline"
      }-primary`}
      onClick={() => ApplyFilterOnInput("5-Y")}
    >
      5 Year
    </button>
    <button
      type="button"
      className={`btn btn${
        activeBtn === "Default" ? "" : "-outline"
      }-primary`}
      onClick={() => ApplyFilterOnInput(" ")}
    >
      All
    </button>
  </div>
  )
}

export default FilterButtons
