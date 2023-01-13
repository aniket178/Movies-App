import React, { useState, useEffect } from 'react'
function Genre(props) {
  const [isLoaded, setLoaded] = useState(true);
  const [content, setContent] = useState([]);
  const sendGenre = (e) => {
    console.log("genre : " + e.target.textContent)
    props.setGlobalGenre(e.target.textContent);
  }
  // so i will run only one time after first execution of return statement
  // useeffect -> outer function, async function  
  useEffect(function () {
    (async function () {
      // fetch is inbuilt feature of browser that makes the request to get data -> promise based
      let response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=2a1d5a0808870f7b16bf07155581fe2d&language=en-US');
      response = await response.json();
      response = response.genres;
      let finaldata = {genres : response};
      setLoaded(false);
      setContent(finaldata);
    })();
  }

    , [])
  return (
    <div className="Genre">
      <div className="
      mr-6 border-2 w-40 text-center h-10 font-bold cursor-pointer"
        onClick={sendGenre}>All Genre</div>
      {isLoaded == true ?
        <div className="font-bold"> Loading...</div >
        : content.genres.map(function (genre) {
          return (< div
            key={genre.id}
            className="mr-6 border-2 w-40 text-center h-10 border-t-0 font-bold cursor-pointer"
            onClick={sendGenre}
          >
            {genre.name}</div>
          )
        }
        )
      }
    </div >


  )
}

export default Genre