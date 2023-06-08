import { movieId } from "./detail-info.js";

//상세 정보 누른 영화 id 값 가져오기
export const detailVideo = () => {
  const key = "4e657bab9a1d4d7b73eb2631af49f6da";
  //html 요소들 가져오게 왜냐면 아래 html 붙여줄 때 써야함
  const movieViedosElement = document.getElementById("movieVideos");
  const videos = document.getElementById("videos");
  // console.log(movieId);

  //movieId값 넣어서 해당 영화의 video 데이터를 가져옴
  function showMoiveVideos(movieId) {
    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}&language=en-US`;
    fetch(movieUrl)
      .then((res) => res.json())
      .then((res) => {
        let output = "";

        //해당 영화의 results 안에 객체가 0개 보다 많으면,
        //즉 무조건 하나라도 있으면, 메인 로직을 실행 해라
        if (res.results.length > 0) {
          // main Trailer 하나 가져오기, html에 보여지게 함
          let keyArr = res.results.filter((value) => value.type === "Trailer");
          console.log(keyArr);
          const youtubeId = keyArr[0].key;
          output = `
                      <h4>Main trailer</h4>
                            <div class="video">
                              <iframe width="1000" height="580" src="https://www.youtube.com/embed/${youtubeId}?autoplay=1"></iframe>
                            </div>`;
          movieViedosElement.innerHTML = output;

          //나머지 Trailer 보여지기
          //첫번째 인덱스 제외하고 나머지 인덱스 값들 보이게 함
          const restKeyArr = keyArr.slice(1);
          //map()으로 restKeyArr모든 배열의 값에 함수를 실행시킴
          restKeyArr.map(function (restTrailer) {
            const div = document.createElement("div");
            div.classList.add("rest-video");
            const restOutput = `
                                  <iframe src="https://www.youtube.com/embed/${restTrailer.key}?autoplay=1"></iframe>
                                `;
            div.innerHTML = restOutput;
            videos.appendChild(div); //appendChild는 DOM객체에만 사용 가능
          });
        } else {
          output = `<h4>Main trailer</h4>
          <div class="video">
            <h3>검색 결과가 없습니다.</h3>
          </div>`;
        }
      });
  }
  showMoiveVideos(movieId);
};
