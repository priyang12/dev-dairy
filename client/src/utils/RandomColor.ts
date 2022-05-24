const RandomColor = () => {
  const colors = [
    '#1c4924',
    '#3a9157',
    '#191916',
    '#121612',
    '#939386',
    '#ef3258',
    '#e59b3b',
    '#543925',
    '#53a387',
    '#2e1747',
    '#e8a151',
    '#56503e',
    '#cec0e0',
    '#b02dbc',
    '#11140e',
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

export default RandomColor;
