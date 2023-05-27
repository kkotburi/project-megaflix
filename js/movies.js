let page = 1;
const key = "4e657bab9a1d4d7b73eb2631af49f6da";
const base_url = "https://image.tmdb.org/t/p/w500/";
const contain = document.querySelector(".contain");
const youtube = document.querySelector(".youtube");
const overlay = document.querySelector("#overlay");
const closeButton = document.querySelector(".close");
let currentScrollY = "";

//API 서버에서 데이터 가져오는 함수
function fetchMovie(page){
	// const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=ko-KR&page=${page}`;
	const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`;

	fetch(url)
		.then(res => res.json())
		.then(function(res){
			const movies = res.results;
			movies.map(function(movie){
				//console.log(movie.title);
				const div = document.createElement('div');
				div.classList.add('list');
				const output = `
																	<div class="post-entry-alt">
																		<a href="single.html" class="img-link"><img src="${base_url + movie.poster_path}" alt="Image" class="img-fluid"></a>
																		<div class="excerpt">
																			<h2><a href="single.html" class="tit-movie">${movie.title}</a></h2>
																		<div class="post-meta align-items-center text-left clearfix">
																			<figure class="author-figure mb-0 me-3 float-start"><img src="images/person_1.jpg" alt="Image" class="img-fluid"></figure>
																			<span class="d-inline-block mt-1">By <a href="#">David Anderson</a></span>
																			<span>&nbsp;-&nbsp; July 19, 2019</span>
																		</div>
																	
																		<p class="ov-movie">${movie.overview}</p>
																		<p><a href="#" class="read-more">개봉일: ${movie.release_date}</a></p>
																		</div>
																	</div>
														
																`;
				div.innerHTML = output;
				contain.appendChild(div);
				// 영화의 아이디를 div 에 넣어 줌 - 나중에 이것을 get 해서 활용할 것임.
				//div.classList.add("movie");
				div.setAttribute("data-id", movie.id);
				div.setAttribute("onClick", "openView(this)");
			});
		})
		.catch(erro => console.log(erro));
}

//썸네일 클릭시 실행 될 함수 event로 DOM 정보를 가져와서 필요한 데이터를 빼서 사용
function openView(e){
	//영화의 아이디를 가져 왔다.
	const movieId = e.getAttribute("data-id");
	console.log(movieId);

	//다시 요청을 해서 유튜브 플레이용 아이디(key)를 가져와야 한다. 언어를 한국어로 한정하면 비디오를 찾지 못하는 경우가 많다.
	const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}`;
	fetch(movieUrl)
		.then(res => res.json())
		.then(function(res){
			let output = "";

			if(res.results.length > 0){
				const youtubeId = res.results[0].key;//첫번재 영상만 사용하기 하자. 값이 없을 경우도 있음.
				output = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${youtubeId}?autoplay=1"></iframe>`;
			} else {
				output = `<h3 class="noVideo">재생할 예고편이 없습니다.</h3>`;
				console.log(output);
			}

			youtube.innerHTML = output;
		})
		.catch(erro => console.log(erro));
	//포스트의 url을 가져 왔다.
	const posterImage = e.querySelector("img").src;
	//오버레이를 열고 영상을 출력 하자.

	overlay.classList.add("show");

	overlay.setAttribute("style", `background-image: url(${posterImage}); background-size: auto; background-repeat: no-repeat;`)
	//배경 body 스크롤 중지
	document.body.classList.add("stop-scrolling");

}

// 클로즈 버튼을 클릭하면 오버레이 show 클래스를 삭제해서 오버레이를 사라지게 함
closeButton.addEventListener('click', () => {
	overlay.classList.remove("show");
	youtube.innerHTML = "";
	//스크롤 방지 해제
	document.body.classList.remove("stop-scrolling");
});


//윈도우 로드시 기본으로 한번 함수 실행함.
window.addEventListener('onLoad', fetchMovie());

//더보기 버튼 클릭 리스너
const moreButton = document.querySelector(".more");
moreButton.addEventListener('click', function(){
	if(page < 3){
		page += 1;
		fetchMovie(page);
	} else {
		this.disabled = true;
	}
	//console.log(page);
});