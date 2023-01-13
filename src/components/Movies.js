import React from 'react'
import InputBox from './InputBox'
import MoviesTable from './MoviesTable';
import Pagination from "./Pagination";
import { useEffect } from 'react';

function Movies(props) {
  let { cPage, setcPage } = props;

  let [searchText, setSearchText] = React.useState("");
  let [moviesCount, setCount] = React.useState(4);
  // *******************Movies table get *********************************************
  const [content, setContent] = React.useState([]);
  const [isLoaded, setLoaded] = React.useState(true);

  useEffect(function () {
    async function fn() {
      let response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=2a1d5a0808870f7b16bf07155581fe2d&language=en-US&page=1')
      response = await response.json();
      let result = response.results;
      let genresponse = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=2a1d5a0808870f7b16bf07155581fe2d&language=en-US')
      genresponse = await genresponse.json();
      let genresults = genresponse.genres;
      result.forEach(d=>{
        d.genre_ids.sort(function(a,b){return a-b})
      })
      // console.log(result);
      let finaldata = result.map(data => {
          let movies = {
              _id: data.id,
              title : data.title,
              dailyRentalRate : data.vote_average
          }
          // console.log(data.genre_ids);
          var n = data.genre_ids.length;
          var idx = Math.floor(Math.random()*n);
          // console.log('n : ', n, 'idx : ', idx);
          var genreid = data.genre_ids[idx];
          // console.log(genreid)
          movies.genre = genresults.find(d =>{
              return d.id == genreid
          })
          // console.log(movies);
          return movies;
      });
      response = {movies : finaldata};
      setLoaded(false);
      // console.log(response);
      setContent(response);
    }
    fn();
  }, []);

  const setGlobalSearchText = (searchText) => {
    console.log("movies : " + searchText);
    setSearchText(searchText);
    setcPage(1);
  }
  const setGlobalCount = (moviesCount) => {
    console.log("movies : " + moviesCount);
    setCount(moviesCount);
    setcPage(1);
  }
  // *******************Movies table************
  let filteredContent;
  let totalpagesWaliMovies;
  if (content.movies) {
    filteredContent = content.movies;
    // **************searching*********
    if (props.searchText != "") {
      filteredContent = content.movies.filter((movie) => {
        let lowerCaseTitle = movie.title.toLowerCase();
        let lowercaseSearchText = searchText.toLowerCase();
        // movie (title) -> lowercase  
        return lowerCaseTitle.includes(lowercaseSearchText);
      });

    }
    // ************genre****** -> grouping 
    if (props.cGenre != "") {
      filteredContent = filteredContent.filter(
        function (movie) {

          console.log("movies table ", movie.genre.name);
          return movie.genre.name.trim() == props.cGenre.trim();
        })
      console.log("movies table ", filteredContent)
    }

    totalpagesWaliMovies = filteredContent;
    // **************number of elems logic(Pagination)*********** 
    let sidx = (cPage - 1) * moviesCount;
    let eidx = sidx + moviesCount;
    filteredContent = filteredContent.slice(sidx, eidx);
  }
  // ***********************movies table **************

  return (<div >
    <InputBox setGlobalSearchText
      ={setGlobalSearchText}
      setGlobalCount
      ={setGlobalCount}
    ></InputBox>
    <MoviesTable searchText={searchText}
      filteredContent={filteredContent}
      cGenre={props.cGenre}
      content={content}
      isLoaded={isLoaded}
      setContent={setContent}
      cPage={cPage}
    ></MoviesTable>

    <Pagination
      moviesCount={moviesCount}
      totalpagesWaliMovies={totalpagesWaliMovies}
      cPage={cPage}
      setcPage={setcPage}
    ></Pagination>
  </div>
  )
}
export default Movies;