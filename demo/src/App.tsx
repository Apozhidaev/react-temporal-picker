import { PlainPicker, RangePicker } from "../../src/index";

function App() {
  return (
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td>
            <PlainPicker
              value="2022-01-01"
              onChange={(date) => {
                console.log(date);
              }}
            />
          </td>
          <td>
            <RangePicker
              start="2022-01-01"
              end="2022-01-16"
              onChange={(start, end) => {
                console.log(start, end);
              }}
              placement="bottom-end"
              autoApply
              resetButton
              monthSelect
              yearSelect
              presets={[
                { label: "Preset 1", start: "2023-01-01", end: "2023-02-15" },
                { label: "Preset 2", start: "2023-01-01" },
              ]}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default App;
