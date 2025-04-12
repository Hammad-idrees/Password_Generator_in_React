import { useState, useCallback, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-={}[]|:;<>,.?/~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-black w-full">
      <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-2xl w-96 shadow-2xl border border-gray-700 transform transition duration-500 hover:scale-105 mx-auto my-auto">
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 blur-xl animate-pulse"></div>

        <div className="relative z-10">
          <h2 className="text-white text-2xl text-center mb-6 font-bold tracking-wide">
            Password Generator
          </h2>

          <div className="mb-6">
            <div className="flex mb-2 relative overflow-hidden rounded-lg">
              <input
                type="text"
                value={password}
                placeholder="Your secure password"
                readOnly
                className="w-full px-4 py-3 rounded-lg text-gray-800 bg-gray-100 font-mono text-lg border-2 border-transparent focus:border-blue-500 transition duration-300"
              />
              <button
                className={`absolute right-0 h-full px-4 font-medium transition-all duration-300 flex items-center justify-center ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                onClick={handleCopy}
              >
                {copied ? "COPIED!" : "COPY"}
              </button>
            </div>

            <button
              onClick={passwordGenerator}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Generate New Password
            </button>
          </div>

          <div className="space-y-5 text-white">
            <div className="space-y-2">
              <label className="flex justify-between items-center">
                <span className="text-base">
                  Password Length:{" "}
                  <span className="font-bold text-blue-400">{length}</span>
                </span>
              </label>
              <input
                type="range"
                min={6}
                max={50}
                value={length}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                onChange={(e) => {
                  setLength(parseInt(e.target.value));
                }}
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>6</span>
                <span>28</span>
                <span>50</span>
              </div>
            </div>

            <div className="flex justify-between space-x-4">
              <div className="relative flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={numberAllowed}
                  id="numberInput"
                  onChange={() => {
                    setNumberAllowed(!numberAllowed);
                  }}
                  className="sr-only"
                />
                <div
                  className={`w-10 h-6 ${
                    numberAllowed ? "bg-blue-600" : "bg-gray-600"
                  } rounded-full transition duration-300 ease-in-out`}
                  onClick={() => setNumberAllowed(!numberAllowed)}
                >
                  <div
                    className={`transform transition duration-300 ease-in-out w-4 h-4 rounded-full bg-white ${
                      numberAllowed ? "translate-x-5" : "translate-x-1"
                    } mt-1`}
                  ></div>
                </div>
                <label
                  htmlFor="numberInput"
                  className="ml-2 text-base"
                  onClick={() => setNumberAllowed(!numberAllowed)}
                >
                  Numbers
                </label>
              </div>

              <div className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={charAllowed}
                  id="characterInput"
                  onChange={() => {
                    setCharAllowed(!charAllowed);
                  }}
                  className="sr-only"
                />
                <div
                  className={`w-10 h-6 ${
                    charAllowed ? "bg-purple-600" : "bg-gray-600"
                  } rounded-full transition duration-300 ease-in-out`}
                  onClick={() => setCharAllowed(!charAllowed)}
                >
                  <div
                    className={`transform transition duration-300 ease-in-out w-4 h-4 rounded-full bg-white ${
                      charAllowed ? "translate-x-5" : "translate-x-1"
                    } mt-1`}
                  ></div>
                </div>
                <label
                  htmlFor="characterInput"
                  className="ml-2 text-base"
                  onClick={() => setCharAllowed(!charAllowed)}
                >
                  Symbols
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
            <p>Your password is generated locally and never stored</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
