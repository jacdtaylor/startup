import React, { useEffect, useState } from 'react';

export function About() {
  const [pictureUrl, setPictureUrl] = useState('');
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    displayPicture();
    displayQuote();
  }, []);

  function displayPicture() {
    const random = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
      .then((response) => response.json())
      .then((data) => {
        const imgUrl = `https://picsum.photos/id/${data[0].id}/500/300?grayscale`;
        setPictureUrl(imgUrl);
      });
  }

  function displayQuote() {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
      });
  }

  return (
    <main>
      <p>
        Colab Task Manager is a program to organize and manage tasks individually or share tasks with others to work on projects collaboratively.
      </p>

      <div className="container">
        {pictureUrl && (
          <img src={pictureUrl} alt="Random" className="image" />
        )}
        <div className="overlay">
          <div className="text">
            {quote && <p className="quote">{quote}</p>}
            {author && <p className="author">- {author}</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
