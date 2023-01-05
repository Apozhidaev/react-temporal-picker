import DatePicker from "../../src/index";
import RangePicker from "../../src/range";

function App() {
  return (
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td>
            <DatePicker
              onSelect={(date) => {
                console.log(date);
              }}
              onClear={() => {
                console.log("clear");
              }}
              options={{
                extraOptions: {
                  resetButton: true,
                },
              }}
            />
          </td>
          <td>
            <RangePicker
              startDate="2022-01-01"
              endDate="2022-01-16"
              onSelect={(start, end) => {
                console.log(start, end);
              }}
              options={{
                position: "right",
                presetOptions: {
                  presets: [
                    {
                      label: "Last Week",
                      start: "2022-01-01",
                      end: "2023-01-01",
                    },
                    {
                      label: "Last Month",
                      start: "2021-01-01",
                      end: "2023-01-01",
                    },
                    {
                      label: "Last Year",
                      start: "2019-01-01",
                      end: "2023-01-01",
                    },
                  ],
                },
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default App;
