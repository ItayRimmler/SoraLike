import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [urls, setUrls] = useState([]);
  const [disButton, setDisButton] = useState(false);
  const [repeatCount, setRepeatCount] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [imgRatio, setImgRatio] = useState([1, 1]);
  const [showOverlay, setShowOverlay] = useState(true);

  function generatePermutations(images) {
    const [a, b, c] = images;
    return [
      [a, b, c],
      [b, c, a],
      [c, a, b],
    ];
  }

  useEffect(() => {
    const totalExpected = 3 * repeatCount * 3;
    if (imagesLoaded >= totalExpected) {
      setShowOverlay(false);
    }
  }, [imagesLoaded, repeatCount]);

  useEffect(() => {
    fetch('/urls/urls.json')
      .then(res => res.json())
      .then(data => {
        setUrls(data);
        setImagesLoaded(0);
      })
      .catch(err => console.error("Failed to load existing URLs:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setRepeatCount(prev => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const generate = async () => {
    setDisButton(true);
    setImagesLoaded(0);

    const overlayTimeout = setTimeout(() => setShowOverlay(true), 500);

    try {
      const response = await fetch('/api/generate');
      const text = await response.text();

      if (text === 'okay') {
        const urlsRes = await fetch('/urls/urls.json');
        const data = await urlsRes.json();
        setUrls(data);
        setRepeatCount(1);
      }
    } catch (err) {
      console.error("Generation failed:", err);
    }

    clearTimeout(overlayTimeout);
    setDisButton(false);
  };

  const updateRatio = (w, h) => {
    setImgRatio([w, h]);
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: 'black', color: 'white', overflowX: 'hidden' }}>
      <div className={`loading-overlay ${showOverlay ? 'visible' : ''}`}>
        <h1>Loading...</h1>
      </div>

      <div className="fixed-controls">
        <button onClick={generate} disabled={disButton}>
          {disButton ? 'Generating...' : 'Generate New Images'}
        </button>
        <div className="ratio-buttons">
          <button onClick={() => updateRatio(1.1, 1)}>1.1</button>
          <button onClick={() => updateRatio(4.3, 3)}>4.3</button>
          <button onClick={() => updateRatio(3.4, 3)}>3.4</button>
          <button onClick={() => updateRatio(16, 9)}>16:9</button>
          <button onClick={() => updateRatio(9, 16)}>9:16</button>
        </div>
      </div>

      <div style={{ paddingTop: '120px' }}>
        {Array.from({ length: repeatCount }).map((_, repeatIndex) =>
          generatePermutations(urls).map((row, rowIndex) => (
            <div
              key={`${repeatIndex}-${rowIndex}`}
              style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                marginBottom: '20px'
              }}
            >
              {row.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`img-${repeatIndex}-${rowIndex}-${index}`}
                  onLoad={() => setImagesLoaded(prev => prev + 1)}
                  style={{
                    width: `${(imgRatio[0] / imgRatio[1]) * 200}px`,
                    height: `200px`,
                    objectFit: 'cover'
                  }}
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;