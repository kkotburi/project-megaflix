// 검색 필터
function filter() {
	let search = document.getElementById("search").value.toLowerCase();
	let listInner = document.getElementsByClassName("list");

	for (let i = 0; i < listInner.length; i++) {
		titMovie = listInner[i].getElementsByClassName("tit-movie");
		ovMovie = listInner[i].getElementsByClassName("ov-movie");
		if (titMovie[0].innerHTML.toLowerCase().indexOf(search) != -1 ||
			ovMovie[0].innerHTML.toLowerCase().indexOf(search) != -1
		) {
			listInner[i].style.display = "flex"
		} else {
			listInner[i].style.display = "none"
		}
	}
}