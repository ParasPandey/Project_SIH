import React from "react";
import DatePicker from "react-datepicker";
import range from "lodash/range";
import { getMonth, getYear } from "date-fns";

const MyDatePicker = ({
  selectsStart,
  selectsEnd,
  rangeStart,
  rangeEnd,
  setRange,
  selected,
  minDate,
  maxDate,
}) => {
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const selectDate = (d) => {
    setRange(d);
  };

  return (
    <DatePicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      selectsStart
      selectsEnd
      selected={selected}
      startDate={rangeStart}
      endDate={rangeEnd}
      onChange={selectDate}
      maxDate={maxDate}
      minDate={minDate}
      dateFormat="dd/MM/yyyy"
    />
  );
};

export default MyDatePicker;
