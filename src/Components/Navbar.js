import React from 'react';
import Select from 'react-select';
import './Navbar.css';

const Navbar = ({ userLang, setUserLang, userTheme, setUserTheme, fontSize, setFontSize }) => {
  const navbarStyle = {
    backgroundColor: userTheme === 'light' ? '#e5e5e5' : '#474747',
    color: userTheme === 'light' ? '#474747' : '#afec3f',
  };

  const selectStyle = {
    container: (provided) => ({
      ...provided,
      backgroundColor: userTheme === 'light' ? '#e5e5e5' : '#474747',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: userTheme === 'light' ? '#e5e5e5' : '#474747',
      borderColor: userTheme === 'light' ? '#474747' : '#afec3f',
    }),
  };

  const languages = [
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'go', label: 'Go' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'perl', label: 'Perl' },
    { value: 'ruby', label: 'Ruby' },
  ];

  const themes = [
    { value: 'vs-dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
  ];

  return (
    <div className="navbar" style={navbarStyle}>
      <h1>Code Compiler</h1>
      <div>
        <label htmlFor="language-select">Select Language:</label>
        <Select
          options={languages}
          value={languages.find((lang) => lang.value === userLang)}
          onChange={(e) => setUserLang(e.value)}
          placeholder={userLang}
          styles={selectStyle}
        />
      </div>
      <div>
        <label htmlFor="theme-select">Select Theme:</label>
        <Select
          options={themes}
          value={themes.find((theme) => theme.value === userTheme)}
          onChange={(e) => setUserTheme(e.value)}
          placeholder={userTheme}
          styles={selectStyle}
        />
      </div>
      <label>Font Size</label>
      <input type="range" min="18" max="30" value={fontSize} step="2" onChange={(e) => setFontSize(e.target.value)} />
    </div>
  );
};

export default Navbar;
