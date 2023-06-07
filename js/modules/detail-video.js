import { movieId } from "./detail-info.js";

//상세 정보 누른 영화 id 값 가져오기
export const detailVideo = () => {
  const key = "4e657bab9a1d4d7b73eb2631af49f6da";
  const movieViedosElement = document.getElementById("movieVideos");

  // console.log(urlParams);
  // console.log(movieId);
  function showMoiveVideos(movieId) {
    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}&language=en-US`;
    // console.log(movieUrl);
    fetch(movieUrl)
      .then((res) => res.json())
      .then((res) => {
        let output = "";

        // for (let i = 0; i < res.results.length; i++) {
        //   const trailer = res.results[i].type;
        //   if (res.results[i].type === "Trailer") {
        //     console.log(res.results[i].key);
        //   } else {
        //     continue;
        //   }
        // }

        if (res.results.length > 0) {
          //type Trailer 하나 가져오기
          let keyArr = res.results.filter((value) => value.type === "Trailer");
          // console.log(keyArr);
          const youtubeId = keyArr[0].key;
          //나머지 Trailer 보여지기
          const restKeyArr = keyArr.splice(1);
          for (let i in restKeyArr) {
            let youtubeRestId = restKeyArr[i].key;
            // console.log(youtubeRestId);
            output = `
                      <h4>Main trailer</h4>
                            <div class="video">
                              <iframe width="1000" height="580" src="https://www.youtube.com/embed/${youtubeId}?autoplay=1"></iframe>
                            </div>
                            <div class="rest-video">
                            <iframe width="260" height="142" src="https://www.youtube.com/embed/${youtubeRestId}?autoplay=1"></iframe>
                            </div>
                            `;
          }
        } else {
          output = `<h4>Main trailer</h4>
          <div class="video">
            <h3>검색 결과가 없습니다.</h3>
          </div>`;
        }
        movieViedosElement.innerHTML = output;
        // console.log(output);
      });
  }
  showMoiveVideos(movieId);
};
