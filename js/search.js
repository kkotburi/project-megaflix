function filter() {
	let search = document.getElementById("search").value.toLowerCase();
	let listInner = document.getElementsByClassName("list");

	for (let i = 0; i < listInner.length; i++) {
		city = listInner[i].getElementsByClassName("tit-movie");
		country = listInner[i].getElementsByClassName("ov-movie");
		if (city[0].innerHTML.toLowerCase().indexOf(search) != -1 ||
			country[0].innerHTML.toLowerCase().indexOf(search) != -1
		) {
			listInner[i].style.display = "flex"
		} else {
			listInner[i].style.display = "none"
		}
	}
}