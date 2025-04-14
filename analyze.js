document.addEventListener('DOMContentLoaded', function () {
  const analyzeBtn = document.getElementById('analyzeBtn');
  const resultDiv = document.getElementById('result');
  const resetBtn = document.getElementById('resetBtn');

resetBtn.addEventListener('click', function () {
  document.getElementById('textInput').value = '';
  resultDiv.innerHTML = '';
});


  analyzeBtn.addEventListener('click', function () {
    const text = document.getElementById('textInput').value;
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const words = (text.match(/\b\w+\b/g) || []).length;
    const spaces = (text.match(/ /g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const specialSymbols = (text.match(/[^\w\s]/g) || []).length;

    const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];

    const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'its', 'our', 'their', 'mine', 'yours', 'hers', 'ours', 'theirs'];
    const prepositions = ['in', 'on', 'at', 'by', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'of', 'off', 'over', 'under'];
    const articles = ['a', 'an'];

    const countOccurrences = (array, wordList) => {
      const counts = {};
      wordList.forEach(word => counts[word] = 0);
      array.forEach(token => {
        if (wordList.includes(token)) {
          counts[token]++;
        }
      });
      return counts;
    };

    const pronounCounts = countOccurrences(tokens, pronouns);
    const prepositionCounts = countOccurrences(tokens, prepositions);
    const articleCounts = countOccurrences(tokens, articles);

    const displayCounts = (title, countsObj) => {
      let output = `<h4>${title}</h4><ul>`;
      for (const [word, count] of Object.entries(countsObj)) {
        if (count > 0) {
          output += `<li>${word}: ${count}</li>`;
        }
      }
      output += '</ul>';
      return output;
    };

    resultDiv.innerHTML = `
      <h3>Text Analysis Results</h3>
      <p><strong>Letters:</strong> ${letters}</p>
      <p><strong>Words:</strong> ${words}</p>
      <p><strong>Spaces:</strong> ${spaces}</p>
      <p><strong>Newlines:</strong> ${newlines}</p>
      <p><strong>Special Symbols:</strong> ${specialSymbols}</p>
      ${displayCounts('Pronouns Count', pronounCounts)}
      ${displayCounts('Prepositions Count', prepositionCounts)}
      ${displayCounts('Indefinite Articles Count', articleCounts)}
    `;
  });
});
