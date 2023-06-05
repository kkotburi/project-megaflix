// 검색 필터
export const filter = () => {
  const searchElement = document.getElementById("search");
  const searchElementInputValue = searchElement.value.toLowerCase();
  const listInner = document.getElementsByClassName("list");

  for (let i = 0; i < listInner.length; i++) {
    let titMovie = listInner[i].querySelector(".tit-movie");

    if (titMovie.textContent.toLowerCase().includes(searchElementInputValue)) {
      listInner[i].style.display = "";
    } else {
      listInner[i].style.display = "none";
    }
  }
};
