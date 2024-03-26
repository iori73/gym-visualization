/** @format */

// import React, { useState, useEffect } from "react";
// import Papa from "papaparse";

// interface CsvRow {
//   Time: string;
//   Name: string;
//   Value: string;
// }

// const DataComponent = () => {
//   const [data, setData] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch("/data.csv");
//       if (!response.body) throw new Error("Response body is null");
//       const reader = response.body.getReader();
//       const result = await reader.read(); // raw binary data
//       const decoder = new TextDecoder("utf-8");
//       const csv = decoder.decode(result.value); // convert to text
//     //   Papa.parse(csv, {
//     //     header: true,
//     //     complete: (results) => {
//     //       setData(results.data);
//     //     },
//     //   });
//     Papa.parse<CsvRow>(csv, {
//       // Specify the type parameter here
//       header: true,
//       complete: (results) => {
//         setData(results.data);
//         // 初期選択肢としてCSVファイルの最初の日付列を設定します
//         setSelectedDate(Object.keys(results.data[0])[1]);
//       },
//     });
//     }

//     fetchData();
//   }, []);

//     const formatTime = (time) => {
//       // 時間の表示を調整する処理...
//     };

//     const handleDateChange = (event) => {
//       setSelectedDate(event.target.value);
//     };

//   return (
//     // <div>
//     //   {data.map((row, index) => (
//     //     <div key={index}>
//     //       <span>{row.Time}</span>
//     //       {Object.entries(row).map(
//     //         ([key, value], i) =>
//     //           key !== "Time" && <span key={i}>{`${key}: ${value}`}</span>
//     //       )}
//     //     </div>
//     //   ))}
//     // </div>
//     <div>
//       <div>
//         <label htmlFor="date-select">日付を選択:</label>
//         <select
//           id="date-select"
//           value={selectedDate}
//           onChange={handleDateChange}
//         >
//           {data.length > 0 &&
//             Object.keys(data[0])
//               .filter((key) => key !== "Time")
//               .map((key, index) => (
//                 <option key={index} value={key}>
//                   {key}
//                 </option>
//               ))}
//         </select>
//       </div>
//       {data.map((row, index) => (
//         <div key={index}>
//           <div>{formatTime(row.Time)}</div>
//           <div>利用人数: {row[selectedDate]}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DataComponent;

// import React, { useState, useEffect } from "react";
// import Papa from "papaparse";

// // CSVの列に対応するインターフェース
// interface CsvRow {
//   Time: string;
//   [key: string]: string; // "3月22日"や"3月23日"など、動的な列名に対応するプロパティ
// }

// const DataComponent = () => {
//   const [data, setData] = useState<CsvRow[]>([]); // CsvRow型の配列に修正
//   const [selectedDate, setSelectedDate] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch("/data.csv");
//       const reader = response.body.getReader();
//       const result = await reader.read(); // raw binary data
//       const decoder = new TextDecoder("utf-8");
//       const csv = decoder.decode(result.value); // convert to text

//       Papa.parse<CsvRow>(csv, {
//         header: true,
//         complete: (results) => {
//           setData(results.data);
//           // 初期選択肢としてCSVファイルの最初の日付列を設定します
//           setSelectedDate(Object.keys(results.data[0])[1]);
//         },
//       });
//     }

//     fetchData();
//   }, []);

//   const formatTime = (time: string) => {
//     // 時間の表示を調整する処理...
//   };

//   const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedDate(event.target.value);
//   };

//   return (
//     <div>
//       <div>
//         <label htmlFor="date-select">日付を選択:</label>
//         <select
//           id="date-select"
//           value={selectedDate}
//           onChange={handleDateChange}
//         >
//           {data.length > 0 &&
//             Object.keys(data[0])
//               .filter((key) => key !== "Time")
//               .map((key, index) => (
//                 <option key={index} value={key}>
//                   {key}
//                 </option>
//               ))}
//         </select>
//       </div>
//       {data.map((row, index) => (
//         <div key={index}>
//           <div>{formatTime(row.Time)}</div>
//           <div>利用人数: {row[selectedDate] || "データなし"}</div>{" "}
//           {/* selectedDateが未選択の場合を考慮 */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DataComponent;

import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Box from "./Box";

interface CsvRow {
  Time: string;
  [key: string]: string; // Assuming all other keys are dynamic but have string values
}



const DataComponent = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timeOptions, setTimeOptions] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/data.csv");
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value);

      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          setData(results.data);
          setTimeOptions(results.data.map((row) => row.Time));
          setSelectedDate(
            Object.keys(results.data[0]).find((k) => k !== "Time")
          );
        },
      });
    }

    fetchData();
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  const getNumberOfPeople = () => {
    const timeData = data.find((row) => row.Time === selectedTime);
    return timeData ? timeData[selectedDate] || "0" : "0";
  };

  //images
  const images = new Array(12)
    .fill(null)
    .map((_, index) => `imgs/${index + 1}.png`);

  const getImagesToDisplay = () => {
    const numberOfPeople = parseInt(getNumberOfPeople());
    const imagesToDisplay = [];
    for (let i = 0; i < numberOfPeople; i++) {
      imagesToDisplay.push(images[i % images.length]);
    }
    return imagesToDisplay;
  };

  // Box
  // 36個のFlatBoxコンポーネントをレンダリングする関数
  const renderBoxes = () => {
    return [...Array(36)].map((_, index) => <Box key={index} />);
  };

  return (
    <div>
      {/* information */}
      <div className="information">
        <div>
          <label htmlFor="date-select">日付を選択:</label>
          <select
            id="date-select"
            value={selectedDate}
            onChange={handleDateChange}
          >
            {data[0] &&
              Object.keys(data[0])
                .filter((key) => key !== "Time")
                .map((key, index) => (
                  <option key={index} value={key}>
                    {key}
                  </option>
                ))}
          </select>
        </div>
        <div>
          <label htmlFor="time-select">時間を選択:</label>
          <select
            id="time-select"
            value={selectedTime}
            onChange={handleTimeChange}
          >
            {timeOptions.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3>利用人数: {getNumberOfPeople()}</h3>
        </div>
      </div>

      <div className="content_container">
        {/* imgs */}
        <div className="imgs_container">
          {getImagesToDisplay().map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Gym activity"
            />
          ))}
        </div>
        {/* isometric box */}
        {/* <div className="box_container">
          <div className="box">
            <div className="face">
              <div className="rectangle"></div>
            </div>
            <div className="shadow"></div>
          </div>
          <div className="box">
            <div className="face">
              <div className="rectangle"></div>
            </div>
            <div className="shadow"></div>
          </div>
          <div className="box">
            <div className="face">
              <div className="rectangle"></div>
            </div>
            <div className="shadow"></div>
          </div>
        </div> */}
        {/* Box */}
        <div className="flat_box_container">{renderBoxes()}</div>
            </div>
      </div>
  );
};

export default DataComponent;
