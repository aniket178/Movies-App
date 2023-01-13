import React, { useState } from 'react'
import Genre from "./Genre";
import Movies from "./Movies";
function Main() {
    const [cGenre, setGenre] = React.useState("");
  const [cPage, setcPage] = React.useState(1);
    const setGlobalGenre = (nGenre) => {
        console.log("main: " + nGenre);
        if (nGenre == "All Genre") {
            setGenre("");
        } else {
            setGenre(nGenre);
        }
        setcPage(1);
    }
    return (<>
        <div className="flex">
            <Genre setGlobalGenre={setGlobalGenre}></Genre>
            <Movies
                cGenre={cGenre}
                cPage={cPage}
                setcPage={setcPage}
            ></Movies>
        </div>
    </>

    )
}

export default Main