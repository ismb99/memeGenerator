import React from "react";

export default function Meme() {
  const [currentMeme, setCurrentMeme] = React.useState({
    topText: "",
    bottomText: "",
    imageUrl:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  });
  const [availableMemes, setAvailableMemes] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAvailableMemes(data.data.memes));
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setCurrentMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  function getRandomMeme() {
    const randomIndex = Math.floor(Math.random() * availableMemes.length);
    const randomImageUrl = availableMemes[randomIndex].url;
    setCurrentMeme((prevMeme) => {
      return {
        ...prevMeme,
        imageUrl: randomImageUrl,
        topText: "",
        bottomText: "",
      };
    });
  }

  return (
    <main>
      <div className="form">
        <input
          onChange={handleChange}
          value={currentMeme.topText}
          name="topText"
          className="form--input"
          type="text"
          placeholder="Top text"
        />
        <input
          onChange={handleChange}
          value={currentMeme.bottomText}
          name="bottomText"
          type="text"
          placeholder="Bottom text"
        />
        <button className="form--button" onClick={getRandomMeme}>
          Get a new meme image
        </button>
      </div>

      <div className="meme">
        <img
          className="meme--image"
          src={currentMeme.imageUrl}
          alt="meme-img"
        />
        <h2 className="meme--text top">{currentMeme.topText}</h2>
        <h2 className="meme--text bottom">{currentMeme.bottomText}</h2>
      </div>
    </main>
  );
}
