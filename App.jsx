import { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState("");
  const [option, setOption] = useState("");
  const[convertedText,setconvertedText] = useState("")

  const captureText = (e) => {
    setText(e.target.value);
  };

  const captureOption = (e) => {
    setOption(e.target.value);
  };

  const convertText = async () => {
    const optionsData = {
      method: 'POST',
      url: 'https://google-translator9.p.rapidapi.com/v2',
      headers: {
        'x-rapidapi-key': 'ef4378bacamsh01831bb8b1c6cefp165019jsnaa110ceb9a70',
        'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        q: `${text}`,
        source: 'en',
        target: `${option}`,
        format: 'text'
      }
    };

    try {
      const response = await axios.request(optionsData);
     setconvertedText(response.data?.data?.translations[Number(0)]?.translatedText)
      
    } catch (error) {
      console.error( error);
      
    }
  };
  console.log(text)
  console.log(option)
  return (
    <>
      <div className="h-screen w-full bg-blue-200 flex items-center justify-center flex-col gap-6 ">

        <input
          type="text"
          placeholder="Enter your text"
          className="w-96 h-12 border border-slate-900 rounded-lg px-6"
          onChange={captureText}
        />

        <div className="text-center flex items-center">
          <label className="font-serif mr-2">Choose your language:</label>
          <select className="cursor-pointer border px-4 py-2 rounded-lg" onChange={captureOption}>

            <option value="ta">Tamil</option>
            <option value="ko">Korean</option>
            <option value="hi">Hindi</option>
            <option value="ti">Thai</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-800 text-white rounded-lg h-10 px-6 hover:bg-amber-50 hover:text-blue-900 border border-slate-200 flex items-center justify-center"
          onClick={convertText}>
          CONVERT
        </button>

        <div className="flex items-center gap-2 justify-center">
          <p className="bg-slate-400 text-white p-4 h-50 w-[800px] border-slate-300 rounded-lg text-center">
{convertedText}
          </p>
        </div>

      </div>
    </>
  );
}

export default App;
