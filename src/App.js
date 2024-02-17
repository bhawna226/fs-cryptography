import "./App.css";
import { useState } from "react";
import CryptoJS from "crypto-js";

const SecurityApp = () => {
  const [encryptionKey, setEncryptionKey] = useState("uiaeskey");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isEncryptMode, setIsEncryptMode] = useState(true);

  const handleEncryptDecrypt = () => {
    if (isEncryptMode) {
      // Perform encryption logic
      const encryptedText = encrypt(inputText, encryptionKey);
      setOutputText(encryptedText);
    } else {
      // Perform decryption logic
      const decryptedText = decrypt(inputText, encryptionKey);
      setOutputText(decryptedText);
    }
  };

  const encryptDataToSHAString = (data, key) => {
    var string =
      data &&
      CryptoJS.DES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }).toString();

    return string;
  };

  const decryptFromSHAString = (data, key) => {
    var string =
      data &&
      CryptoJS.DES.decrypt(
        data.replace('"', ""),
        CryptoJS.enc.Utf8.parse(key),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      ).toString(CryptoJS.enc.Utf8);

    return string;
  };

  const encrypt = (dataObj, encryptionKey) => {
    dataObj = JSON.parse(dataObj);
    dataObj = encryptDataToSHAString(JSON.stringify(dataObj), encryptionKey);

    return dataObj;
  };

  const decrypt = (response, encryptionKey) => {
    response = (decryptFromSHAString(response, encryptionKey));

    return response;
  };

  const handleswitch = () => {
    setIsEncryptMode(!isEncryptMode);
    setInputText("");
    setOutputText("");
  }

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="w-4/5 mx-auto p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl text-white font-semibold mb-6 text-center">
          FS Cryptography
        </h1>
        <input
          type="text"
          placeholder="Enter encryption key"
          value={encryptionKey}
          onChange={(e) => setEncryptionKey(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex mb-4">
          <textarea
            placeholder="Enter value"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-grow mr-2 h-32 px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-auto resize-none"
          />
          <textarea
            placeholder="Output"
            value={outputText}
            readOnly
            className="flex-grow ml-2 h-32 px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-auto resize-none"
          />
        </div>
        <button
          onClick={handleEncryptDecrypt}
          className="w-full mt-4 py-2 rounded-md bg-gradient-to-r from-rose-800 to-fuchsia-300 hover:from-rose-900 hover:to-fuchsia-400 text-white text-semibold "
        >
          {isEncryptMode ? "Encrypt" : "Decrypt"}
        </button>
        <button
          onClick={handleswitch}
          className="w-full mt-4 py-2 rounded-md bg-gradient-to-r hiver:from-sky-400 hover:to-blue-700 from-sky-300 to-blue-600 text-white text-semibold"
        >
          {isEncryptMode ? "Switch to Decrypt" : "Switch to Encrypt"}
        </button>
      </div>
    </div>
  );
};

export default SecurityApp;
