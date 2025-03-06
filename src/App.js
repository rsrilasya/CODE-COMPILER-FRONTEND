import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import Navbar from './Components/Navbar';
import spinner from './spinner.gif';
import { executeCode } from './api';
import { CODE_SNIPPETS } from './constants';

function App() {
  const [userCode, setUserCode] = useState('');
  const [userLang, setUserLang] = useState('');
  const [userTheme, setUserTheme] = useState(localStorage.getItem('userTheme') || 'vs-dark');
  const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 20);
  const [userInput, setUserInput] = useState('');
  const [userOutput, setUserOutput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCode = localStorage.getItem('userCode');
    if (savedCode) {
      setUserCode(savedCode);
    }

    const savedLang = localStorage.getItem('userLang');
    if (savedLang) {
      setUserLang(savedLang);
    }

    const savedTheme = localStorage.getItem('userTheme');
    if (savedTheme) {
      setUserTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userCode', userCode);
  }, [userCode]);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('userLang', userLang);
  }, [userLang]);

  useEffect(() => {
    localStorage.setItem('userTheme', userTheme);
  }, [userTheme]);

  useEffect(() => {
    console.log('userOutput updated:', userOutput);
  }, [userOutput]);

  const options = {
    fontSize: fontSize,
  };

  async function compile() {
    setLoading(true);
    if (userCode === '') {
      setLoading(false);
      return;
    }

    try {
      const response = await executeCode(userLang, userCode, userInput);
      console.log('Response:', response);
      let output = response.run.stdout || response.run.stderr || 'No output';
      console.log('Parsed Output:', output);

      output = output.replace(/File ".+?",/g, '');

      setUserOutput(output);
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = 'Error: Unable to compile code.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = `Error: ${error.response.data.message}`;
      }
      setUserOutput(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const handleLanguageChange = (lang) => {
    setUserLang(lang);
    setUserCode(CODE_SNIPPETS[lang] || '');
  };

  function clearOutput() {
    setUserOutput('');
  }

  return (
    <Router>
      <div className={`App ${userTheme === 'light' ? 'light-theme' : ''}`}>
        <Navbar
          userLang={userLang}
          setUserLang={handleLanguageChange}
          userTheme={userTheme}
          setUserTheme={setUserTheme}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
        <div className="main">
          <div className="left-container">
            <Editor
              options={options}
              height="calc(100vh - 50px)"
              width="100%"
              theme={userTheme}
              language={userLang}
              defaultValue={CODE_SNIPPETS[userLang] || ''}
              value={userCode}
              onChange={(value) => {
                setUserCode(value);
              }}
            />
            <button className="run-btn" onClick={compile}>
              Run
            </button>
          </div>

          <div className={`right-container ${userTheme === 'light' ? 'light-theme' : ''}`}>
            <h4>Input:</h4>
            <div className="input-box">
              <textarea id="code-inp" onChange={(e) => setUserInput(e.target.value)}></textarea>
            </div>
            <h4>Output:</h4>
            {loading ? (
              <div className="spinner-box">
                <img src={spinner} alt="Loading..." />
              </div>
            ) : (
              <div className="output-box">
                <pre>{userOutput}</pre>
                <button onClick={() => clearOutput()} className="clear-btn">
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;