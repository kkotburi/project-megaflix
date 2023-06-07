import { urlParams, movieId } from "./detail-info.js";

//상세 정보 누른 영화 id 값 가져오기
export const detailVideo = () => {
  const key = "4e657bab9a1d4d7b73eb2631af49f6da";
  const movieViedosElement = document.getElementById("movieVideos");

  console.log(urlParams);
  console.log(movieId);
  function showMoiveVideos(movieId) {
    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}&language=en-US`;
    console.log(movieUrl);
    fetch(movieUrl)
      .then((res) => res.json())
      .then((res) => {
        let output = "";

        if (res.results.length > 0) {
          const youtubeId = res.results[0].key;
          output = `
                    <h4>Main trailer</h4>
                          <div class="video">
                            <iframe width="1000" height="580" src="https://www.youtube.com/embed/${youtubeId}?autoplay=1"></iframe>
                          </div>`;
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
