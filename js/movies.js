let page = 1;
const key = "4e657bab9a1d4d7b73eb2631af49f6da";
const base_url = "https://image.tmdb.org/t/p/w500/";
const contain = document.querySelector(".contain");

//API 서버에서 데이터 가져오는 함수
function fetchMovie(page){
	// const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=ko-KR&page=${page}`;
	const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`;

	fetch(url)
		.then(res => res.json())
		.then(function(res){
			//console.log(res)
			//console.log(res.results[0].id)
			const movies = res.results;
			movies.map(function(movie){
				//console.log(movie.title);
				const div = document.createElement('div');
				div.classList.add('list');
				const output = `
																	<div class="post-entry-alt" onclick="openView()">
																		<a class="img-link"><img src="${base_url + movie.poster_path}" alt="Image" class="img-fluid"></a>
																		<div class="excerpt">
																			<h2><a class="tit-movie">${movie.title}</a></h2>
																		<div class="post-meta align-items-center text-left clearfix">
																			<span class="d-inline-block mt-1">평점</span>
																			<span>${movie.vote_average}</span>
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
				// div.setAttribute("onClick", "openView(this)");

			});
		})
		.catch(erro => console.log(erro));
}

//썸네일 클릭시 실행 될 함수 event로 DOM 정보를 가져와서 필요한 데이터를 빼서 사용
function openView(){
	//alert(res.results[0].id)
	// console.log(res)
	//console.log(JSON.stringify(data));
}


//윈도우 로드시 기본으로 한번 함수 실행함.
window.addEventListener('onLoad', fetchMovie());

