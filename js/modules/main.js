import { filter } from "./search.js";
import { fetchMovie } from "./movies.js";

// 전역변수 두는 곳
const searchElement = document.getElementById("search");

const addEventListeners = () => {
  //윈도우 로드시 기본으로 한번 함수 실행함.
  window.addEventListener("DOMContentLoaded", fetchMovie);
  searchElement.addEventListener("keyup", filter);
};

const init = () => {
  addEventListeners();
};

init();
